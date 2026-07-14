import assert from "node:assert/strict";
import test from "node:test";

import {
  buildStatus,
  renderStatusMarkdown,
} from "../porter.mjs";
import { summarizeSignatureReport } from "../core/signature-command.mjs";
import { signatureAuditSummaryLines } from "../core/signature-reporting.mjs";
import { baseConfig, emptyVerificationEvidence, fileRecord, snapshotWith, testSigHash, tsUnitRecord, unitRecord } from "./helpers.mjs";

test("buildStatus rejects missing, extra, undefined, and positional inputs", () => {
  const input = {
    config: baseConfig,
    snapshot: snapshotWith([]),
    tsUnits: { fileCount: 0, files: [], units: [] },
    ...emptyVerificationEvidence(),
  };

  for (const key of Object.keys(input)) {
    const missing = { ...input };
    delete missing[key];
    assert.throws(() => buildStatus(missing), new RegExp(`missing required key\\(s\\): ${key}`));
    assert.throws(() => buildStatus({ ...input, [key]: undefined }), new RegExp(`undefined key\\(s\\): ${key}`));
  }
  assert.throws(() => buildStatus({ ...input, extra: true }), /extra key\(s\): extra/);
  assert.throws(() => buildStatus(input.config, input.snapshot, input.tsUnits), /requires exactly one input object/);
});

test("buildStatus rejects partial and forged TS-unit status evidence before matching", () => {
  const id = "m::internal/debug/debug.go::func::Fail";
  const tsPath = "packages/tsts/src/internal/debug/debug.ts";
  const snapshot = snapshotWith([fileRecord({
    path: "internal/debug/debug.go",
    units: [unitRecord({ id, kind: "func", qualifiedName: "Fail", goPath: "internal/debug/debug.go", sigHash: testSigHash })],
  })]);
  const exactUnit = tsUnitRecord({ id, path: tsPath, sigHash: testSigHash });
  const inputFor = (unit, files = [{ path: tsPath, metadataCount: 1 }]) => ({
    config: baseConfig,
    snapshot,
    tsUnits: { fileCount: files.length, files, units: [unit] },
    ...emptyVerificationEvidence(),
  });

  assert.equal(buildStatus(inputFor(exactUnit)).counts.implemented, 1);
  const exactScannedUnit = structuredClone(exactUnit);
  Object.defineProperty(exactScannedUnit, "declarationMetadata", { value: { statement: {} }, enumerable: false });
  Object.defineProperty(exactScannedUnit, "declarationName", { value: "Fail", enumerable: false });
  assert.equal(buildStatus(inputFor(exactScannedUnit)).counts.implemented, 1);
  const partial = structuredClone(exactUnit);
  delete partial.metadata;
  const missingKind = structuredClone(exactUnit);
  delete missingKind.kind;
  const extra = { ...structuredClone(exactUnit), trusted: true };
  const forgedStatus = { ...structuredClone(exactUnit), status: "stub" };
  const forgedMetadata = structuredClone(exactUnit);
  forgedMetadata.metadata.extra = true;
  const invalidDigest = structuredClone(exactUnit);
  invalidDigest.sigHash = invalidDigest.metadata.sigHash = "not-a-digest";
  const accessor = structuredClone(exactUnit);
  Object.defineProperty(accessor, "status", { enumerable: true, get: () => "implemented" });
  const hiddenExtra = structuredClone(exactUnit);
  Object.defineProperty(hiddenExtra, "trusted", { value: true, enumerable: false });
  const invalidDeclarationName = structuredClone(exactUnit);
  Object.defineProperty(invalidDeclarationName, "declarationName", { value: "", enumerable: false });

  for (const [description, unit] of [
    ["missing metadata", partial],
    ["missing mirrored kind", missingKind],
    ["extra trust marker", extra],
    ["forged wrapper status", forgedStatus],
    ["extra metadata field", forgedMetadata],
    ["invalid signature digest", invalidDigest],
    ["accessor-backed status", accessor],
    ["unexpected hidden evidence", hiddenExtra],
    ["invalid declaration name", invalidDeclarationName],
  ]) {
    assert.throws(() => buildStatus(inputFor(unit)), /buildStatus tsUnits\.units\[0\]/, description);
  }
  assert.throws(
    () => buildStatus(inputFor(exactUnit, [{ path: tsPath, metadataCount: 0 }])),
    /metadataCount must equal its unit-record count/,
  );
  const duplicateEvidence = inputFor(exactUnit, [{ path: tsPath, metadataCount: 2 }]);
  duplicateEvidence.tsUnits.units.push(structuredClone(exactUnit));
  assert.throws(() => buildStatus(duplicateEvidence), /tsUnits\.units duplicates id/);
});

test("renderStatusMarkdown reports every missing module from missing rows only", () => {
  const snapshot = snapshotWith([
    fileRecord({
      path: "internal/checker/checker.go",
      units: [unitRecord({
        id: "m::internal/checker/checker.go::func::Implemented",
        kind: "func",
        qualifiedName: "Implemented",
        goPath: "internal/checker/checker.go",
        sigHash: testSigHash,
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
      })],
    }),
  ]);
  const status = buildStatus({
    config: baseConfig,
    snapshot,
    tsUnits: {
      fileCount: 1,
      files: [{ path: "packages/tsts/src/internal/checker/checker.ts", metadataCount: 1 }],
      units: [tsUnitRecord({
        id: "m::internal/checker/checker.go::func::Implemented",
        path: "packages/tsts/src/internal/checker/checker.ts",
        sigHash: testSigHash,
      })],
    },
    ...emptyVerificationEvidence(),
  });
  const markdown = renderStatusMarkdown(status);

  assert.equal(status.schemaVersion, 5);
  assert.match(markdown, /\| internal\/parser \| 1 \|/);
  assert.doesNotMatch(markdown, /\| internal\/checker \| 1 \|/);
  assert.match(markdown, /Go\/TypeScript signature unit audit: not run/);
  assert.match(markdown, /authored facade audit: not run/);
  assert.match(markdown, /reviewed type storage policy audit: not run/);
  assert.match(markdown, /TypeScript type-equivalence relation audit: not run/);
  assert.match(markdown, /ambient reference relation audit: not run/);
  assert.match(markdown, /declaration ownership audit: not run/);
  assert.match(markdown, /unmatched TypeScript declaration audit: not run/);
  assert.match(markdown, /Go struct JSON-tag declaration audit: not run/);
  assert.doesNotMatch(markdown, /Authored facades checked\/bound methods\/unselected Go\/TS-only: 0\/0\/0\/0/);
  status.missingModules = Object.fromEntries(Array.from({ length: 31 }, (_, index) => [`module-${String(index).padStart(2, "0")}`, 31 - index]));
  assert.match(renderStatusMarkdown(status), /\| module-30 \| 1 \|/);
});

test("signature summaries retain audit state and every concrete inventory row", () => {
  const constructor = { file: "pkg/time.ts", memberKind: "constructor", name: "constructor", objectId: "time::type::Time" };
  const unselectedGoMember = { file: "pkg/time.ts", memberKind: "method", name: "Add", objectId: "time::type::Time" };
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
  const typeStoragePolicy = {
    goDeclarationHash: "a".repeat(64), objectId: "time::type::Time", reason: "Exact reviewed storage for the test fixture.",
    storageIdentity: "go/time.ts::Time", tsDeclarationHash: "b".repeat(64),
  };
  const typeEquivalenceRelation = {
    goDeclarationHash: "c".repeat(64), members: [{ declarationHash: "d".repeat(64), identity: "go/a.ts::Node" }],
    objectId: "ast::type::Node", reason: "Exact reviewed duplicate declaration fixture.", uses: ["fixture-use"],
  };
  const ambientReferenceRelation = {
    declarationHash: "e".repeat(64), identity: "global::ReadonlyArray", namespace: "type",
    reason: "Exact ambient dependency for the reporting fixture.", sourceFiles: ["lib/lib.es5.d.ts"],
    sourceSetHash: "f".repeat(64), uses: ["fixture-ambient-use"],
  };
  const declarationOwner = { id: "pkg/time.ts::type::class::Time", owner: "authored-facade:time::type::Time" };
  const externalPackageSelection = {
    file: "packages/tsts/src/go/errors.ts", kind: "func", name: "New", objectId: "errors::func::New",
    resolvedProfiles: [0], tsModule: "go/errors.ts", tsName: "New", unresolvedProfiles: [],
  };
  const summary = summarizeSignatureReport({
    state: "complete",
    selection: { kind: "all-active" },
    checked: 4,
    descriptors: 4,
    overriddenUnits: 0,
    mismatches: [],
    overrideIssues: [],
    authoredFacades: {
      state: "complete",
      checked: 2,
      constructorCount: 1,
      constructors: [constructor],
      methodBindingCount: 1,
      methodBindings: [methodBinding],
      privateStorageMemberCount: 1,
      privateStorageMembers: [privateStorage],
      tsOnlyMemberCount: 1,
      tsOnlyMembers: [tsOnlyMember],
      unselectedGoMemberCount: 1,
      unselectedGoMembers: [unselectedGoMember],
    },
    externalPackageSurface: {
      state: "complete", checked: 1, inventory: [externalPackageSelection], mismatchCount: 0,
      resolvedProfileCount: 1, unresolvedProfileCount: 0,
    },
    typeStoragePolicies: { state: "complete", checked: 1, inventory: [typeStoragePolicy], mismatchCount: 0 },
    typeEquivalenceRelations: { state: "complete", checked: 1, inventory: [typeEquivalenceRelation], mismatchCount: 0 },
    ambientReferenceRelations: { state: "complete", checked: 1, inventory: [ambientReferenceRelation], mismatchCount: 0 },
    declarationOwnership: { state: "complete", checked: 1, inventory: [declarationOwner], mismatchCount: 0 },
    untrackedTypeScript: {
      state: "complete",
      mismatchCount: 0,
      exportedDeclarationCount: 1,
      exportedDeclarations: [exportedDeclaration],
      privateDeclarationCount: 1,
      privateDeclarations: [privateDeclaration],
      reExportCount: 1,
      reExports: [reExport],
      reviewedDeclarationCount: 1,
      reviewedDeclarations: [reviewedDeclaration],
      testParityDeclarationCount: 2,
      testParityFileCount: 1,
      testParityFiles: [{ file: "pkg/example.test.ts", declarationCount: 2, declarationInventoryHash: "c".repeat(64) }],
    },
  });
  assert.equal(summary.state, "complete");
  assert.deepEqual(summary.selection, { kind: "all-active" });
  assert.equal(summary.mismatchCount, 0);
  assert.deepEqual(summary.mismatches, []);
  assert.equal(summary.overrideIssueCount, 0);
  assert.deepEqual(summary.overrideIssues, []);
  assert.deepEqual(summary.authoredFacades.constructors, [constructor]);
  assert.deepEqual(summary.authoredFacades.unselectedGoMembers, [unselectedGoMember]);
  assert.deepEqual(summary.authoredFacades.methodBindings, [methodBinding]);
  assert.deepEqual(summary.authoredFacades.privateStorageMembers, [privateStorage]);
  assert.deepEqual(summary.authoredFacades.tsOnlyMembers, [tsOnlyMember]);
  assert.deepEqual(summary.externalPackageSurface.inventory, [externalPackageSelection]);
  assert.deepEqual(summary.typeStoragePolicies.inventory, [typeStoragePolicy]);
  assert.deepEqual(summary.typeEquivalenceRelations.inventory, [typeEquivalenceRelation]);
  assert.deepEqual(summary.ambientReferenceRelations.inventory, [ambientReferenceRelation]);
  assert.deepEqual(summary.declarationOwnership.inventory, [declarationOwner]);
  assert.deepEqual(summary.untrackedTypeScript.exportedDeclarations, [exportedDeclaration]);
  assert.deepEqual(summary.untrackedTypeScript.privateDeclarations, [privateDeclaration]);
  assert.deepEqual(summary.untrackedTypeScript.reExports, [reExport]);
  assert.deepEqual(summary.untrackedTypeScript.reviewedDeclarations, [reviewedDeclaration]);
  assert.equal(summary.untrackedTypeScript.testParityDeclarationCount, 2);

  const markdown = renderStatusMarkdown({
    ...minimalStatus(),
    signatureCheck: summary,
    jsonTagCheck: {
      state: "complete", taggedUnits: 1, taggedFields: 2, contractUnits: 1, contractFields: 2,
      mismatchCount: 0, mismatches: [], byKind: {},
    },
  });
  for (const evidence of [
    "Add", "ToDate", "FileMode_IsDir", "extra", "helper", "reviewed", "pkg/time.ts::Time", "route-hash",
    "go/time.ts::Time", "go/a.ts::Node", "fixture-use", "global::ReadonlyArray", "fixture-ambient-use",
    "pkg/time.ts::type::class::Time", "authored-facade:time::type::Time",
    "errors::func::New", "pkg/example.test.ts",
  ]) {
    assert.match(markdown, new RegExp(evidence));
  }
  assert.equal(signatureAuditSummaryLines({ signatureCheck: summary, jsonTagCheck: { state: "not-run", reason: "fixture" } }).length, 10);
});

test("filtered signature summaries preserve every skipped whole-program subaudit", () => {
  const skipped = (name) => ({ state: "not-run", reason: `filtered ${name}` });
  const summary = summarizeSignatureReport({
    state: "complete",
    selection: { kind: "id-filter", pattern: "m::one", matchedUnitCount: 1 },
    checked: 1,
    descriptors: 1,
    overriddenUnits: 0,
    mismatches: [],
    overrideIssues: [],
    authoredFacades: skipped("facades"),
    externalPackageSurface: skipped("external package"),
    typeStoragePolicies: skipped("storage"),
    typeEquivalenceRelations: skipped("equivalence"),
    ambientReferenceRelations: skipped("ambient"),
    declarationOwnership: skipped("ownership"),
    untrackedTypeScript: skipped("TypeScript inventory"),
  });
  for (const key of [
    "authoredFacades", "externalPackageSurface", "typeStoragePolicies", "typeEquivalenceRelations",
    "ambientReferenceRelations", "declarationOwnership", "untrackedTypeScript",
  ]) assert.equal(summary[key].state, "not-run", key);
  const lines = signatureAuditSummaryLines({
    signatureCheck: summary,
    jsonTagCheck: { state: "complete", taggedUnits: 0, taggedFields: 0, contractUnits: 0, contractFields: 0, mismatchCount: 0, mismatches: [], byKind: {} },
  });
  assert.equal(lines.filter((line) => line.includes("not run")).length, 7);
});

test("signature summaries preserve descriptor evidence as exact JSON data", () => {
  const skipped = { state: "not-run", reason: "fixture" };
  const declaration = {
    descriptor: { initializerStatus: "missing", initializer: undefined },
    file: "pkg/example.ts",
    kind: "function",
    name: "example",
  };
  const summary = summarizeSignatureReport({
    state: "complete",
    selection: { kind: "all-active" },
    checked: 0,
    descriptors: 0,
    overriddenUnits: 0,
    mismatches: [],
    overrideIssues: [],
    authoredFacades: skipped,
    externalPackageSurface: skipped,
    typeStoragePolicies: skipped,
    typeEquivalenceRelations: skipped,
    ambientReferenceRelations: skipped,
    declarationOwnership: skipped,
    untrackedTypeScript: {
      state: "complete",
      mismatchCount: 0,
      exportedDeclarationCount: 1,
      exportedDeclarations: [declaration],
      privateDeclarationCount: 0,
      privateDeclarations: [],
      reExportCount: 0,
      reExports: [],
      reviewedDeclarationCount: 0,
      reviewedDeclarations: [],
      reviewedRouteCount: 0,
      reviewedRoutes: [],
      testParityDeclarationCount: 0,
      testParityFileCount: 0,
      testParityFiles: [],
    },
  });
  assert.deepEqual(summary.untrackedTypeScript.exportedDeclarations[0].descriptor, { initializerStatus: "missing" });
  assert.doesNotThrow(() => JSON.stringify(summary));
});

function minimalStatus() {
  return buildStatus({
    config: baseConfig,
    snapshot: snapshotWith([]),
    tsUnits: { fileCount: 0, files: [], units: [] },
    ...emptyVerificationEvidence(),
  });
}
