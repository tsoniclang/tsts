import { test } from "node:test";
import assert from "node:assert/strict";
import {
  indexTypeScriptModuleSources,
  parseTypeScriptModule,
} from "./module-index.mjs";
import {
  buildIndexedModuleValueEnvironments,
  buildModuleValueEnvironments,
  extractFileDescriptors,
  extractIndexedTypeExportDescriptor,
  extractNamedDeclarationDescriptor,
  extractParsedFileDescriptors,
} from "./extract-signatures.mjs";
import { createCanonicalTypeResolver } from "./module-resolution.mjs";
import { ANNOTATION, parserWithCount } from "./module-index-test-helpers.mjs";
import "./module-index-fail-closed.test.mjs";
import "./module-index-namespace-routes.test.mjs";

test("parser-backed module index is exact and reuses every SourceFile", async (t) => {
  const counted = await parserWithCount(t);
  if (!counted) return;
  const sources = new Map([
    ["pkg/types.ts", `
const fakeSource = "export interface FakeFromString {}";
/* export interface FakeFromComment {} */
interface Local {}
export { Local };
interface Hidden {}
export { Hidden as Public };
export /* parser-only formatting */ interface Direct {}
export default class Defaulted {}
const PrivateValue: number = 8;
export const A: number = 1;
`],
    ["pkg/barrel.ts", `
export { type Direct as Alias } from "./types.js";
export * from "./types.js";
export * as namespace from "./types.js";
`],
    ["pkg/type-only.ts", 'export type * from "./types.js";'],
    ["pkg/semantic-type-only.ts", 'export { Direct as Normal } from "./types.js";'],
    ["pkg/value.ts", `
import { A } from "./barrel.js";
import * as constants from "./types.js";
/** @tsgo-unit {"id":"m::v.go::constGroup::value","kind":"constGroup"} */
export const value: number = A | 2;
`],
  ]);

  const index = indexTypeScriptModuleSources(counted.api, sources);
  assert.equal(counted.count(), sources.size);
  assert.deepEqual([...index.tsDecls.get("Direct")], ["pkg/types.ts"]);
  assert.deepEqual([...index.tsDecls.get("Local")], ["pkg/types.ts"]);
  assert.equal(index.tsDecls.has("Hidden"), false);
  assert.equal(index.tsDecls.has("Public"), false);
  assert.equal(index.tsDecls.has("FakeFromString"), false);
  assert.equal(index.tsDecls.has("FakeFromComment"), false);
  assert.ok(index.definedTypes.has("pkg/types.ts::Hidden"));
  assert.ok(index.definedTypes.has("pkg/types.ts::Defaulted"));
  assert.equal(index.namedReexport.get("pkg/types.ts::Public"), "pkg/types.ts::Hidden");
  assert.equal(index.namedReexport.get("pkg/types.ts::default"), "pkg/types.ts::Defaulted");
  assert.equal(index.namedReexport.get("pkg/barrel.ts::Alias"), "pkg/types.ts::Direct");
  assert.equal(index.valueNamedReexport.has("pkg/barrel.ts::Alias"), false);
  assert.equal(index.valueNamedReexport.has("pkg/semantic-type-only.ts::Normal"), false);
  assert.equal(index.namedReexport.get("pkg/semantic-type-only.ts::Normal"), "pkg/types.ts::Direct");
  assert.deepEqual(index.starReexport.get("pkg/barrel.ts"), ["pkg/types.ts"]);
  assert.deepEqual(index.valueStarReexport.get("pkg/barrel.ts"), ["pkg/types.ts"]);
  assert.deepEqual(index.starReexport.get("pkg/type-only.ts"), ["pkg/types.ts"]);
  assert.equal(index.valueStarReexport.has("pkg/type-only.ts"), false);
  assert.deepEqual(index.typeNamespaceReexport.get("pkg/barrel.ts::namespace"), {
    module: "pkg/types.ts",
    typeOnly: false,
  });

  const environments = buildIndexedModuleValueEnvironments(counted.api, index);
  assert.equal(environments.get("pkg/value.ts").has("constants.PrivateValue"), false);
  const descriptors = extractParsedFileDescriptors(
    counted.api,
    index.modules.get("pkg/value.ts"),
    ANNOTATION,
    environments.get("pkg/value.ts"),
  );
  assert.deepEqual(descriptors[0].descriptor.decls[0].value, { kind: "number", value: "3" });
  assert.equal(counted.count(), sources.size);

  buildModuleValueEnvironments(counted.api, sources);
  extractFileDescriptors(counted.api, "pkg/value.ts", sources.get("pkg/value.ts"), ANNOTATION);
  assert.equal(counted.count(), sources.size);
  parseTypeScriptModule(counted.api, "pkg/value.ts", "export const changed: number = 9;");
  assert.equal(counted.count(), sources.size + 1);
});

test("parser cache products stay immutable across independent module indexes", async (t) => {
  const counted = await parserWithCount(t);
  if (!counted) return;
  const cachedSource = "export interface Stable {}";
  const mutableView = parseTypeScriptModule(counted.api, "cache/stable.ts", cachedSource);
  mutableView.structure.localTypeNames.clear();
  mutableView.metadata.push({ corrupt: true });
  assert.throws(
    () => {
      mutableView.sourceFile.Statements.Nodes.length = 0;
    },
    TypeError,
  );
  const freshView = parseTypeScriptModule(counted.api, "cache/stable.ts", cachedSource);
  assert.notStrictEqual(freshView, mutableView);
  assert.strictEqual(freshView.sourceFile, mutableView.sourceFile);
  assert.ok(freshView.structure.localTypeNames.has("Stable"));
  assert.equal(freshView.sourceFile.Statements.Nodes.length, 1);
  assert.deepEqual(freshView.metadata, []);
  const useSource = `
import { ns } from "./barrel.js";
/** @tsgo-unit {"id":"m::cache.go::type::Alias","kind":"type"} */
export type Alias = ns.T;
`;
  const first = indexTypeScriptModuleSources(counted.api, new Map([
    ["cache/source-a.ts", "export interface T {}"],
    ["cache/barrel.ts", 'export * as ns from "./source-a.js";'],
    ["cache/use.ts", useSource],
  ]));
  const second = indexTypeScriptModuleSources(counted.api, new Map([
    ["cache/source-b.ts", "export interface T {}"],
    ["cache/barrel.ts", 'export * as ns from "./source-b.js";'],
    ["cache/use.ts", useSource],
  ]));
  const extractId = (index) => extractParsedFileDescriptors(
    counted.api,
    index.modules.get("cache/use.ts"),
    ANNOTATION,
  )[0].descriptor.type.id;
  assert.equal(extractId(second), "cache/source-b.ts::T");
  assert.equal(extractId(first), "cache/source-a.ts::T");
});

test("named declaration extraction requires exact local public storage and merges interface fragments", async (t) => {
  const counted = await parserWithCount(t);
  if (!counted) return;
  const index = indexTypeScriptModuleSources(counted.api, new Map([
    ["facade/local.ts", `
export interface Exact { Read(value: string): number; }
export interface Exact { readonly Closed: boolean; }
interface Hidden { value: string; }
export { Hidden as Alias };
export class Runtime { Read(): number { return 1; } }
/** @tsgo-unit {"id":"m::owned.go::type::Owned","kind":"type"} */
export interface Owned { value: string; }
`],
    ["facade/value-barrel.ts", 'export { Runtime as Alias } from "./local.js";'],
    ["facade/type-barrel.ts", 'export type { Runtime as Alias } from "./local.js";'],
  ]));
  const module = index.modules.get("facade/local.ts");
  const exact = extractNamedDeclarationDescriptor(counted.api, module, "Exact");
  assert.equal(exact.kind, "interface");
  assert.deepEqual(exact.members.map((member) => member.name), ["Read", "Closed"]);
  assert.equal(exact.fragments.length, 2);
  const environments = buildIndexedModuleValueEnvironments(counted.api, index);
  const alias = extractIndexedTypeExportDescriptor(counted.api, index, "facade/local.ts", "Alias", environments);
  assert.equal(alias.exportId, "facade/local.ts::Alias");
  assert.equal(alias.declarationId, "facade/local.ts::Hidden");
  assert.equal(alias.descriptor.name, "Hidden");
  const runtimeAlias = extractIndexedTypeExportDescriptor(counted.api, index, "facade/value-barrel.ts", "Alias", environments);
  assert.equal(runtimeAlias.declarationId, "facade/local.ts::Runtime");
  assert.equal(runtimeAlias.valueDeclarationId, "facade/local.ts::Runtime");
  assert.throws(
    () => extractIndexedTypeExportDescriptor(counted.api, index, "facade/type-barrel.ts", "Alias", environments),
    /no matching runtime value export/,
  );
  assert.throws(() => extractNamedDeclarationDescriptor(counted.api, module, "Alias"), /authored facade storage must be one exact local declaration/);
  assert.throws(
    () => extractNamedDeclarationDescriptor(counted.api, module, "Owned"),
    /cannot be both authored facade storage and @tsgo-unit storage/,
  );
});

test("module index rejects parser recovery and conflicting export identities", async (t) => {
  const counted = await parserWithCount(t);
  if (!counted) return;
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([["pkg/broken.ts", "export interface {"]])),
    /syntax diagnostic/,
  );
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([[
      "pkg/conflict.ts",
      'export type { A as X } from "./a.js"; export type { B as X } from "./b.js";',
    ]])),
    /conflicting TypeScript export/,
  );
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([
      ["pkg/one.ts", '/** @tsgo-unit {"id":"m::f.go::func::f","kind":"func"} */\nexport function f(): void {}'],
      ["pkg/two.ts", '/** @tsgo-unit {"id":"m::f.go::func::f","kind":"func"} */\nexport function f(): void {}'],
    ])),
    /duplicate @tsgo-unit id/,
  );
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([
      ["values/a.ts", "export const C: number = 1;"],
      ["values/b.ts", "export const C: number = 2;"],
      ["values/barrel.ts", 'export * from "./a.js"; export * from "./b.js";'],
    ])),
    /ambiguous TypeScript value star re-export 'values\/barrel.ts::C'/,
  );
});

test("canonical module resolution follows exact aliases and rejects ambiguous stars", async (t) => {
  const counted = await parserWithCount(t);
  if (!counted) return;
  const index = indexTypeScriptModuleSources(counted.api, new Map([
    ["pkg/a.ts", "interface Private {} export interface T {}"],
    ["pkg/b.ts", "export interface T {}"],
    ["pkg/anonymous.ts", "export default class {}"],
    ["pkg/default-alias.ts", "class Local {} export default Local;"],
    ["pkg/alias.ts", 'export { T as Alias } from "./a.js";'],
    ["pkg/star.ts", 'export * from "./a.js";'],
    ["pkg/namespace.ts", 'export * as group from "./a.js";'],
  ]));
  const canonicalize = createCanonicalTypeResolver({
    namedReexport: index.namedReexport,
    starReexport: index.starReexport,
    definedTypes: index.definedTypes,
    exportedTypes: index.exportedTypes,
    knownModules: new Set(index.modules.keys()),
    typeNamespaceReexport: index.typeNamespaceReexport,
  });
  assert.equal(canonicalize("pkg/alias.ts::Alias"), "pkg/a.ts::T");
  assert.equal(canonicalize("pkg/anonymous.ts::default"), "pkg/anonymous.ts::default");
  assert.equal(canonicalize("pkg/default-alias.ts::default"), "pkg/default-alias.ts::Local");
  assert.equal(canonicalize("pkg/star.ts::T"), "pkg/a.ts::T");
  assert.throws(() => canonicalize("pkg/star.ts::Private"), /does not resolve to an indexed type declaration/);
  assert.throws(() => canonicalize("pkg/namespace.ts::group"), /cannot be compared as a terminal type/);
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([
      ["pkg/a.ts", "export interface T {}"],
      ["pkg/b.ts", "export interface T {}"],
      ["pkg/ambiguous.ts", 'export * from "./a.js"; export * from "./b.js";'],
    ])),
    /ambiguous TypeScript type star re-export 'pkg\/ambiguous.ts::T'/,
  );
});

test("export-star excludes default while explicit exports shadow stars", async (t) => {
  const counted = await parserWithCount(t);
  if (!counted) return;
  const index = indexTypeScriptModuleSources(counted.api, new Map([
    ["pkg/a.ts", "export interface T {} export const V: number = 1; export default class D {}"],
    ["pkg/b.ts", "export interface T {} export const V: number = 2;"],
    ["pkg/star.ts", 'export * from "./a.js";'],
    ["pkg/shadow.ts", 'export * from "./a.js"; export * from "./b.js"; export { T, V } from "./a.js";'],
    ["pkg/use-shadow.ts", 'import { V } from "./shadow.js"; export const result: number = V;'],
  ]));
  const canonicalize = createCanonicalTypeResolver({
    namedReexport: index.namedReexport,
    starReexport: index.starReexport,
    definedTypes: index.definedTypes,
    exportedTypes: index.exportedTypes,
    knownModules: new Set(index.modules.keys()),
    externalModules: index.externalModules,
    typeNamespaceReexport: index.typeNamespaceReexport,
  });
  assert.equal(canonicalize("pkg/shadow.ts::T"), "pkg/a.ts::T");
  assert.throws(() => canonicalize("pkg/star.ts::default"), /does not resolve/);
  const environments = buildIndexedModuleValueEnvironments(counted.api, index);
  assert.deepEqual(environments.get("pkg/use-shadow.ts").get("V"), { status: "known", value: { kind: "number", value: 1 } });
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([
      ["pkg/default-source.ts", "export default class D {}"],
      ["pkg/default-star.ts", 'export * from "./default-source.js";'],
      ["pkg/default-use.ts", 'import missingDefault from "./default-star.js"; export const result = missingDefault;'],
    ])),
    /references missing export 'pkg\/default-star.ts::default'/,
  );
});

test("star cycles allow exact exits, deduplicate one origin, and reject true ambiguity", async (t) => {
  const counted = await parserWithCount(t);
  if (!counted) return;
  const index = indexTypeScriptModuleSources(counted.api, new Map([
    ["cycle/a.ts", 'export * from "./b.js";'],
    ["cycle/b.ts", 'export * from "./a.js"; export * from "./origin.js";'],
    ["cycle/origin.ts", "export interface Exit {} export const V: number = 7;"],
    ["cycle/same.ts", 'export * from "./a.js"; export * from "./origin.js";'],
    ["cycle/use-a.ts", 'import { V } from "./a.js"; export const result: number = V;'],
    ["cycle/use-same.ts", 'import { V } from "./same.js"; export const result: number = V;'],
  ]));
  const canonicalize = createCanonicalTypeResolver({
    namedReexport: index.namedReexport,
    starReexport: index.starReexport,
    definedTypes: index.definedTypes,
    exportedTypes: index.exportedTypes,
    knownModules: new Set(index.modules.keys()),
    externalModules: index.externalModules,
    typeNamespaceReexport: index.typeNamespaceReexport,
  });
  assert.equal(canonicalize("cycle/a.ts::Exit"), "cycle/origin.ts::Exit");
  assert.equal(canonicalize("cycle/same.ts::Exit"), "cycle/origin.ts::Exit");
  const environments = buildIndexedModuleValueEnvironments(counted.api, index);
  assert.deepEqual(environments.get("cycle/use-a.ts").get("V"), { status: "known", value: { kind: "number", value: 7 } });
  assert.deepEqual(environments.get("cycle/use-same.ts").get("V"), { status: "known", value: { kind: "number", value: 7 } });
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([
      ["cycle/origin.ts", "export interface Exit {} export const V: number = 7;"],
      ["cycle/other.ts", "export interface Exit {} export const V: number = 8;"],
      ["cycle/ambiguous.ts", 'export * from "./origin.js"; export * from "./other.js";'],
    ])),
    /ambiguous TypeScript type star re-export/,
  );
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([
      ["cycle/named-a.ts", 'export { Named } from "./named-b.js";'],
      ["cycle/named-b.ts", 'export { Named } from "./named-a.js";'],
    ])),
    /cyclic TypeScript named export/,
  );
});

test("constant resolution is immutable-only and demand-driven", async (t) => {
  const counted = await parserWithCount(t);
  if (!counted) return;
  const index = indexTypeScriptModuleSources(counted.api, new Map([
    ["constants/source.ts", `
export let mutable: number = 1;
const cycleA: number = cycleB;
const cycleB: number = cycleA;
export const good: number = 4;
export const invalid: number = 1 % 0;
export interface PublicType {}
`],
    ["constants/type-only.ts", 'import type { PublicType } from "./source.js"; export type Alias = PublicType;'],
    ["constants/use.ts", 'import { good, mutable } from "./source.js"; export const result: number = good;'],
  ]));
  const environments = buildIndexedModuleValueEnvironments(counted.api, index);
  assert.deepEqual(environments.get("constants/use.ts").get("good"), { status: "known", value: { kind: "number", value: 4 } });
  assert.equal(environments.get("constants/use.ts").get("mutable"), undefined);
  assert.equal(environments.get("constants/type-only.ts").get("PublicType"), undefined);
  assert.deepEqual(environments.get("constants/source.ts").get("invalid"), { status: "known", value: { kind: "number", value: NaN } });
  assert.doesNotThrow(() => environments.get("constants/use.ts").get("good"));
});
