import assert from "node:assert/strict";
import test from "node:test";

import { buildDependencySemanticTypeIndex } from "../../core/external-facades.mjs";
import { externalTypeScriptDeclarationHash } from "../../core/external-facade-runtime-adaptation.mjs";
import { semanticDeclarationVariantsHash } from "../../core/semantic-declaration-hash.mjs";
import { collectAuthoredFacadeMismatches } from "../../sig-check/authored-facades.mjs";
import { baseConfig } from "../helpers.mjs";
import {
  basic,
  externalSnapshot,
  externalType,
  finalizeExternalFacadeFixtureCatalog,
} from "../external-facade-fixtures.mjs";
import { loadParser } from "../../ts-extractor/ast-signatures.mjs";
import { buildIndexedModuleValueEnvironments, extractIndexedTypeExportDescriptor } from "../../ts-extractor/extract-signatures.mjs";
import { indexTypeScriptModuleSources } from "../../ts-extractor/module-index.mjs";
import { loadProfile } from "../../ts-extractor/profile.mjs";

const parser = await loadParser();

function authoredTypeHash(moduleId, name, source, additionalSources = new Map()) {
  const moduleIndex = indexTypeScriptModuleSources(parser, new Map([[moduleId, source], ...additionalSources]));
  const valueEnvironments = buildIndexedModuleValueEnvironments(parser, moduleIndex);
  return externalTypeScriptDeclarationHash(
    extractIndexedTypeExportDescriptor(parser, moduleIndex, moduleId, name, valueEnvironments).descriptor,
  );
}

function finalizedCatalog(config, snapshot, moduleIndex) {
  return finalizeExternalFacadeFixtureCatalog(config, snapshot, {
    api: parser,
    moduleIndex,
    valueEnvironments: buildIndexedModuleValueEnvironments(parser, moduleIndex),
  });
}

test("authored scalar adaptation can name one exact generated scalar carrier", () => {
  const api = parser;
  const objectId = "example.com/native::type::Count";
  const snapshot = externalSnapshot([
    externalType({ packagePath: "example.com/native", name: "Count", rhs: basic("int") }),
  ]);
  const semantic = buildDependencySemanticTypeIndex(snapshot).get(objectId);
  const moduleId = `${baseConfig.tsRoot}/go/example.com/native.ts`;
  const scalarModuleId = `${baseConfig.tsRoot}/go/scalars.ts`;
  const source = 'import type { int } from "../scalars.js"; export type Count = int;';
  const scalarSource = "export type int = number;";
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [{
      objectId,
      tsModule: "go/example.com/native.ts",
      tsName: "Count",
      storageStrategy: "authored",
      runtimeAdaptation: {
        representation: "scalar",
        scalarStorage: "number",
        scalarCarrierIdentity: `${scalarModuleId}::int`,
        nominality: "erased",
        nominalityReason: "The shared generated integer carrier intentionally erases this defined Go type identity.",
        goDeclarationHash: semanticDeclarationVariantsHash(semantic),
        tsDeclarationHash: authoredTypeHash(moduleId, "Count", source, new Map([[scalarModuleId, scalarSource]])),
        reason: "The authored count uses the exact generated Go integer carrier rather than an implicit keyword alias.",
      },
    }],
  };
  const audit = (facadeSource, carrierSource, additionalSources = new Map(), canonicalIdentity = (identity) => identity) => {
    const sources = new Map([[scalarModuleId, carrierSource], ...additionalSources]);
    const auditedConfig = {
      ...config,
      externalFacadePolicies: [{
        ...config.externalFacadePolicies[0],
        runtimeAdaptation: {
          ...config.externalFacadePolicies[0].runtimeAdaptation,
          tsDeclarationHash: authoredTypeHash(moduleId, "Count", facadeSource, sources),
        },
      }],
    };
    const moduleIndex = indexTypeScriptModuleSources(api, new Map([[moduleId, facadeSource], ...sources]));
    return collectAuthoredFacadeMismatches({
      api,
      canonicalIdentity,
      config: auditedConfig,
      conventions: {},
      facades: finalizedCatalog(auditedConfig, snapshot, moduleIndex),
      moduleIndex,
      profile: loadProfile(config),
      snapshot,
      valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
    });
  };
  assert.deepEqual(audit(source, scalarSource).mismatches, []);
  assert.deepEqual(audit('import type { int as NativeInt } from "../scalars.js"; export type Count = NativeInt;', scalarSource).mismatches, []);
  const barrelModuleId = `${baseConfig.tsRoot}/go/scalar-barrel.ts`;
  assert.deepEqual(audit(
    'import type { int as NativeInt } from "../scalar-barrel.js"; export type Count = NativeInt;',
    scalarSource,
    new Map([[barrelModuleId, 'export type { int } from "./scalars.js";']]),
  ).mismatches, []);
  for (const carrierSource of [
    "export type int = string;",
    "export interface int {}",
    "export class int {}",
    "export type int<T = number> = number;",
    "export type Base = number; export type int = Base;",
  ]) {
    assert.ok(audit(source, carrierSource).mismatches.some((mismatch) =>
      mismatch.kind === "authored-facade-contract-error" && mismatch.detail.includes("must be one exact 'number' alias")));
  }
  const reexportSource = 'export type { int } from "./scalar-origin.js";';
  const scalarOriginModuleId = `${baseConfig.tsRoot}/go/scalar-origin.ts`;
  assert.ok(audit(source, reexportSource, new Map([[scalarOriginModuleId, scalarSource]])).mismatches.some((mismatch) =>
    mismatch.kind === "authored-facade-contract-error" && mismatch.detail.includes("stored directly")));
  for (const [facadeSource, carrierSource] of [
    ["export type Count = number;", scalarSource],
    ['import type { Equivalent } from "../scalars.js"; export type Count = Equivalent;', "export type int = number; export type Equivalent = int;"],
    ['import type { Carrier } from "../scalars.js"; export type Count = Carrier<number>;', "export type int = number; export type Carrier<T> = T;"],
  ]) {
    assert.ok(audit(facadeSource, carrierSource).mismatches.some((mismatch) =>
      mismatch.kind === "authored-facade-contract-error" && mismatch.detail.includes("must use its exact 'number' storage carrier")));
  }
  const equivalentSource = 'import type { Equivalent } from "../scalars.js"; export type Count = Equivalent;';
  const equivalentCarrierSource = "export type int = number; export type Equivalent = number;";
  assert.ok(audit(
    equivalentSource,
    equivalentCarrierSource,
    new Map(),
    (identity) => identity.endsWith("::Equivalent") ? `${scalarModuleId}::int` : identity,
  ).mismatches.some((mismatch) =>
    mismatch.kind === "authored-facade-contract-error" && mismatch.detail.includes("must use its exact 'number' storage carrier")));
});
