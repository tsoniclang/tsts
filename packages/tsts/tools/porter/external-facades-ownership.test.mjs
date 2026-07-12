import assert from "node:assert/strict";
import test from "node:test";

import { buildExternalFacadeMap } from "./core/external-facades.mjs";
import { renderGeneratedArtifact } from "./core/facade-artifacts.mjs";
import { collectAuthoredFacadeMismatches } from "./sig-check/authored-facades.mjs";
import { basic, externalSnapshot, externalType, interfaceType } from "./test/external-facade-fixtures.mjs";
import { baseConfig } from "./test/helpers.mjs";
import { loadParser } from "./ts-extractor/ast-signatures.mjs";
import { buildIndexedModuleValueEnvironments } from "./ts-extractor/extract-signatures.mjs";
import { indexTypeScriptModuleSources } from "./ts-extractor/module-index.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";

const parser = await loadParser();

test("the full authored policy catalog is validated before active facade selection", () => {
  const used = externalType({ packagePath: "example.com/native", name: "Used", rhs: basic("int") });
  const unused = externalType({ packagePath: "example.com/native", name: "Unused", rhs: basic("int") });
  const snapshot = externalSnapshot([used, unused], [used.object.id]);
  assert.throws(() => buildExternalFacadeMap({
    ...baseConfig,
    externalFacadePolicies: [{
      objectId: unused.object.id,
      tsModule: "go/example.com/native.ts",
      tsName: "Unused",
      storageStrategy: "authored",
    }],
  }, snapshot), /authored storage outside config\.authoredFacadeModules/);
  assert.throws(() => buildExternalFacadeMap({
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts", "go/example.com/native.ts"],
  }, snapshot), /authoredFacadeModules duplicates/);
  assert.throws(
    () => buildExternalFacadeMap(baseConfig, snapshot),
    /is not recursively reachable from an active Go declaration/,
  );
});

test("authored facade storage cannot alias Porter-generated declaration storage", () => {
  const api = parser;
  const declaration = externalType({ packagePath: "example.com/native", name: "Facade", rhs: interfaceType() });
  const snapshot = externalSnapshot([declaration]);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/authored.ts"],
    externalFacadePolicies: [{
      objectId: declaration.object.id,
      tsModule: "go/authored.ts",
      tsName: "Facade",
      storageStrategy: "authored",
    }],
  };
  const generatedBody = "export interface Shared { Read(): void; }\n";
  const generated = renderGeneratedArtifact(snapshot, "go/generated.ts", "go-facade", generatedBody);
  const moduleIndex = indexTypeScriptModuleSources(api, new Map([
    [`${config.tsRoot}/go/authored.ts`, 'export { Shared as Facade } from "./generated.js";'],
    [`${config.tsRoot}/go/generated.ts`, generated],
  ]));
  const result = collectAuthoredFacadeMismatches({
    api,
    canonicalIdentity: (identity) => identity,
    config,
    conventions: {},
    moduleIndex,
    profile: loadProfile(config),
    snapshot,
    valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
  });
  assert.ok(result.mismatches.some((mismatch) => mismatch.kind === "authored-facade-contract-error" &&
    mismatch.detail.includes("must be stored directly")));
});
