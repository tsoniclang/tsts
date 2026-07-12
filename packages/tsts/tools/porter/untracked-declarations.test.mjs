import assert from "node:assert/strict";
import test from "node:test";

import { collectUntrackedTypeScriptDeclarations } from "./sig-check/untracked-declarations.mjs";
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
  assert.ok(exportedNames.some((name) => name.startsWith("<anonymous@")));
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
  const config = {
    ...exactConfig(),
    nonGoDeclarationPolicies: [{
      declarationHash: declaration.declarationHash,
      file: declaration.file,
      fragmentIndex: declaration.fragmentIndex,
      kind: declaration.kind,
      name: declaration.name,
      namespaces: declaration.namespaces,
      reason: "This helper is authored runtime infrastructure with an explicitly reviewed declaration contract.",
    }],
    nonGoExportRoutePolicies: [{
      file: route.file,
      name: route.name,
      namespace: route.namespace,
      reason: "This runtime helper export is an explicitly reviewed non-Go module contract route.",
      routeHash: route.routeHash,
      target: route.target,
    }],
  };
  const accepted = collectUntrackedTypeScriptDeclarations({ api: counted.api, annotation: ANNOTATION, config, moduleIndex });
  assert.equal(accepted.reviewedDeclarations.length, 1);
  assert.equal(accepted.mismatches.length, 0);
  const driftedIndex = indexTypeScriptModuleSources(counted.api, new Map([[
    moduleId,
    "function helper(value: number): number { return value; } export { helper };",
  ]]));
  const drifted = collectUntrackedTypeScriptDeclarations({ api: counted.api, annotation: ANNOTATION, config, moduleIndex: driftedIndex });
  assert.ok(drifted.mismatches.some((row) => row.kind === "non-go-declaration-policy-drift"));
});

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
