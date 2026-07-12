import assert from "node:assert/strict";
import test from "node:test";

import { assertPorterConfig } from "./core/config-contract.mjs";

const base = {
  schemaVersion: 2,
  sourceRoot: "vendor/go",
  tsRoot: "src",
  goModulePath: "example.test/project",
  snapshotOut: ".temp/snapshot.json",
  statusOut: ".temp/status.json",
  reportOut: ".temp/status.md",
  nonGoDeclarationManifestPath: "porter.non-go-declarations.json",
};

test("Porter config rejects unknown and retired top-level contracts", () => {
  assert.equal(assertPorterConfig(structuredClone(base)).schemaVersion, 2);
  for (const key of ["astGeneratedStatusOut", "diagnosticsGeneratedStatusOut", "generatedPolicy", "nonGoDeclarationPolicies", "nonGoExportRoutePolicies", "overrides", "primaryUnitKinds", "schemaSourceSyncChecks", "futureGuess"]) {
    assert.throws(() => assertPorterConfig({ ...base, [key]: true }), /unknown current-contract key/);
  }
});

test("Porter config requires exact core identity and policy fields", () => {
  assert.throws(() => assertPorterConfig({ ...base, schemaVersion: 1 }), /schemaVersion must be 2/);
  assert.throws(() => assertPorterConfig({ ...base, goModulePath: "" }), /goModulePath must be a non-empty string/);
  assert.throws(() => assertPorterConfig({ ...base, nonGoDeclarationManifestPath: "../manifest.json" }), /canonical repository-relative/);
  assert.throws(() => assertPorterConfig({ ...base, policies: [{ match: "internal/**", category: "typo", reason: "invalid" }] }), /unknown configured Porter policy category/);
  assert.throws(() => assertPorterConfig({ ...base, policies: [{ match: "internal/**", category: "out-of-scope", active: false, reason: "invalid dual disposition" }] }), /keys must be exactly/);
  assert.throws(() => assertPorterConfig({ ...base, unitPolicies: [{ id: "one", match: "two", category: "out-of-scope", reason: "ambiguous" }] }), /exactly one of id or match/);
});

test("external package selections bind one exact Go object to authored TypeScript storage", () => {
  const exact = {
    ...base,
    authoredFacadeModules: ["go/errors.ts"],
    externalPackageSurfaceSelections: [{ objectId: "errors::func::New", tsModule: "go/errors.ts", tsName: "New" }],
  };
  assert.equal(assertPorterConfig(exact), exact);
  assert.throws(() => assertPorterConfig({
    ...exact,
    externalPackageSurfaceSelections: [{ objectId: "errors::func::New", tsModule: "go/missing.ts", tsName: "New" }],
  }), /not listed in config\.authoredFacadeModules/);
  assert.throws(() => assertPorterConfig({
    ...exact,
    externalPackageSurfaceSelections: [
      ...exact.externalPackageSurfaceSelections,
      { objectId: "errors::var::Other", tsModule: "go/errors.ts", tsName: "New" },
    ],
  }), /duplicates TypeScript storage/);
  assert.throws(() => assertPorterConfig({
    ...exact,
    externalPackageSurfaceSelections: [{ objectId: "errors::package::all", tsModule: "go/errors.ts", tsName: "all" }],
  }), /package::\(const\|func\|type\|var\)::name/);
});

test("external facade configuration is validated completely before semantic scanning", () => {
  const runtimeAdaptation = {
    representation: "scalar",
    scalarStorage: "number",
    nominality: "erased",
    nominalityReason: "The test deliberately erases the defined Go numeric identity in reviewed scalar storage.",
    goDeclarationHash: "a".repeat(64),
    tsDeclarationHash: "b".repeat(64),
    reason: "The test stores this exact Go type in one reviewed TypeScript numeric scalar declaration.",
  };
  const exact = {
    ...base,
    authoredFacadeModules: ["go/time.ts"],
    externalFacadePolicies: [{
      objectId: "time::type::Duration",
      tsModule: "go/time.ts",
      tsName: "Duration",
      storageStrategy: "authored",
      runtimeAdaptation,
    }],
  };
  assert.equal(assertPorterConfig(exact), exact);
  assert.throws(() => assertPorterConfig({ ...exact, authoredFacadeModules: ["go/time.ts", "go/time.ts"] }), /authoredFacadeModules duplicates/);
  assert.throws(() => assertPorterConfig({
    ...exact,
    externalFacadePolicies: [{ ...exact.externalFacadePolicies[0], goKind: "type" }],
  }), /forbidden hand-authored Go semantic field/);
  assert.throws(() => assertPorterConfig({
    ...exact,
    externalFacadePolicies: [{ ...exact.externalFacadePolicies[0], tsModule: "go/other.ts" }],
  }), /authored storage outside/);
  assert.throws(() => assertPorterConfig({
    ...exact,
    externalFacadePolicies: [
      exact.externalFacadePolicies[0],
      { ...exact.externalFacadePolicies[0], objectId: "time::type::Other" },
    ],
  }), /duplicates TypeScript storage/);
  assert.throws(() => assertPorterConfig({
    ...exact,
    externalFacadePolicies: [{
      ...exact.externalFacadePolicies[0],
      runtimeAdaptation: { ...runtimeAdaptation, scalarStorage: "float" },
    }],
  }), /requires exact scalarStorage/);
  const carrierConfig = {
    ...exact,
    externalFacadePolicies: [{
      ...exact.externalFacadePolicies[0],
      runtimeAdaptation: { ...runtimeAdaptation, scalarCarrierIdentity: "src/go/scalars.ts::int" },
    }],
  };
  assert.equal(assertPorterConfig(carrierConfig), carrierConfig);
  for (const scalarCarrierIdentity of [
    "",
    "src/go/scalars.ts",
    "src/go/scalars.ts::",
    "::int",
    "src/go/a::b.ts::int",
    "src/go/a?.ts::int",
    "src/go/a#.ts::int",
    "src/go/a\0b.ts::int",
    "../src/go/scalars.ts::int",
    "src/go/scalars.js::int",
    "src/go/scalars.ts::class",
  ]) {
    assert.throws(() => assertPorterConfig({
      ...carrierConfig,
      externalFacadePolicies: [{
        ...carrierConfig.externalFacadePolicies[0],
        runtimeAdaptation: { ...carrierConfig.externalFacadePolicies[0].runtimeAdaptation, scalarCarrierIdentity },
      }],
    }), /scalarCarrierIdentity/);
  }
});

test("selected external type storage cannot disagree with an explicit facade policy", () => {
  const config = {
    ...base,
    authoredFacadeModules: ["go/native.ts", "go/other.ts"],
    externalFacadePolicies: [{
      objectId: "example.test/native::type::Token",
      tsModule: "go/native.ts",
      tsName: "Token",
      storageStrategy: "authored",
    }],
    externalPackageSurfaceSelections: [{
      objectId: "example.test/native::type::Token",
      tsModule: "go/other.ts",
      tsName: "OtherToken",
    }],
  };
  assert.throws(() => assertPorterConfig(config), /disagrees with its externalFacadePolicies storage identity/);
});
