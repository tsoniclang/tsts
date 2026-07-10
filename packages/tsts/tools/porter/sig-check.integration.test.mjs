// Integration tests: parse real TS fixtures with TSTS's own parser and exercise
// the actual-side extractor + Go-model expected + comparator end to end. Skips
// gracefully if dist isn't built/fresh (descriptor-level tests in sig-check.test.mjs
// cover the comparator without a parser).
import { test } from "node:test";
import assert from "node:assert/strict";
import { loadParser, canonicalKey } from "./ts-extractor/ast-signatures.mjs";
import { buildModuleValueEnvironments, extractFileDescriptors } from "./ts-extractor/extract-signatures.mjs";
import { buildExpectedIndex, goUnitDescriptor } from "./ts-extractor/expected-from-go.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";
import { compareSignatures } from "./sig-check.mjs";

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
  assert.equal(d.params.length, 2);
  assert.equal(canonicalKey(d.params[0].type), "K:string");
  assert.ok(d.params[1].rest);
  assert.equal(canonicalKey(d.params[1].type), "A:[K:number]");
  assert.equal(d.typeParams.length, 1);
  // GoPtr resolves to its import, Node to ./node.js — both imported.
  assert.equal(canonicalKey(d.ret), "R:pkg/compat.ts::GoPtr<R:pkg/node.ts::Node>");
});

test("integration: association survives an interleaved non-tracked helper", async (t) => {
  const api = await tryLoad();
  if (!api) return t.skip("TSTS dist not built/fresh");
  // JSDoc for `target`, then a helper with no annotation, then `target` itself.
  const src = `/** @tsgo-unit {"id":"m::f.go::func::target","kind":"func"} */
function helperNotTracked(): number { return 0; }
export function target(a: string): void {}
`;
  const units = extractFileDescriptors(api, "pkg/f.ts", src, ANNO);
  const d = units.find((u) => u.id.endsWith("::target")).descriptor;
  assert.equal(d.kind, "func");
  assert.equal(d.params.length, 1); // target's sig, NOT helper's
  assert.equal(canonicalKey(d.params[0].type), "K:string");
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
    kind: "number",
    value: "9223372036854775808",
  });
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
    kind: "func",
    file: { importPath: "m/pkg", imports: [] },
    parameters: [
      { names: ["a"], type: { kind: "ident", name: "string" } },
      { names: ["b"], type: { kind: "pointer", element: { kind: "ident", name: "int" } } },
    ],
    results: [],
    typeParameterDetails: [],
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
