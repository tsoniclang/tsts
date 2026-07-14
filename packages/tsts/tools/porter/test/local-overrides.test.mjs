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
  testSigHash,
  unitRecord,
} from "./helpers.mjs";

test("buildLocalOverrideStatus accepts local signature overrides with exact hashes", () => {
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
            goSignatureHash: "0".repeat(64),
            tsSignatureHash: "1".repeat(64),
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

test("buildLocalOverrideStatus accepts exact runtime zero dictionaries without broad snapshots", () => {
  const status = buildLocalOverrideStatus(baseConfig, { units: [{
    id: "github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.Get",
    kind: "method",
    status: "implemented",
    path: "packages/tsts/src/internal/collections/ordered_map.ts",
    override: {
      category: "runtime-representation",
      allow: ["signature"],
      reason: "Erased generic execution receives an explicit static zero-value dictionary for this declaration.",
      runtimeDictionaries: [{ kind: "zero-value", parameter: "zeroValue", typeParameter: "V" }],
    },
  }] });

  assert.equal(status.inline, 1);
  assert.deepEqual(status.units[0].runtimeDictionaries, [
    { kind: "zero-value", parameter: "zeroValue", typeParameter: "V" },
  ]);
  assert.deepEqual(collectLocalOverrideFailures(status), []);
});

test("runtime zero and equality dictionaries may bind the same erased type parameter", () => {
  const status = buildLocalOverrideStatus(baseConfig, { units: [{
    id: "github.com/microsoft/typescript-go::internal/core/core.go::func::FirstNonZero",
    kind: "func",
    status: "implemented",
    path: "packages/tsts/src/internal/core/core.ts",
    override: {
      category: "runtime-representation",
      allow: ["signature"],
      reason: "Erased generic zero comparison receives exact static zero-value and equality dictionaries.",
      runtimeDictionaries: [
        { kind: "zero-value", parameter: "zeroValue", typeParameter: "T" },
        { kind: "equality", parameter: "equal", typeParameter: "T" },
      ],
    },
  }] });

  assert.deepEqual(collectLocalOverrideFailures(status), []);
});

test("runtime map-key dictionaries are accepted for comparable type parameters", () => {
  const status = buildLocalOverrideStatus(baseConfig, { units: [{
    id: "github.com/microsoft/typescript-go::internal/core/core.go::func::UnorderedEqual",
    kind: "func",
    status: "implemented",
    path: "packages/tsts/src/internal/core/core.ts",
    override: {
      category: "runtime-representation",
      allow: ["signature"],
      reason: "Erased generic map construction receives the exact static Go map-key descriptor.",
      runtimeDictionaries: [
        { kind: "map-key", parameter: "keyDescriptor", typeParameter: "T" },
      ],
    },
  }] });

  assert.deepEqual(collectLocalOverrideFailures(status), []);
});

test("runtime value-operation dictionaries replace zero-only evidence for the same type parameter", () => {
  const accepted = buildLocalOverrideStatus(baseConfig, { units: [{
    id: "github.com/microsoft/typescript-go::internal/core/arena.go::method::Arena.Clone",
    kind: "method",
    status: "implemented",
    path: "packages/tsts/src/internal/core/arena.ts",
    override: {
      category: "runtime-representation",
      allow: ["signature"],
      reason: "Erased generic copy receives exact static zero and copy operations.",
      runtimeDictionaries: [
        { kind: "value-ops", parameter: "valueOps", typeParameter: "T" },
      ],
    },
  }] });
  assert.deepEqual(collectLocalOverrideFailures(accepted), []);

  const rejected = buildLocalOverrideStatus(baseConfig, { units: [{
    id: "github.com/microsoft/typescript-go::internal/core/arena.go::method::Arena.Clone",
    kind: "method",
    status: "implemented",
    path: "packages/tsts/src/internal/core/arena.ts",
    override: {
      category: "runtime-representation",
      allow: ["signature"],
      reason: "This invalid fixture duplicates zero evidence through two dictionary shapes.",
      runtimeDictionaries: [
        { kind: "zero-value", parameter: "zeroValue", typeParameter: "T" },
        { kind: "value-ops", parameter: "valueOps", typeParameter: "T" },
      ],
    },
  }] });
  assert.equal(rejected.failureCount, 1);
  assert.match(rejected.invalidInline[0].reason, /cannot combine 'value-ops' with 'zero-value' for type parameter 'T'/);

  const reversed = {
    id: "github.com/microsoft/typescript-go::internal/core/arena.go::method::Arena.Clone",
    kind: "method",
    status: "implemented",
    path: "packages/tsts/src/internal/core/arena.ts",
    override: {
      category: "runtime-representation",
      allow: ["signature"],
      reason: "This invalid fixture duplicates zero evidence in reverse order.",
      runtimeDictionaries: [
        { kind: "value-ops", parameter: "valueOps", typeParameter: "T" },
        { kind: "zero-value", parameter: "zeroValue", typeParameter: "T" },
      ],
    },
  };
  const reversedStatus = buildLocalOverrideStatus(baseConfig, { units: [reversed] });
  assert.equal(reversedStatus.failureCount, 1);
  assert.match(reversedStatus.invalidInline[0].reason, /cannot combine 'zero-value' with 'value-ops' for type parameter 'T'/);
});

test("runtime dictionary metadata is closed and declaration-specific", () => {
  const invalidOverrides = [
    [{
      category: "runtime-performance",
      allow: ["signature"],
      reason: "This invalid fixture uses the wrong registered category for a runtime dictionary.",
      runtimeDictionaries: [{ kind: "zero-value", parameter: "zeroValue", typeParameter: "V" }],
    }, /require category 'runtime-representation'/],
    [{
      category: "runtime-representation",
      allow: ["signature", "initializer"],
      reason: "This invalid fixture attempts to combine a dictionary projection with another allowance.",
      runtimeDictionaries: [{ kind: "zero-value", parameter: "zeroValue", typeParameter: "V" }],
    }, /require exactly allow/],
    [{
      category: "runtime-representation",
      allow: ["signature"],
      reason: "This invalid fixture duplicates both the runtime parameter and its source type parameter.",
      runtimeDictionaries: [
        { kind: "zero-value", parameter: "zeroValue", typeParameter: "V" },
        { kind: "zero-value", parameter: "zeroValue", typeParameter: "V" },
      ],
    }, /parameter duplicates 'zeroValue'.*duplicates the 'zero-value' dictionary for type parameter 'V'/],
    [{
      category: "runtime-representation",
      allow: ["signature"],
      reason: "This invalid fixture attempts to preserve a broad signature snapshot beside a dictionary.",
      runtimeDictionaries: [{ kind: "zero-value", parameter: "zeroValue", typeParameter: "V" }],
      goSignatureHash: "0".repeat(64),
    }, /unknown or inapplicable override key 'goSignatureHash'/],
    [{
      category: "runtime-representation",
      allow: ["signature"],
      reason: "This invalid fixture uses an unregistered dictionary kind.",
      runtimeDictionaries: [{ kind: "legacy-copy", parameter: "copy", typeParameter: "V" }],
    }, /kind must be 'zero-value', 'value-ops', 'equality', or 'map-key'/],
  ];

  for (const [override, expectedIssue] of invalidOverrides) {
    const status = buildLocalOverrideStatus(baseConfig, { units: [{
      id: "m::ordered_map.go::method::OrderedMap.Get",
      kind: "method",
      status: "implemented",
      path: "packages/tsts/src/internal/collections/ordered_map.ts",
      override,
    }] });
    assert.equal(status.failureCount, 1);
    assert.match(status.invalidInline[0].reason, expectedIssue);
  }
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
            goSignatureHash: "",
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
      goSignatureHash: "0".repeat(64),
      tsSignatureHash: "1".repeat(64),
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
        goSignatureHash: "0".repeat(64),
        tsSignatureHash: "1".repeat(64),
      },
    },
  ] });
  assert.equal(status.invalidInline.length, 2);
  assert.ok(status.invalidInline.some((entry) => entry.reason.includes("apply only to constGroup")));
  assert.ok(status.invalidInline.some((entry) => entry.reason.includes("stub units cannot")));
});
