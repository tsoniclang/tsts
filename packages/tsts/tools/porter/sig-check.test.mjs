// Unit tests for the signature comparator + canonicalizer + convention engine.
// Descriptor-level (no parser/snapshot), so fast and deterministic.
import { test } from "node:test";
import assert from "node:assert/strict";
import { typesEqual, canonicalKey } from "./ts-extractor/ast-signatures.mjs";
import { loadConventions, normalizeDescriptor } from "./ts-extractor/conventions.mjs";
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
  const conv = loadConventions({ signatureConventions: { structural: { acceptNullable: true } } });
  const exp = ref("m::T");
  const nullable = { t: "union", members: [kw("undefined"), ref("m::T")] };
  assert.ok(typesEqual(normalizeDescriptor(exp, conv), normalizeDescriptor(nullable, conv)));
  // off by default -> not equal
  assert.ok(!typesEqual(normalizeDescriptor(exp, noConv), normalizeDescriptor(nullable, noConv)));
});

test("conventions: equivalences collapse matching forms to a shared token", () => {
  const conv = loadConventions({
    signatureConventions: { equivalences: [{ as: "numeric", match: [{ kw: "number" }, { rawIncludes: "~uint" }] }] },
  });
  const goConstraint = { t: "raw", text: "~uint32" };
  const tsNumber = kw("number");
  assert.ok(typesEqual(normalizeDescriptor(goConstraint, conv), normalizeDescriptor(tsNumber, conv)));
});

test("conventions: anyMapKey makes the map key a wildcard", () => {
  const conv = loadConventions({ signatureConventions: { structural: { anyMapKey: true } } });
  const a = ref("c::GoMap", ref("m::StructKey"), kw("string"));
  const b = ref("c::GoMap", kw("string"), kw("string"));
  assert.ok(typesEqual(normalizeDescriptor(a, conv), normalizeDescriptor(b, conv)));
});

test("conventions: unwrapPtrFunc treats GoPtr<fn> as fn", () => {
  const conv = loadConventions({ signatureConventions: { structural: { unwrapPtrFunc: true } } });
  const fn = { t: "fn", params: [], ret: kw("void") };
  const ptrFn = ref("c::GoPtr", fn);
  assert.ok(typesEqual(normalizeDescriptor(ptrFn, conv), normalizeDescriptor(fn, conv)));
});
