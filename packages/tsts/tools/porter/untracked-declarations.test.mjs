import assert from "node:assert/strict";
import test from "node:test";

import { collectUntrackedTypeScriptDeclarations } from "./sig-check/untracked-declarations.mjs";
import { indexTypeScriptModuleSources } from "./ts-extractor/module-index.mjs";
import { ANNOTATION, parserWithCount } from "./ts-extractor/module-index-test-helpers.mjs";

test("untracked declaration audit respects exact group and overload ownership", async (t) => {
  const counted = await parserWithCount(t);
  if (!counted) return;
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
  assert.ok(result.reExports.some((row) => row.name.includes("star") && row.name.includes("other.ts")));
  assert.equal(result.mismatches.length, 6);
  assert.equal(result.mismatches[0].kind, "ts-export-without-go-unit");
});

test("untracked declaration audit excludes only exact accounted declaration identities", async (t) => {
  const counted = await parserWithCount(t);
  if (!counted) return;
  const moduleId = "packages/tsts/src/internal/accounted.ts";
  const moduleIndex = indexTypeScriptModuleSources(counted.api, new Map([[moduleId, `
export function bound(value: string): string { return value; }
export function unbound(value: string): string { return value; }
`] ]));
  const result = collectUntrackedTypeScriptDeclarations({
    accountedDeclarationIds: new Set([`${moduleId}::bound`]),
    api: counted.api,
    annotation: ANNOTATION,
    config: {
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
