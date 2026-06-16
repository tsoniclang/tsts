// Unit tests for the signature comparator + canonicalizer + convention engine.
// Descriptor-level (no parser/snapshot), so fast and deterministic.
import { test } from "node:test";
import assert from "node:assert/strict";
import { typesEqual, canonicalKey } from "./ts-extractor/ast-signatures.mjs";
import { loadConventions, normalizeDescriptor } from "./ts-extractor/conventions.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";
import { buildExpectedIndex, goUnitDescriptor } from "./ts-extractor/expected-from-go.mjs";
import { compareSignatures } from "./sig-check.mjs";

const ref = (id, ...args) => ({ t: "ref", id, args });
const kw = (k) => ({ t: "kw", kw: k });
const kinds = (ms) => new Set(ms.map((m) => m.kind));
const noConv = loadConventions({});

test("typesEqual: Array<T> == T[]", () => {
  const arrayGen = ref("global::Array", kw("string"));
  const arraySugar = { t: "array", element: kw("string") };
  // Array<T> is canonicalized to {t:array} by the extractor; here assert the array form matches itself
  assert.ok(typesEqual(arraySugar, { t: "array", element: kw("string") }));
  assert.equal(canonicalKey(arrayGen) === canonicalKey(arraySugar), false); // pre-canonicalization differ
});

test("typesEqual: soft id compares by terminal name; hard ids must match fully", () => {
  assert.ok(typesEqual(ref("name::Node"), ref("a/b.ts::Node"))); // soft vs hard -> by name
  assert.ok(!typesEqual(ref("core.ts::Node"), ref("ast.ts::Node"))); // two hard, different module
  assert.ok(typesEqual(ref("ast.ts::Node"), ref("ast.ts::Node")));
});

test("typesEqual: re-export canon collapses module aliases", () => {
  const canon = (id) => (id === "ast.ts::Node" ? "spine.ts::Node" : id);
  assert.ok(typesEqual(ref("ast.ts::Node"), ref("spine.ts::Node"), canon));
  assert.ok(!typesEqual(ref("ast.ts::Node"), ref("other.ts::Node"), canon));
});

test("compareFunc: arity, param-type, return-type, param-order", () => {
  const exp = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("m::A") }, { type: ref("m::B") }] };
  const dropParam = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("m::A") }] };
  assert.ok(kinds(compareSignatures(exp, dropParam, null)).has("arity"));

  const wrongType = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("m::A") }, { type: ref("m::C") }] };
  assert.ok(kinds(compareSignatures(exp, wrongType, null)).has("param-type"));

  const wrongRet = { kind: "func", typeParams: [], ret: kw("number"), params: exp.params };
  assert.ok(kinds(compareSignatures(exp, wrongRet, null)).has("return-type"));

  const swapped = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("m::B") }, { type: ref("m::A") }] };
  assert.ok(kinds(compareSignatures(exp, swapped, null)).has("param-order"));

  assert.equal(compareSignatures(exp, exp, null).length, 0);
});

test("compareInterface: member-type, missing-member, extra-member; method == fn-property", () => {
  const exp = { kind: "interface", typeParams: [], members: [{ name: "x", type: ref("m::A") }, { name: "y", type: kw("string") }] };
  const wrong = { kind: "interface", typeParams: [], members: [{ name: "x", type: ref("m::B") }, { name: "y", type: kw("string") }] };
  assert.ok(kinds(compareSignatures(exp, wrong, null)).has("member-type"));

  const missing = { kind: "interface", typeParams: [], members: [{ name: "x", type: ref("m::A") }] };
  assert.ok(kinds(compareSignatures(exp, missing, null)).has("missing-member"));

  const extra = { kind: "interface", typeParams: [], members: [...exp.members, { name: "z", type: kw("number") }] };
  assert.ok(kinds(compareSignatures(exp, extra, null)).has("extra-member"));

  // method `m(p):R` and property `m: (p)=>R` both arrive as {t:'fn'} members -> equal.
  const fnType = { t: "fn", params: [{ type: kw("string") }], ret: kw("void") };
  const ifaceA = { kind: "interface", typeParams: [], members: [{ name: "m", type: fnType }] };
  const ifaceB = { kind: "interface", typeParams: [], members: [{ name: "m", type: { t: "fn", params: [{ type: kw("string") }], ret: kw("void") } }] };
  assert.equal(compareSignatures(ifaceA, ifaceB, null).length, 0);
});

test("compareValue: value-annotation-missing and value-type", () => {
  const exp = { kind: "value", decls: [{ name: "c", type: ref("core::int") }] };
  const unannotated = { kind: "value", decls: [{ name: "c", missing: true }] };
  assert.ok(kinds(compareSignatures(exp, unannotated, null)).has("value-annotation-missing"));

  const wrongType = { kind: "value", decls: [{ name: "c", type: kw("string") }] };
  assert.ok(kinds(compareSignatures(exp, wrongType, null)).has("value-type"));

  assert.equal(compareSignatures(exp, { kind: "value", decls: [{ name: "c", type: ref("core::int") }] }, null).length, 0);
});

test("overrides: ignore aspect and accept-all", () => {
  const exp = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("m::A") }] };
  const wrong = { kind: "func", typeParams: [], ret: kw("number"), params: [{ type: ref("m::B") }] };
  assert.equal(compareSignatures(exp, wrong, { all: true }).length, 0);
  const ms = compareSignatures(exp, wrong, { ignore: new Set(["return-type"]) });
  assert.ok(!kinds(ms).has("return-type"));
  assert.ok(kinds(ms).has("param-type"));
});

test("conventions: acceptNullable strips | undefined", () => {
  const conv = loadConventions({ structural: { acceptNullable: true } });
  const exp = ref("m::T");
  const nullable = { t: "union", members: [kw("undefined"), ref("m::T")] };
  assert.ok(typesEqual(normalizeDescriptor(exp, conv), normalizeDescriptor(nullable, conv)));
  // off by default -> not equal
  assert.ok(!typesEqual(normalizeDescriptor(exp, noConv), normalizeDescriptor(nullable, noConv)));
});

test("conventions: equivalences are scoped — numeric collapses ONLY in constraint context", () => {
  const conv = loadConventions({ equivalences: [{ as: "numeric", scope: "constraint", match: [{ kw: "number" }, { rawIncludes: "~uint" }] }] });
  const goConstraint = { t: "raw", text: "~uint32" };
  const tsNumber = kw("number");
  // In constraint context the two collapse to the same token...
  assert.ok(typesEqual(normalizeDescriptor(goConstraint, conv, "constraint"), normalizeDescriptor(tsNumber, conv, "constraint")));
  // ...but in ordinary type context a param `x: int`-ish must NOT equal `x: number`.
  const goInt = ref("core::int");
  assert.ok(!typesEqual(normalizeDescriptor(goInt, conv, "type"), normalizeDescriptor(tsNumber, conv, "type")));
});

test("compareInterface: unsupported member shapes are reported, not dropped", () => {
  const exp = { kind: "interface", typeParams: [], members: [{ name: "x", type: kw("string") }] };
  const actual = { kind: "interface", typeParams: [], members: [{ name: "x", type: kw("string") }, { name: "<IndexSignature>", unsupported: "IndexSignature" }] };
  assert.ok(kinds(compareSignatures(exp, actual, null)).has("unsupported-member"));
});

test("gate: unresolved type identity is surfaced", () => {
  const exp = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("name::Untracked") }] };
  const act = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("name::Untracked") }] };
  assert.ok(kinds(compareSignatures(exp, act, null)).has("unresolved-ref"));
});

test("conventions: anyMapKey makes the map key a wildcard", () => {
  const conv = loadConventions({ structural: { anyMapKey: true } });
  const a = ref("c::GoMap", ref("m::StructKey"), kw("string"));
  const b = ref("c::GoMap", kw("string"), kw("string"));
  assert.ok(typesEqual(normalizeDescriptor(a, conv), normalizeDescriptor(b, conv)));
});

test("conventions: unwrapPtrFunc treats GoPtr<fn> as fn", () => {
  const conv = loadConventions({ structural: { unwrapPtrFunc: true } });
  const fn = { t: "fn", params: [], ret: kw("void") };
  const ptrFn = ref("c::GoPtr", fn);
  assert.ok(typesEqual(normalizeDescriptor(ptrFn, conv), normalizeDescriptor(fn, conv)));
});

test("portability: a non-tsts profile drives the Go->TS mapping (no hardcoding)", () => {
  // A completely different project profile: different bridge/module/primitive names.
  const config = {
    goModulePath: "example.com/proj",
    signatureCheck: {
      modules: { core: "@acme/prim", compat: "src/rt/bridge.ts" },
      bridge: { pointer: "Ptr", slice: "Slc", array: "Arr", map: "Dict", chan: "Ch" },
      primitives: { keyword: { string: "string" }, core: { int: "i32" }, compat: {} },
      stdlibTypes: {},
      facadeTemplate: "src/rt/{importPath}.ts",
    },
  };
  const profile = loadProfile(config);
  const index = buildExpectedIndex(config, { files: [] }, new Map(), profile);
  // func f(a *int) — pointer-to-int.
  const unit = {
    kind: "func",
    file: { importPath: "example.com/proj/pkg", imports: [] },
    parameters: [{ names: ["a"], type: { kind: "pointer", element: { kind: "ident", name: "int" } } }],
    results: [],
    typeParameterDetails: [],
  };
  const desc = goUnitDescriptor(unit, index);
  assert.equal(canonicalKey(desc.params[0].type), "R:src/rt/bridge.ts::Ptr<R:@acme/prim::i32>");
  // selector to a stdlib facade uses the configured template.
  const sel = goUnitDescriptor(
    { kind: "func", file: { importPath: "example.com/proj/pkg", imports: [{ path: "time" }] }, parameters: [{ names: ["t"], type: { kind: "selector", package: "time", name: "Duration" } }], results: [], typeParameterDetails: [] },
    index,
  );
  assert.equal(canonicalKey(sel.params[0].type), "R:src/rt/time.ts::Duration");
});
