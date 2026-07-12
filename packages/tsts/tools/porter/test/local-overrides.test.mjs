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

test("buildLocalOverrideStatus accepts local signature overrides with snapshots", () => {
  const status = buildLocalOverrideStatus(
    baseConfig,
    {
      units: [
        {
          id: "github.com/microsoft/typescript-go::internal/scanner/scanner.go::func::Scan",
          kind: "func",
          status: "implemented",
          path: "packages/tsts/src/internal/scanner/scanner.ts",
          override: {
            category: "runtime-performance",
            allow: ["signature"],
            reason: "Use a target-native source-text model while preserving the exact scanner call and result contract.",
            goSignature: "func(K:string)=>K:void",
            tsSignature: "func(K:string)=>K:void",
          },
        },
      ],
    },
  );
  assert.equal(status.inline, 1);
  assert.equal(status.byAllow.signature, 1);
  assert.equal(status.signatureUnits.length, 1);
  assert.deepEqual(collectLocalOverrideFailures(status), []);
});

test("buildLocalOverrideStatus accepts local initializer overrides with snapshots", () => {
  const status = buildLocalOverrideStatus(baseConfig, { units: [{
    id: "github.com/microsoft/typescript-go::internal/core/version.go::constGroup::Version",
    kind: "constGroup",
    status: "implemented",
    path: "packages/tsts/src/internal/core/version.ts",
    override: {
      category: "runtime-representation",
      allow: ["initializer"],
      reason: "The packaged host selects one explicit runtime constant while preserving the declared public value type.",
      goInitializer: 'Version={"kind":"string","value":"7"}',
      tsInitializer: 'Version={"kind":"string","value":"host"}',
    },
  }] });
  assert.equal(status.byAllow.initializer, 1);
  assert.deepEqual(collectLocalOverrideFailures(status), []);
});

test("initializer overrides cannot make variable initializer bodies part of the Porter contract", () => {
  const status = buildLocalOverrideStatus(baseConfig, { units: [{
    id: "github.com/microsoft/typescript-go::internal/core/version.go::varGroup::Version",
    kind: "varGroup",
    status: "implemented",
    path: "packages/tsts/src/internal/core/version.ts",
    override: {
      category: "runtime-representation",
      allow: ["initializer"],
      reason: "This invalid fixture attempts to make a variable implementation initializer contractual.",
      goInitializer: "Version=undefined",
      tsInitializer: 'Version={"kind":"string","value":"host"}',
    },
  }] });
  assert.equal(status.failureCount, 1);
  assert.match(status.invalidInline[0].reason, /outside the declaration contract/);
});

test("buildLocalOverrideStatus accepts local value-order overrides with snapshots", () => {
  const status = buildLocalOverrideStatus(baseConfig, { units: [{
    id: "github.com/microsoft/typescript-go::internal/checker/types.go::constGroup::A+B",
    kind: "constGroup",
    status: "implemented",
    path: "packages/tsts/src/internal/checker/types.ts",
    override: {
      category: "runtime-representation",
      allow: ["value-order"],
      reason: "JavaScript const initialization requires dependency order.",
      goValueOrder: "A,B",
      tsValueOrder: "B,A",
    },
  }] });
  assert.equal(status.byAllow["value-order"], 1);
  assert.deepEqual(collectLocalOverrideFailures(status), []);
});

test("buildLocalOverrideStatus flags malformed local overrides", () => {
  const status = buildLocalOverrideStatus(
    baseConfig,
    {
      units: [
        {
          id: "github.com/microsoft/typescript-go::internal/scanner/scanner.go::func::Scan",
          path: "packages/tsts/src/internal/scanner/scanner.ts",
          override: {
            category: "",
            allow: ["signature"],
            reason: "",
            goSignature: "",
          },
        },
      ],
    },
  );
  assert.equal(status.invalidInline.length, 1);
  assert.deepEqual(collectLocalOverrideFailures(status), [
    "1 invalid local @tsgo-override entries",
  ]);
});

test("buildLocalOverrideStatus rejects unknown keys, duplicate allowances, and unregistered categories", () => {
  const status = buildLocalOverrideStatus(baseConfig, { units: [{
    id: "github.com/microsoft/typescript-go::internal/core/core.go::func::Probe",
    path: "packages/tsts/src/internal/core/core.ts",
    override: {
      category: "unreviewed-exception",
      allow: ["signature", "signature"],
      reason: "This explanation is deliberately long enough but its exception category and shape are not registered.",
      goSignature: "go",
      tsSignature: "ts",
      wildcard: true,
    },
  }] });
  assert.equal(status.invalidInline.length, 1);
  assert.match(status.invalidInline[0].reason, /not registered/);
  assert.match(status.invalidInline[0].reason, /unique/);
  assert.match(status.invalidInline[0].reason, /unknown or inapplicable/);
});

test("buildLocalOverrideStatus rejects stub and declaration-inapplicable override aspects", () => {
  const status = buildLocalOverrideStatus(baseConfig, { units: [
    {
      id: "m::a.go::type::A",
      kind: "type",
      status: "implemented",
      path: "packages/tsts/src/a.ts",
      override: {
        category: "runtime-representation",
        allow: ["initializer"],
        reason: "This type cannot legitimately claim a constant initializer declaration override.",
        goInitializer: "A=1",
        tsInitializer: "A=2",
      },
    },
    {
      id: "m::b.go::func::B",
      kind: "func",
      status: "stub",
      path: "packages/tsts/src/b.ts",
      override: {
        category: "runtime-performance",
        allow: ["signature"],
        reason: "A traceable scaffold cannot carry a declaration-signature exception.",
        goSignature: "go",
        tsSignature: "ts",
      },
    },
  ] });
  assert.equal(status.invalidInline.length, 2);
  assert.ok(status.invalidInline.some((entry) => entry.reason.includes("apply only to constGroup")));
  assert.ok(status.invalidInline.some((entry) => entry.reason.includes("stub units cannot")));
});
