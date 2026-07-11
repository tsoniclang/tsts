// Integration tests: parse real TS fixtures with TSTS's own parser and exercise
// the actual-side extractor + Go-model expected + comparator end to end. Skips
// gracefully if dist isn't built/fresh (descriptor-level tests in sig-check.test.mjs
// cover the comparator without a parser).
import { test } from "node:test";
import assert from "node:assert/strict";
import { loadParser } from "./ts-extractor/ast-signatures.mjs";
import { buildModuleValueEnvironments, extractFileDescriptors } from "./ts-extractor/extract-signatures.mjs";
import { buildExpectedIndex, goUnitDescriptor } from "./ts-extractor/expected-from-go.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";
import { compareSignatures } from "./sig-check.mjs";
import "./ts-extractor/declaration-metadata.test.mjs";
import "./ts-extractor/module-index.test.mjs";

async function tryLoad() {
  try { return await loadParser(); } catch { return undefined; }
}

const ANNO = { tag: "@tsgo-unit", idSeparator: "::", methodNameJoin: "_" };

test("integration: extract a function signature (rest + generics + import-resolved types)", async (t) => {
  const api = await tryLoad();
  if (!api) return t.skip("TSTS dist not built/fresh");
  const src = `import { GoPtr } from "./compat.js";
import { Node } from "./node.js";
/** @tsgo-unit {"id":"m::f.go::func::f","kind":"func"} */
export function f<T extends Node>(a: string, ...rest: number[]): GoPtr<Node> { throw 0; }
`;
  const units = extractFileDescriptors(api, "pkg/f.ts", src, ANNO);
  assert.equal(units.length, 1);
  const d = units[0].descriptor;
  assert.equal(d.kind, "func");
  assert.equal(d.signatures.length, 1);
  assert.equal(d.signatures[0].params.length, 2);
  assert.deepEqual(d.signatures[0].params[0].type, { t: "kw", kw: "string" });
  assert.ok(d.signatures[0].params[1].rest);
  assert.deepEqual(d.signatures[0].params[1].type, { t: "array", element: { t: "kw", kw: "number" } });
  assert.equal(d.signatures[0].typeParams.length, 1);
  // GoPtr resolves to its import, Node to ./node.js — both imported.
  assert.deepEqual(d.signatures[0].ret, {
    t: "ref",
    id: "pkg/compat.ts::GoPtr",
    args: [{ t: "ref", id: "pkg/node.ts::Node", args: [] }],
  });
});

test("integration: top-level overloads are one exact ordered signature set", async (t) => {
  const api = await tryLoad();
  if (!api) return t.skip("TSTS dist not built/fresh");
  const source = `/** @tsgo-unit {"id":"m::f.go::func::read","kind":"func"} */
export function read(value: string): string;
export function read(value: number): number;
export function read(value: string | number): string | number { implementationBodyMustStayOpaque(); return value; }
`;
  const descriptor = extractFileDescriptors(api, "pkg/overloads.ts", source, ANNO)[0].descriptor;
  assert.equal(descriptor.kind, "func");
  assert.deepEqual(descriptor.signatures.map((signature) => signature.role), ["overload", "overload", "implementation"]);
  assert.deepEqual(descriptor.signatures.map((signature) => signature.params[0].type), [
    { t: "kw", kw: "string" },
    { t: "kw", kw: "number" },
    { t: "union", members: [{ t: "kw", kw: "string" }, { t: "kw", kw: "number" }] },
  ]);
  assert.equal(JSON.stringify(descriptor).includes("implementationBodyMustStayOpaque"), false);
});

test("integration: interface fragments merge without hiding any declaration", async (t) => {
  const api = await tryLoad();
  if (!api) return t.skip("TSTS dist not built/fresh");
  const source = `/** @tsgo-unit {"id":"m::i.go::type::Merged","kind":"type"} */
export interface Merged { first: string; }
export interface Merged { second(value: number): boolean; }
`;
  const descriptor = extractFileDescriptors(api, "pkg/merged.ts", source, ANNO)[0].descriptor;
  assert.equal(descriptor.kind, "interface");
  assert.equal(descriptor.fragments.length, 2);
  assert.deepEqual(descriptor.members.map((member) => member.name), ["first", "second"]);
});

test("integration: one declaration symbol cannot be owned by multiple units", async (t) => {
  const api = await tryLoad();
  if (!api) return t.skip("TSTS dist not built/fresh");
  const source = `/** @tsgo-unit {"id":"m::a.go::func::read","kind":"func"} */
export function read(value: string): string;
/** @tsgo-unit {"id":"m::b.go::func::read","kind":"func"} */
export function read(value: number): number;
export function read(value: string | number): string | number { return value; }
`;
  assert.throws(() => extractFileDescriptors(api, "pkg/duplicate-owner.ts", source, ANNO), /owned by more than one @tsgo-unit/);
});

test("integration: metadata mismatch is retained as an unwaivable descriptor issue", async (t) => {
  const api = await tryLoad();
  if (!api) return t.skip("TSTS dist not built/fresh");
  // JSDoc for `target`, then a helper with no annotation, then `target` itself.
  const src = `/** @tsgo-unit {"id":"m::f.go::func::target","kind":"func"} */
function helperNotTracked(): number { return 0; }
export function target(a: string): void {}
`;
  const descriptor = extractFileDescriptors(api, "pkg/f.ts", src, ANNO)[0].descriptor;
  assert.equal(descriptor.name, "helperNotTracked");
  assert.deepEqual(descriptor.metadataIssues, ["metadata names 'target', but declaration name is 'helperNotTracked'"]);
  const mismatches = compareSignatures({ kind: "func", signatures: [{ typeParams: [], params: [], ret: { t: "kw", kw: "number" } }] }, descriptor, null);
  assert.ok(mismatches.some((mismatch) => mismatch.kind === "metadata-declaration"));
});

test("integration: unannotated value declaration is detected as missing", async (t) => {
  const api = await tryLoad();
  if (!api) return t.skip("TSTS dist not built/fresh");
  const src = `/** @tsgo-unit {"id":"m::v.go::varGroup::_","kind":"varGroup"} */
export const maxLevel = 2;
`;
  const units = extractFileDescriptors(api, "pkg/v.ts", src, ANNO);
  const d = units[0].descriptor;
  assert.equal(d.kind, "value");
  assert.ok(d.decls[0].missing);
});

test("integration: value groups collect every declaration before the next unit", async (t) => {
  const api = await tryLoad();
  if (!api) return t.skip("TSTS dist not built/fresh");
  const src = `/** @tsgo-unit {"id":"m::v.go::constGroup::first+second","kind":"constGroup"} */
export const first: number = 1;
export const second: number = 2;
/** @tsgo-unit {"id":"m::f.go::func::done","kind":"func"} */
export function done(): void {}
`;
  const units = extractFileDescriptors(api, "pkg/v.ts", src, ANNO);
  assert.deepEqual(units[0].descriptor.decls.map((declaration) => declaration.name), ["first", "second"]);
  assert.equal(units[1].descriptor.kind, "func");
});

test("integration: bigint literals retain their exact uint64 initializer", async (t) => {
  const api = await tryLoad();
  if (!api) return t.skip("TSTS dist not built/fresh");
  const src = `/** @tsgo-unit {"id":"m::v.go::constGroup::mask","kind":"constGroup"} */
export const mask: bigint = 0x8000000000000000n;
`;
  const units = extractFileDescriptors(api, "pkg/v.ts", src, ANNO);
  assert.deepEqual(units[0].descriptor.decls[0].value, {
    kind: "bigint",
    value: "9223372036854775808",
  });
  const profile = loadProfile({});
  const index = buildExpectedIndex({ goModulePath: "m", tsRoot: "pkg" }, { files: [] }, new Map(), profile, new Map());
  const expected = goUnitDescriptor({
    id: "m::v.go::constGroup::mask",
    kind: "constGroup",
    semantic: [{
      kind: "constGroup",
      packagePath: "m",
      profiles: [0],
      valueSpecs: [{
        specIndex: 0,
        names: [{
          name: "mask",
          nameIndex: 0,
          blank: false,
          type: { kind: "basic", basic: { name: "uint64", untyped: false } },
          constant: { kind: "Int", exact: "9223372036854775808" },
        }],
      }],
    }],
  }, index);
  assert.deepEqual(expected.decls[0].value, units[0].descriptor.decls[0].value);
});

test("integration: number constants use IEEE-754 semantics", async (t) => {
  const api = await tryLoad();
  if (!api) return t.skip("TSTS dist not built/fresh");
  const src = `/** @tsgo-unit {"id":"m::v.go::constGroup::unsafe+sum+mixed","kind":"constGroup"} */
export const unsafe: number = 9007199254740993;
export const sum: number = 0.1 + 0.2;
export const mixed: bigint = 1n + 1;
`;
  const declarations = extractFileDescriptors(api, "pkg/v.ts", src, ANNO)[0].descriptor.decls;
  assert.deepEqual(declarations.map((declaration) => declaration.value), [
    { kind: "number", value: "9007199254740992" },
    { kind: "number", value: "0.30000000000000004" },
    undefined,
  ]);
});

test("integration: imported constant expressions resolve mechanically", async (t) => {
  const api = await tryLoad();
  if (!api) return t.skip("TSTS dist not built/fresh");
  const sources = new Map([
    ["pkg/flags.ts", "export const A: number = 1;\nexport const B: number = 4;\n"],
    ["pkg/value.ts", `import { A, B as LocalB } from "./flags.js";
/** @tsgo-unit {"id":"m::v.go::constGroup::value","kind":"constGroup"} */
export const value: number = A | LocalB;
`],
  ]);
  const environments = buildModuleValueEnvironments(api, sources);
  const units = extractFileDescriptors(api, "pkg/value.ts", sources.get("pkg/value.ts"), ANNO, environments.get("pkg/value.ts"));
  assert.deepEqual(units[0].descriptor.decls[0].value, { kind: "number", value: "5" });
});

test("integration: end-to-end expected(Go-model) vs actual — match and drift", async (t) => {
  const api = await tryLoad();
  if (!api) return t.skip("TSTS dist not built/fresh");
  // Self-consistent profile: GoPtr lives in the same module the fixture imports it from.
  const config = { goModulePath: "m", tsRoot: "pkg", signatureCheck: { modules: { core: "pkg/scalars.ts", compat: "pkg/compat.ts" } } };
  const profile = loadProfile(config);
  const index = buildExpectedIndex(config, { files: [] }, new Map(), profile, new Map());
  // Go: func f(a string, b *int) — expected [string, GoPtr<int>].
  const goUnit = {
    id: "m::pkg/f.go::func::f",
    kind: "func",
    semantic: [{
      kind: "func",
      profiles: ["linux/amd64:cgo=0:tags="],
      signature: {
        receiverTypeParameters: [],
        typeParameters: [],
        parameters: { variables: [
          { name: "a", type: { kind: "basic", basic: { name: "string", untyped: false } } },
          { name: "b", type: { kind: "pointer", element: { kind: "basic", basic: { name: "int", untyped: false } } } },
        ] },
        results: { variables: [] },
        variadic: false,
      },
    }],
  };
  const expected = goUnitDescriptor(goUnit, index);

  // Matching actual.
  const okSrc = `import { GoPtr } from "./compat.js";
import { int } from "./scalars.js";
/** @tsgo-unit {"id":"m::pkg/f.go::func::f","kind":"func"} */
export function f(a: string, b: GoPtr<int>): void {}
`;
  const okActual = extractFileDescriptors(api, "pkg/f.ts", okSrc, ANNO)[0].descriptor;
  assert.equal(compareSignatures(expected, okActual, null).length, 0);

  // Drifted actual: second param type wrong (int instead of GoPtr<int>).
  const badSrc = `import { int } from "./scalars.js";
/** @tsgo-unit {"id":"m::pkg/f.go::func::f","kind":"func"} */
export function f(a: string, b: int): void {}
`;
  const badActual = extractFileDescriptors(api, "pkg/f.ts", badSrc, ANNO)[0].descriptor;
  const kinds = new Set(compareSignatures(expected, badActual, null).map((m) => m.kind));
  assert.ok(kinds.has("param-type"));
});
