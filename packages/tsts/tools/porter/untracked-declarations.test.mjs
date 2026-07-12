import assert from "node:assert/strict";
import test from "node:test";

import { emptyNonGoDeclarationManifest, normalizeNonGoDeclarationManifest } from "./core/non-go-declaration-manifest.mjs";
import { collectUntrackedTypeScriptDeclarations as collectUntracked } from "./sig-check/untracked-declarations.mjs";
import { declarationOwnershipIds } from "./sig-check/declaration-ownership.mjs";
import { indexTypeScriptModuleSources } from "./ts-extractor/module-index.mjs";
import { ANNOTATION, parserWithCount } from "./ts-extractor/module-index-test-helpers.mjs";

test("untracked declaration audit respects exact group and overload ownership", async () => {
  const counted = await parserWithCount();
  const moduleId = "packages/tsts/src/internal/example.ts";
  const moduleIndex = indexTypeScriptModuleSources(counted.api, new Map([[moduleId, `
/** @tsgo-unit {"id":"m::values.go::constGroup::first+second","kind":"constGroup"} */
export const first: number = 1;
export const second: number = 2;
/** @tsgo-unit {"id":"m::functions.go::func::tracked","kind":"func"} */
export function tracked(value: string): string;
export function tracked(value: string): string { return value; }
export function exportedHelper(): void {}
function aliasedHelper(): void {}
export { aliasedHelper as publicAlias };
export default function (): void {}
export namespace Added { export interface Value {} }
export * from "./other.js";
const { destructured } = { destructured: 1 };
export { destructured };
function privateHelper(): void {}
`], ["packages/tsts/src/internal/other.ts", "export interface Other {}"]]));
  const result = collectUntrackedTypeScriptDeclarations({
    api: counted.api,
    annotation: ANNOTATION,
    config: {
      tsRoot: "packages/tsts/src",
      tsFilePolicies: [{
        match: "packages/tsts/src/**/*.ts",
        category: "requires-tsgo-unit",
        reason: "Porter declarations require exact ownership.",
      }],
    },
    moduleIndex,
  });

  const exportedNames = result.exportedDeclarations.map((row) => row.name);
  assert.ok(exportedNames.includes("default"));
  assert.ok(exportedNames.includes("aliasedHelper"));
  assert.ok(exportedNames.includes("destructured"));
  assert.ok(exportedNames.includes("exportedHelper"));
  assert.ok(exportedNames.includes("Added"));
  assert.ok(exportedNames.includes("Other"));
  assert.equal(exportedNames.length, 6);
  assert.deepEqual(result.privateDeclarations.map((row) => row.name), ["privateHelper"]);
  assert.ok(result.reExports.some((row) => row.namespace === "type-star" && row.name === "*" && row.target.includes("other.ts")));
  assert.equal(result.mismatches.filter((mismatch) => mismatch.kind === "ts-declaration-without-go-unit").length, 7);
  assert.ok(result.mismatches.some((mismatch) => mismatch.kind === "ts-export-route-without-go-unit"));
});

test("untracked declaration audit excludes only exact accounted declaration identities", async () => {
  const counted = await parserWithCount();
  const moduleId = "packages/tsts/src/internal/accounted.ts";
  const moduleIndex = indexTypeScriptModuleSources(counted.api, new Map([[moduleId, `
export function bound(value: string): string { return value; }
export function unbound(value: string): string { return value; }
`] ]));
  const result = collectUntrackedTypeScriptDeclarations({
    accountedDeclarationIds: new Set(declarationOwnershipIds(moduleId, "bound", "function")),
    api: counted.api,
    annotation: ANNOTATION,
    config: {
      tsRoot: "packages/tsts/src",
      tsFilePolicies: [{
        match: "packages/tsts/src/**/*.ts",
        category: "requires-tsgo-unit",
        reason: "Porter declarations require exact ownership.",
      }],
    },
    moduleIndex,
  });
  assert.deepEqual(result.exportedDeclarations.map((row) => row.name), ["unbound"]);
});

test("test-parity declarations have one mechanical owner and cannot enter product APIs", async () => {
  const counted = await parserWithCount();
  const moduleIndex = indexTypeScriptModuleSources(counted.api, new Map([
    ["packages/tsts/src/services/public.ts", "export function publicApi(value: string): string { return value; }"],
    ["packages/tsts/src/services/public.test.ts", "import test from 'node:test'; function testHelper(): void {}"],
  ]));
  const result = collectUntrackedTypeScriptDeclarations({
    api: counted.api,
    annotation: ANNOTATION,
    config: {
      tsRoot: "packages/tsts/src",
      tsFilePolicies: [
        { match: "packages/tsts/src/**/*.test.ts", category: "test-parity", reason: "Test declarations are not product contracts." },
        { match: "packages/tsts/src/services/**", category: "public-api", reason: "Additive product APIs require exact declaration ownership." },
      ],
    },
    moduleIndex,
  });
  assert.deepEqual(result.exportedDeclarations.map((row) => `${row.file}::${row.name}`), [
    "packages/tsts/src/services/public.ts::publicApi",
  ]);
  assert.deepEqual(result.testParityFiles.map((row) => [row.file, row.declarationCount]), [
    ["packages/tsts/src/services/public.test.ts", 1],
  ]);
  assert.equal(result.testParityFiles[0].declarationInventoryHash.length, 64);
  assert.ok(result.mismatches.every((row) => row.file !== "packages/tsts/src/services/public.test.ts"));

  const visible = indexTypeScriptModuleSources(counted.api, new Map([
    ["packages/tsts/src/services/public.test.ts", "export function leaked(): void {}"],
  ]));
  const visibleResult = collectUntrackedTypeScriptDeclarations({
    api: counted.api,
    annotation: ANNOTATION,
    config: {
      tsRoot: "packages/tsts/src",
      tsFilePolicies: [{ match: "packages/tsts/src/**/*.test.ts", category: "test-parity", reason: "Tests." }],
    },
    moduleIndex: visible,
  });
  assert.ok(visibleResult.mismatches.some((row) => row.kind === "test-parity-declaration-visible"));

  const importedByProduct = indexTypeScriptModuleSources(counted.api, new Map([
    ["packages/tsts/src/services/public.ts", "import './public.test.js'; export function publicApi(): void {}"],
    ["packages/tsts/src/services/public.test.ts", "function testHelper(): void {}"],
  ]));
  const importedResult = collectUntrackedTypeScriptDeclarations({
    api: counted.api,
    annotation: ANNOTATION,
    config: {
      tsRoot: "packages/tsts/src",
      tsFilePolicies: [
        { match: "packages/tsts/src/**/*.test.ts", category: "test-parity", reason: "Test declarations are not product contracts." },
        { match: "packages/tsts/src/services/**", category: "public-api", reason: "Product APIs require exact declaration ownership." },
      ],
    },
    moduleIndex: importedByProduct,
  });
  assert.ok(importedResult.mismatches.some((row) => row.kind === "production-imports-test-parity"));
});

test("type ownership cannot hide a same-name value declaration", async () => {
  const counted = await parserWithCount();
  const moduleId = "packages/tsts/src/internal/namespaces.ts";
  const moduleIndex = indexTypeScriptModuleSources(counted.api, new Map([[moduleId, `
export interface Reader { Read(): void; }
export const Reader: number = 1;
`]]));
  const result = collectUntrackedTypeScriptDeclarations({
    accountedDeclarationIds: new Set(declarationOwnershipIds(moduleId, "Reader", "interface")),
    api: counted.api,
    annotation: ANNOTATION,
    config: exactConfig(),
    moduleIndex,
  });
  assert.deepEqual(result.exportedDeclarations.map((row) => `${row.kind}:${row.name}`), ["variable:Reader"]);
});

test("default exports, ambient declarations, and aliases require exact ownership", async () => {
  const counted = await parserWithCount();
  const moduleId = "packages/tsts/src/internal/public-shapes.ts";
  const moduleIndex = indexTypeScriptModuleSources(counted.api, new Map([[moduleId, `
const localValue: number = 1;
export { localValue as aliasValue };
export default localValue;
declare global { interface Array<T> { invented(): void; } }
declare module "native:extra" { export function invented(): void; }
`]]));
  const result = collectUntrackedTypeScriptDeclarations({
    api: counted.api,
    annotation: ANNOTATION,
    config: exactConfig(),
    moduleIndex,
  });
  assert.ok(result.exportedDeclarations.some((row) => row.kind === "export-assignment"));
  assert.ok(result.exportedDeclarations.some((row) => row.kind === "global-augmentation"));
  assert.ok(result.exportedDeclarations.some((row) => row.kind === "ambient-module"));
  assert.ok(result.reExports.some((row) => row.name === "aliasValue" && row.target === `${moduleId}::localValue`));
  assert.ok(result.mismatches.some((row) => row.kind === "ts-export-route-without-go-unit"));
});

test("reviewed non-Go policies pin exact declaration and export-route hashes", async () => {
  const counted = await parserWithCount();
  const moduleId = "packages/tsts/src/internal/reviewed.ts";
  const source = "function helper(value: string): string { return value; } export { helper };";
  const moduleIndex = indexTypeScriptModuleSources(counted.api, new Map([[moduleId, source]]));
  const first = collectUntrackedTypeScriptDeclarations({
    api: counted.api,
    annotation: ANNOTATION,
    config: exactConfig(),
    moduleIndex,
  });
  const declaration = first.exportedDeclarations[0];
  const route = first.reExports[0];
  const nonGoManifest = normalizeNonGoDeclarationManifest({
    schemaVersion: 1,
    owners: [{
      id: "runtime-infrastructure",
      reason: "This runtime infrastructure is authored in TypeScript and has no Go declaration owner.",
    }],
    declarations: [{
      declarationHash: declaration.declarationHash,
      file: declaration.file,
      fragmentIndex: declaration.fragmentIndex,
      kind: declaration.kind,
      name: declaration.name,
      namespaces: declaration.namespaces,
      owner: "runtime-infrastructure",
      visibility: declaration.visibility,
    }],
    routes: [{
      file: route.file,
      name: route.name,
      namespace: route.namespace,
      owner: "runtime-infrastructure",
      routeHash: route.routeHash,
      target: route.target,
    }],
  });
  const accepted = collectUntrackedTypeScriptDeclarations({ api: counted.api, annotation: ANNOTATION, config: exactConfig(), moduleIndex, nonGoManifest });
  assert.equal(accepted.reviewedDeclarations.length, 1);
  assert.equal(accepted.reviewedDeclarations[0].owner, "runtime-infrastructure");
  assert.equal(accepted.reviewedRoutes.length, 1);
  assert.equal(accepted.reviewedRoutes[0].ownerReason, nonGoManifest.owners[0].reason);
  assert.equal(accepted.mismatches.length, 0);
  const driftedIndex = indexTypeScriptModuleSources(counted.api, new Map([[
    moduleId,
    "function helper(value: number): number { return value; } export { helper };",
  ]]));
  const drifted = collectUntrackedTypeScriptDeclarations({ api: counted.api, annotation: ANNOTATION, config: exactConfig(), moduleIndex: driftedIndex, nonGoManifest });
  assert.ok(drifted.mismatches.some((row) => row.kind === "non-go-declaration-policy-drift"));
});

test("function-valued variables pin complete signatures while ignoring implementation bodies", async () => {
  const counted = await parserWithCount();
  const moduleId = "packages/tsts/src/internal/callback.ts";
  const inspect = (source) => collectUntrackedTypeScriptDeclarations({
    api: counted.api,
    annotation: ANNOTATION,
    config: exactConfig(),
    moduleIndex: indexTypeScriptModuleSources(counted.api, new Map([[moduleId, source]])),
  });
  const first = inspect("export const convert = <T extends string>(value: T): T => value;");
  const bodyChanged = inspect("export const convert = <T extends string>(value: T): T => { throw new Error('unused'); };");
  const signatureChanged = inspect("export const convert = <T extends string>(value: T): string => value;");
  assert.equal(first.exportedDeclarations[0].declarationHash, bodyChanged.exportedDeclarations[0].declarationHash);
  assert.notEqual(first.exportedDeclarations[0].declarationHash, signatureChanged.exportedDeclarations[0].declarationHash);
  assert.ok(first.mismatches.every((row) => row.kind !== "non-go-declaration-signature-incomplete"));

  const inferred = inspect("export const convert = (value) => value;");
  assert.ok(inferred.mismatches.some((row) => row.kind === "non-go-declaration-signature-incomplete"));
});

test("reviewed routes pin default targets and star-export closure", async () => {
  const counted = await parserWithCount();
  const moduleId = "packages/tsts/src/internal/index.ts";
  const targetId = "packages/tsts/src/internal/target.ts";
  const sources = (target) => indexTypeScriptModuleSources(counted.api, new Map([
    [moduleId, "export * from './target.js';"],
    [targetId, target],
  ]));
  const first = collectUntrackedTypeScriptDeclarations({
    api: counted.api,
    annotation: ANNOTATION,
    config: exactConfig(),
    moduleIndex: sources("export interface First {}"),
  });
  const route = first.reExports.find((row) => row.namespace === "type-star");
  const manifest = normalizeNonGoDeclarationManifest({
    schemaVersion: 1,
    owners: [OWNER_FOR_TESTS],
    declarations: [],
    routes: [{
      file: route.file,
      name: route.name,
      namespace: route.namespace,
      owner: OWNER_FOR_TESTS.id,
      routeHash: route.routeHash,
      target: route.target,
    }],
  });
  const expanded = collectUntrackedTypeScriptDeclarations({
    api: counted.api,
    annotation: ANNOTATION,
    config: exactConfig(),
    moduleIndex: sources("export interface First {} export interface Second {}"),
    nonGoManifest: manifest,
  });
  assert.ok(expanded.mismatches.some((row) => row.kind === "non-go-export-route-policy-drift"));
});

const OWNER_FOR_TESTS = {
  id: "runtime-infrastructure",
  reason: "This authored TypeScript runtime surface has no corresponding Go declaration identity.",
};

function exactConfig() {
  return {
    tsRoot: "packages/tsts/src",
    tsFilePolicies: [{
      match: "packages/tsts/src/**/*.ts",
      category: "requires-tsgo-unit",
      reason: "Porter declarations require exact ownership.",
    }],
  };
}

function collectUntrackedTypeScriptDeclarations(options) {
  return collectUntracked({ nonGoManifest: emptyNonGoDeclarationManifest(), ...options });
}
