import assert from "node:assert/strict";
import test from "node:test";

import { loadParser } from "./ast-signatures.mjs";
import { extractParsedFileDescriptors } from "./extract-signatures.mjs";
import { indexTypeScriptModuleSources } from "./module-index.mjs";
import { createCanonicalDeclarationResolver } from "./module-resolution.mjs";

const annotation = { tag: "@tsgo-unit", idSeparator: "::", methodNameJoin: "_" };
const parser = await loadParser();

test("descriptor extraction resolves local values without conflating type and value exports", () => {
  const index = indexTypeScriptModuleSources(parser, new Map([
    ["pkg/type.ts", "export interface Shared {}"],
    ["pkg/value.ts", "export const Shared = class {};"],
    ["pkg/namespace-source.ts", "export const present = 1;"],
    ["pkg/namespace-barrel.ts", 'export * as api from "./namespace-source.js";'],
    ["pkg/barrel.ts", 'export type { Shared } from "./type.js"; export { Shared } from "./value.js";'],
    ["pkg/use.ts", `
import { Shared } from "./barrel.js";
const localValue = 1;
/** @tsgo-unit {"id":"m::use.go::type::LocalType","kind":"type"} */
export type LocalType = typeof localValue;
/** @tsgo-unit {"id":"m::use.go::type::Derived","kind":"type"} */
export class Derived extends Shared {}
`],
  ]));
  const descriptors = extractParsedFileDescriptors(parser, index.modules.get("pkg/use.ts"), annotation);
  assert.deepEqual(descriptors[0].descriptor.type, { t: "query", id: "pkg/use.ts::localValue", args: [] });
  assert.equal(descriptors[1].descriptor.heritage[0].space, "value");

  const canonical = createCanonicalDeclarationResolver(index);
  assert.equal(canonical("pkg/barrel.ts::Shared", "type"), "pkg/type.ts::Shared");
  assert.equal(canonical("pkg/barrel.ts::Shared", "value"), "pkg/value.ts::Shared");
  assert.equal(canonical("pkg/namespace-barrel.ts::api", "value"), "namespace-value:pkg/namespace-source.ts::*");
});

test("qualified descriptor identities require an exact local or imported namespace member", () => {
  const index = indexTypeScriptModuleSources(parser, new Map([
    ["pkg/dependency.ts", "export const left = 1; export const right = 2;"],
    ["pkg/qualified.ts", `
import type * as TypeOnly from "./dependency.js";
namespace LocalTypes { export interface Entry {} }
namespace LocalValues { export const entry = 1; }
/** @tsgo-unit {"id":"m::qualified.go::type::LocalType","kind":"type"} */
export type LocalType = LocalTypes.Entry;
/** @tsgo-unit {"id":"m::qualified.go::type::MissingType","kind":"type"} */
export type MissingType = LocalValues.entry;
/** @tsgo-unit {"id":"m::qualified.go::type::LocalValue","kind":"type"} */
export type LocalValue = typeof LocalValues.entry;
/** @tsgo-unit {"id":"m::qualified.go::type::MissingValue","kind":"type"} */
export type MissingValue = typeof LocalTypes.Entry;
/** @tsgo-unit {"id":"m::qualified.go::type::LeftValue","kind":"type"} */
export type LeftValue = typeof TypeOnly.left;
/** @tsgo-unit {"id":"m::qualified.go::type::RightValue","kind":"type"} */
export type RightValue = typeof TypeOnly.right;
`],
  ]));
  const descriptors = extractParsedFileDescriptors(parser, index.modules.get("pkg/qualified.ts"), annotation)
    .map((entry) => entry.descriptor.type.id);
  assert.deepEqual(descriptors.slice(0, 4), [
    "pkg/qualified.ts::LocalTypes.Entry",
    "unresolved::LocalValues.entry",
    "pkg/qualified.ts::LocalValues.entry",
    "unresolved-value::LocalTypes.Entry",
  ]);
  assert.match(descriptors[4], /^unresolved-value::type-only-import:/);
  assert.match(descriptors[5], /^unresolved-value::type-only-import:/);
  assert.notEqual(descriptors[4], descriptors[5]);
});
