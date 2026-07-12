import assert from "node:assert/strict";
import test from "node:test";

import { assertPorterConfig } from "./core/config-contract.mjs";

const base = {
  schemaVersion: 1,
  sourceRoot: "vendor/go",
  tsRoot: "src",
  goModulePath: "example.test/project",
  snapshotOut: ".temp/snapshot.json",
  statusOut: ".temp/status.json",
  reportOut: ".temp/status.md",
  primaryUnitKinds: ["func", "type"],
};

test("Porter config rejects unknown and retired top-level contracts", () => {
  assert.equal(assertPorterConfig(structuredClone(base)).schemaVersion, 1);
  for (const key of ["astGeneratedStatusOut", "diagnosticsGeneratedStatusOut", "generatedPolicy", "schemaSourceSyncChecks", "futureGuess"]) {
    assert.throws(() => assertPorterConfig({ ...base, [key]: true }), /unknown current-contract key/);
  }
});

test("Porter config requires exact core identity and unit-kind fields", () => {
  assert.throws(() => assertPorterConfig({ ...base, schemaVersion: 2 }), /schemaVersion must be 1/);
  assert.throws(() => assertPorterConfig({ ...base, goModulePath: "" }), /goModulePath must be a non-empty string/);
  assert.throws(() => assertPorterConfig({ ...base, primaryUnitKinds: ["func", "func"] }), /must be unique/);
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
