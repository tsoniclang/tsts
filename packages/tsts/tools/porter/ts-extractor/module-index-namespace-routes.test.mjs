import { test } from "node:test";
import assert from "node:assert/strict";
import { buildIndexedModuleValueEnvironments, extractParsedFileDescriptors } from "./extract-signatures.mjs";
import { ANNOTATION, parserWithCount } from "./module-index-test-helpers.mjs";
import { indexTypeScriptModuleSources } from "./module-index.mjs";
import { createCanonicalTypeResolver } from "./module-resolution.mjs";

test("type and value namespaces model dual declarations, defaults, and namespace exports", async () => {
  const counted = await parserWithCount();
  const index = indexTypeScriptModuleSources(counted.api, new Map([
    ["pkg/family.ts", `
export interface I {}
export type A = string;
export class C {}
export enum E { Zero, One, Two = One + 1 }
export function f(): void {}
export const v: number = 2;
export namespace N {
  const hidden: number = 9;
  export const K: number = 3;
  export namespace Inner { export const Value: number = 6; }
  namespace PrivateInner { export const Value: number = 8; }
  export interface HiddenType {}
}
export namespace Dotted.Inner { export const Value: number = 10; }
export default 5;
`],
    ["pkg/star.ts", 'export * from "./family.js";'],
    ["pkg/explicit.ts", 'export { default as d } from "./family.js";'],
    ["pkg/namespace.ts", 'export * as family from "./family.js";'],
    ["pkg/use.ts", `
import d from "./family.js";
import { d as explicitDefault } from "./explicit.js";
import { family } from "./namespace.js";
export const total: number = d + explicitDefault + family.v + family.N.K;
`],
  ]));
  for (const name of ["I", "A", "C", "E"]) assert.ok(index.definedTypes.has(`pkg/family.ts::${name}`));
  for (const name of ["C", "E", "f", "v", "N", "default"]) assert.ok(index.definedValues.has(`pkg/family.ts::${name}`));
  assert.ok(index.exportedTypes.has("pkg/family.ts::C"));
  assert.ok(index.exportedTypes.has("pkg/family.ts::E"));
  assert.equal(index.exportedTypes.has("pkg/family.ts::f"), false);
  assert.ok(index.exportedValues.has("pkg/family.ts::C"));
  assert.ok(index.exportedValues.has("pkg/family.ts::E"));
  assert.equal(index.exportedValues.has("pkg/family.ts::I"), false);
  assert.deepEqual(index.typeNamespaceReexport.get("pkg/namespace.ts::family"), { module: "pkg/family.ts", typeOnly: false });
  const environments = buildIndexedModuleValueEnvironments(counted.api, index);
  assert.deepEqual(environments.get("pkg/use.ts").get("d"), { status: "known", value: { kind: "number", value: 5 } });
  const descriptors = extractParsedFileDescriptors(
    counted.api,
    index.modules.get("pkg/use.ts"),
    ANNOTATION,
    environments.get("pkg/use.ts"),
  );
  assert.equal(descriptors.length, 0);
  assert.deepEqual(environments.get("pkg/use.ts").get("family.N.K"), { status: "known", value: { kind: "number", value: 3 } });
  assert.equal(environments.get("pkg/use.ts").get("family.N.hidden"), undefined);
  assert.deepEqual(environments.get("pkg/use.ts").get("family.N.Inner.Value"), { status: "known", value: { kind: "number", value: 6 } });
  assert.equal(environments.get("pkg/use.ts").get("family.N.PrivateInner.Value"), undefined);
  assert.deepEqual(environments.get("pkg/use.ts").get("family.E.One"), { status: "known", value: { kind: "number", value: 1 } });
  assert.deepEqual(environments.get("pkg/use.ts").get("family.E.Two"), { status: "known", value: { kind: "number", value: 2 } });
  assert.deepEqual(environments.get("pkg/use.ts").get("family.Dotted.Inner.Value"), { status: "known", value: { kind: "number", value: 10 } });
});

test("module namespace aliases survive named and star re-exports with exact type-only state", async () => {
  const counted = await parserWithCount();
  const sources = new Map([
    ["namespace/source.ts", "export interface T {} export const V: number = 11;"],
    ["namespace/other.ts", "export interface U {}"],
    ["namespace/direct.ts", `
export * as ns from "./source.js";
export type * as types from "./source.js";
`],
    ["namespace/named.ts", 'export { ns } from "./direct.js";'],
    ["namespace/star.ts", 'export * from "./named.js";'],
    ["namespace/root.ts", 'export * as outer from "./source.js";'],
    ["namespace/default.ts", 'export * as default from "./source.js";'],
    ["namespace/other-alias.ts", 'export * as ns from "./other.js";'],
    ["namespace/shadow.ts", 'export * from "./other-alias.js"; export { ns } from "./direct.js";'],
    ["namespace/local.ts", `
export declare namespace Types { export interface T {} interface Hidden {} }
export declare namespace Runtime { export const V: number; }
`],
    ["namespace/local-barrel.ts", 'export { Types, Runtime } from "./local.js";'],
    ["namespace/local-use.ts", `
import type { Types } from "./local-barrel.js";
/** @tsgo-unit {"id":"m::namespace.go::type::LocalAlias","kind":"type"} */
export type LocalAlias = Types.T;
`],
    ["namespace/use.ts", `
import { ns } from "./star.js";
import { ns as shadowed } from "./shadow.js";
import type { types } from "./direct.js";
import * as all from "./root.js";
import defaultNamespace from "./default.js";
/** @tsgo-unit {"id":"m::namespace.go::type::Alias","kind":"type"} */
export type Alias = ns.T;
/** @tsgo-unit {"id":"m::namespace.go::type::ShadowAlias","kind":"type"} */
export type ShadowAlias = shadowed.T;
/** @tsgo-unit {"id":"m::namespace.go::type::TypeOnlyAlias","kind":"type"} */
export type TypeOnlyAlias = types.T;
/** @tsgo-unit {"id":"m::namespace.go::type::QualifiedAlias","kind":"type"} */
export type QualifiedAlias = all.outer.T;
/** @tsgo-unit {"id":"m::namespace.go::type::DefaultAlias","kind":"type"} */
export type DefaultAlias = defaultNamespace.T;
`],
  ]);
  const index = indexTypeScriptModuleSources(counted.api, sources);
  assert.deepEqual(index.typeNamespaceReexport.get("namespace/direct.ts::ns"), {
    module: "namespace/source.ts",
    typeOnly: false,
  });
  assert.deepEqual(index.typeNamespaceReexport.get("namespace/direct.ts::types"), {
    module: "namespace/source.ts",
    typeOnly: true,
  });
  assert.deepEqual(index.typeNamespaceReexport.get("namespace/named.ts::ns"), {
    module: "namespace/source.ts",
    typeOnly: false,
  });
  assert.deepEqual(index.typeNamespaceReexport.get("namespace/star.ts::ns"), {
    module: "namespace/source.ts",
    typeOnly: false,
  });
  assert.deepEqual(index.typeNamespaceReexport.get("namespace/shadow.ts::ns"), {
    module: "namespace/source.ts",
    typeOnly: false,
  });
  assert.deepEqual(index.typeNamespaceReexport.get("namespace/default.ts::default"), {
    module: "namespace/source.ts",
    typeOnly: false,
  });
  assert.deepEqual(index.typeNamespaceReexport.get("namespace/local-barrel.ts::Types"), {
    module: "namespace/local.ts",
    local: "Types",
    typeOnly: true,
  });
  assert.ok(index.definedTypes.has("namespace/local.ts::Types.T"));
  assert.ok(index.exportedTypes.has("namespace/local.ts::Types.T"));
  assert.deepEqual(index.typeNamespaceReexport.get("namespace/local-barrel.ts::Runtime"), {
    module: "namespace/local.ts",
    local: "Runtime",
    typeOnly: false,
  });
  assert.ok(index.exportedValues.has("namespace/local.ts::Runtime.V"));
  const descriptors = extractParsedFileDescriptors(counted.api, index.modules.get("namespace/use.ts"), ANNOTATION);
  assert.deepEqual(descriptors.map((descriptor) => descriptor.descriptor.type.id), [
    "namespace/source.ts::T",
    "namespace/source.ts::T",
    "namespace/source.ts::T",
    "namespace/root.ts::outer.T",
    "namespace/source.ts::T",
  ]);
  const canonicalize = createCanonicalTypeResolver({
    namedReexport: index.namedReexport,
    starReexport: index.starReexport,
    definedTypes: index.definedTypes,
    exportedTypes: index.exportedTypes,
    knownModules: new Set(index.modules.keys()),
    externalModules: index.externalModules,
    typeNamespaceReexport: index.typeNamespaceReexport,
  });
  assert.equal(canonicalize("namespace/root.ts::outer.T"), "namespace/source.ts::T");
  const localDescriptor = extractParsedFileDescriptors(counted.api, index.modules.get("namespace/local-use.ts"), ANNOTATION)[0];
  assert.equal(localDescriptor.descriptor.type.id, "namespace/local.ts::Types.T");
  assert.equal(canonicalize(localDescriptor.descriptor.type.id), "namespace/local.ts::Types.T");
  const environments = buildIndexedModuleValueEnvironments(counted.api, index);
  assert.deepEqual(environments.get("namespace/use.ts").get("ns.V"), { status: "known", value: { kind: "number", value: 11 } });
  assert.deepEqual(environments.get("namespace/use.ts").get("defaultNamespace.V"), { status: "known", value: { kind: "number", value: 11 } });
  assert.equal(environments.get("namespace/use.ts").get("types.V"), undefined);

  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([
      ["namespace/a.ts", 'export * as ns from "./source.js";'],
      ["namespace/b.ts", 'export * as ns from "./other.js";'],
      ["namespace/source.ts", "export interface T {}"],
      ["namespace/other.ts", "export interface U {}"],
      ["namespace/ambiguous.ts", 'export * from "./a.js"; export * from "./b.js";'],
    ])),
    /ambiguous TypeScript (?:value star|namespace) re-export/,
  );
});

test("namespace routes stay independent and hide private qualified members", async () => {
  const counted = await parserWithCount();
  const index = indexTypeScriptModuleSources(counted.api, new Map([
    ["routes/type-source.ts", "export interface T {}"],
    ["routes/value-source.ts", "export const V: number = 17;"],
    ["routes/type-route.ts", 'export type * as ns from "./type-source.js";'],
    ["routes/value-route.ts", 'export * as ns from "./value-source.js";'],
    ["routes/barrel.ts", 'export type { ns } from "./type-route.js"; export * from "./value-route.js";'],
    ["routes/private.ts", "export namespace Public { interface Hidden {} export interface Visible {} }"],
    ["routes/private-barrel.ts", 'export { Public as ns } from "./private.js";'],
    ["routes/use.ts", 'import { ns } from "./barrel.js"; export const result: number = ns.V;'],
  ]));
  assert.deepEqual(index.typeNamespaceReexport.get("routes/barrel.ts::ns"), {
    module: "routes/type-source.ts",
    typeOnly: true,
  });
  assert.deepEqual(index.valueNamespaceReexport.get("routes/barrel.ts::ns"), {
    module: "routes/value-source.ts",
    typeOnly: false,
  });
  const canonicalize = createCanonicalTypeResolver({
    namedReexport: index.namedReexport,
    starReexport: index.starReexport,
    definedTypes: index.definedTypes,
    exportedTypes: index.exportedTypes,
    knownModules: new Set(index.modules.keys()),
    externalModules: index.externalModules,
    typeNamespaceReexport: index.typeNamespaceReexport,
  });
  assert.equal(canonicalize("routes/barrel.ts::ns.T"), "routes/type-source.ts::T");
  assert.equal(canonicalize("routes/private-barrel.ts::ns.Visible"), "routes/private.ts::Public.Visible");
  assert.throws(() => canonicalize("routes/private-barrel.ts::ns.Hidden"), /does not resolve/);
  const environments = buildIndexedModuleValueEnvironments(counted.api, index);
  assert.deepEqual(environments.get("routes/use.ts").get("ns.V"), { status: "known", value: { kind: "number", value: 17 } });
});
