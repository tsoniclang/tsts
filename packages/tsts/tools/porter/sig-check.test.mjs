// Unit tests for the signature comparator + canonicalizer + convention engine.
// Descriptor-level (no parser/snapshot), so fast and deterministic.
import { test } from "node:test";
import assert from "node:assert/strict";
import { typesEqual, canonicalKey } from "./ts-extractor/ast-signatures.mjs";
import { loadConventions, normalizeDescriptor } from "./ts-extractor/conventions.mjs";
import { compareSignatures, descriptorInventoryMismatches, resolveOverride, unitSignatureSnapshot, validateOverrideUse, withSignatureOverrideSnapshots } from "./sig-check.mjs";

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

test("typesEqual: only compatible soft ids compare by terminal name", () => {
  assert.ok(typesEqual(ref("name::Node"), ref("global::Node")));
  assert.ok(!typesEqual(ref("global::Date"), ref("a/b.ts::Date")));
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

test("missing function annotations fail closed", () => {
  const expected = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: kw("number") }] };
  const actual = {
    kind: "func",
    typeParams: [],
    ret: kw("void"),
    missingReturnType: true,
    params: [{ type: kw("number"), missingType: true }],
  };
  const mismatches = kinds(compareSignatures(expected, actual, null));
  assert.ok(mismatches.has("param-annotation-missing"));
  assert.ok(mismatches.has("return-annotation-missing"));
});

test("declaration kind is compared before kind-specific descriptor dispatch", () => {
  const expected = { kind: "func", typeParams: [], ret: kw("void"), params: [] };
  for (const actual of [
    { kind: "interface", typeParams: [], members: [] },
    { kind: "alias", typeParams: [], type: kw("void") },
    { kind: "other", nodeKind: "ClassDeclaration" },
  ]) {
    assert.deepEqual(compareSignatures(expected, actual, null).map((mismatch) => mismatch.kind), ["declaration-kind"]);
  }
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

test("interface heritage and member modifiers compare exactly", () => {
  const member = { name: "value", type: kw("number") };
  const expected = { kind: "interface", typeParams: [], heritage: [], members: [member] };
  assert.equal(compareSignatures(expected, { ...expected, members: [{ ...member }] }, null).length, 0);
  const actual = { ...expected, heritage: ["extends Base"], members: [{ ...member, readonly: true, optional: true }] };
  const mismatches = kinds(compareSignatures(expected, actual, null));
  assert.ok(mismatches.has("interface-heritage"));
  assert.ok(mismatches.has("member-readonly"));
  assert.ok(mismatches.has("member-optionality"));

  const plain = { t: "fn", typeParams: [], params: [], ret: kw("void") };
  const generic = { t: "fn", typeParams: [{ constraint: null }], params: [], ret: kw("void") };
  assert.equal(typesEqual(plain, generic), false);
});

test("allowed globals cannot hide hard imported identity drift", () => {
  const expected = { kind: "func", typeParams: [], params: [{ type: ref("global::Date") }], ret: kw("void") };
  const actual = { kind: "func", typeParams: [], params: [{ type: ref("pkg/date.ts::Date") }], ret: kw("void") };
  assert.ok(kinds(compareSignatures(expected, actual, null, (id) => id, noConv, ["Date"])).has("param-type"));
});

test("compareValue: value-annotation-missing and value-type", () => {
  const exp = { kind: "value", decls: [{ name: "c", type: ref("core::int") }] };
  const unannotated = { kind: "value", decls: [{ name: "c", missing: true }] };
  assert.ok(kinds(compareSignatures(exp, unannotated, null)).has("value-annotation-missing"));

  const wrongType = { kind: "value", decls: [{ name: "c", type: kw("string") }] };
  assert.ok(kinds(compareSignatures(exp, wrongType, null)).has("value-type"));

  assert.equal(compareSignatures(exp, { kind: "value", decls: [{ name: "c", type: ref("core::int") }] }, null).length, 0);
  assert.deepEqual(
    compareSignatures(
      { kind: "value", decls: [{ name: "version", type: kw("string"), value: { kind: "string", value: "7.1.0-dev" } }] },
      { kind: "value", decls: [{ name: "version", type: kw("string"), value: { kind: "string", value: "7.0.0-dev" } }] },
      null,
    ).map((mismatch) => mismatch.kind),
    ["value-initializer"],
  );

  const complete = { kind: "value", decls: [{ name: "a", type: kw("number") }, { name: "b", type: kw("string") }] };
  assert.deepEqual(
    compareSignatures(complete, { kind: "value", decls: [{ name: "a", type: kw("number") }] }, null).map((mismatch) => mismatch.kind),
    ["missing-value"],
  );
  assert.deepEqual(
    compareSignatures(complete, { kind: "value", decls: [...complete.decls, { name: "c", type: kw("boolean") }] }, null).map((mismatch) => mismatch.kind),
    ["extra-value"],
  );
  assert.ok(kinds(compareSignatures(complete, { kind: "value", decls: [...complete.decls].reverse() }, null)).has("value-order"));
});

test("overrides: ignore aspect only", () => {
  const exp = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("m::A") }] };
  const wrong = { kind: "func", typeParams: [], ret: kw("number"), params: [{ type: ref("m::B") }] };
  const ms = compareSignatures(exp, wrong, { ignore: new Set(["return-type"]) });
  assert.ok(!kinds(ms).has("return-type"));
  assert.ok(kinds(ms).has("param-type"));
});

test("descriptor inventory rejects duplicate and unexpected extracted declarations", () => {
  const mismatches = descriptorInventoryMismatches(new Set(["expected"]), new Map([
    ["expected", [{ file: "a.ts" }, { file: "b.ts" }]],
    ["unexpected", [{ file: "c.ts" }]],
  ]));
  assert.deepEqual(mismatches.map((entry) => entry.kind), ["descriptor-duplicate", "descriptor-unexpected"]);
  assert.ok(kinds(compareSignatures({ kind: "func", typeParams: [], ret: kw("void"), params: [] }, undefined, null)).has("actual-missing"));
});

test("local signature override captures go and ts snapshots", () => {
  const exp = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("m::A") }] };
  const actual = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("m::B") }] };
  const issues = [];
  const override = resolveOverride(
    {
      category: "runtime-performance",
      allow: ["signature"],
      reason: "Target-native carrier.",
      goSignature: unitSignatureSnapshot(exp),
      tsSignature: unitSignatureSnapshot(actual),
    },
    "id",
    exp,
    actual,
    (x) => x,
    issues,
  );
  assert.equal(issues.length, 0);
  assert.equal(compareSignatures(exp, actual, override).length, 0);

  const staleIssues = [];
  const stale = resolveOverride(
    {
      category: "runtime-performance",
      allow: ["signature"],
      reason: "Target-native carrier.",
      goSignature: "stale",
      tsSignature: unitSignatureSnapshot(actual),
    },
    "id",
    exp,
    actual,
    (x) => x,
    staleIssues,
  );
  assert.equal(stale.ignore.size, 0);
  assert.equal(staleIssues.length, 1);
});

test("signature mismatches carry exact local-override snapshots", () => {
  const expected = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("m::A") }] };
  const actual = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("m::B") }] };
  const [mismatch] = withSignatureOverrideSnapshots(compareSignatures(expected, actual, null), expected, actual);

  assert.equal(mismatch.goSignature, "func(m::A)=>void");
  assert.equal(mismatch.tsSignature, "func(m::B)=>void");
});

test("signature override cannot waive initializer or value-order drift", () => {
  const expected = {
    kind: "value",
    decls: [
      { name: "first", type: kw("number"), value: { kind: "number", value: "1" } },
      { name: "second", type: kw("number"), value: { kind: "number", value: "2" } },
    ],
  };
  const actual = {
    kind: "value",
    decls: [
      { name: "second", type: kw("number"), value: { kind: "number", value: "3" } },
      { name: "first", type: kw("number"), value: { kind: "number", value: "1" } },
    ],
  };
  const issues = [];
  const override = resolveOverride({
    category: "runtime-representation",
    allow: ["signature"],
    reason: "The declaration uses an explicitly reviewed target representation.",
    goSignature: unitSignatureSnapshot(expected),
    tsSignature: unitSignatureSnapshot(actual),
  }, "id", expected, actual, (value) => value, issues);
  assert.deepEqual(issues, []);
  const mismatchKinds = kinds(compareSignatures(expected, actual, override));
  assert.ok(mismatchKinds.has("value-order"));
  assert.ok(mismatchKinds.has("value-initializer"));
});

test("unused exact override allowances are rejected", () => {
  const issues = [];
  validateOverrideUse({ allow: ["signature", "initializer", "value-order", "body"] }, [], "id", issues);
  assert.deepEqual(issues.map((entry) => entry.reason.split(" ")[1]), ["'signature'", "'initializer'", "'value-order'"]);
});

test("local initializer override ignores only exact snapshotted initializer drift", () => {
  const expected = { kind: "value", decls: [{ name: "limit", type: kw("number"), value: { kind: "number", value: "10" } }] };
  const actual = { kind: "value", decls: [{ name: "limit", type: kw("number"), value: { kind: "number", value: "12" } }] };
  const issues = [];
  const override = resolveOverride({
    category: "runtime-representation",
    allow: ["initializer"],
    reason: "Host limit is intentionally different.",
    goInitializer: 'limit={"kind":"number","value":"10"}',
    tsInitializer: 'limit={"kind":"number","value":"12"}',
  }, "id", expected, actual, (value) => value, issues);
  assert.deepEqual(issues, []);
  assert.equal(compareSignatures(expected, actual, override).length, 0);

  const staleIssues = [];
  const stale = resolveOverride({
    category: "runtime-representation",
    allow: ["initializer"],
    reason: "Host limit is intentionally different.",
    goInitializer: "stale",
    tsInitializer: 'limit={"kind":"number","value":"12"}',
  }, "id", expected, actual, (value) => value, staleIssues);
  assert.equal(stale.ignore.size, 0);
  assert.equal(staleIssues.length, 1);
});

test("local value-order override ignores only exact snapshotted order drift", () => {
  const expected = { kind: "value", decls: [{ name: "first", type: kw("number") }, { name: "second", type: kw("number") }] };
  const actual = { kind: "value", decls: [{ name: "second", type: kw("number") }, { name: "first", type: kw("number") }] };
  const issues = [];
  const override = resolveOverride({
    category: "runtime-representation",
    allow: ["value-order"],
    reason: "JavaScript const initialization must place dependencies before consumers.",
    goValueOrder: "first,second",
    tsValueOrder: "second,first",
  }, "id", expected, actual, (value) => value, issues);
  assert.deepEqual(issues, []);
  assert.equal(compareSignatures(expected, actual, override).length, 0);

  const staleIssues = [];
  const stale = resolveOverride({
    category: "runtime-representation",
    allow: ["value-order"],
    reason: "JavaScript const initialization must place dependencies before consumers.",
    goValueOrder: "stale",
    tsValueOrder: "second,first",
  }, "id", expected, actual, (value) => value, staleIssues);
  assert.equal(stale.ignore.size, 0);
  assert.equal(staleIssues.length, 1);
});

test("conventions: global structural waivers are forbidden", () => {
  for (const structural of [
    { acceptNullable: true },
    { anyMapKey: true },
    { unwrapPtrFunc: true },
    { acceptNilableGoTypes: true },
    { facadeGenericRefs: ["go/sync.ts::Pool"] },
  ]) {
    assert.throws(() => loadConventions({ structural }), /structural is forbidden/);
  }
});

test("conventions: equivalences are scoped to constraint context", () => {
  const conv = loadConventions({ equivalences: [{ as: "comparable", scope: "constraint", match: [{ name: "comparable" }, { refName: "GoComparable" }] }] });
  const goComparable = ref("name::comparable");
  const tsComparable = ref("packages/tsts/src/go/compat.ts::GoComparable");
  assert.ok(typesEqual(normalizeDescriptor(goComparable, conv, "constraint"), normalizeDescriptor(tsComparable, conv, "constraint")));
  assert.ok(!typesEqual(normalizeDescriptor(goComparable, conv, "type"), normalizeDescriptor(tsComparable, conv, "type")));
});

test("compareTypeParams: non-trivial constraints cannot be erased", () => {
  const exp = { kind: "func", typeParams: [{ constraint: ref("name::comparable") }], ret: kw("void"), params: [] };
  const actual = { kind: "func", typeParams: [{ constraint: null }], ret: kw("void"), params: [] };
  assert.ok(kinds(compareSignatures(exp, actual, null, (x) => x, noConv)).has("type-param-constraint"));
});

test("compareTypeParams: exact GoConstraint marker preserves raw tilde constraints and audits runtime carriers", () => {
  const conv = loadConventions({});
  const exp = { kind: "func", typeParams: [{ constraint: { t: "raw", text: "~int32 | ~uint32" } }], ret: kw("void"), params: [] };
  const markerOnly = {
    kind: "func",
    typeParams: [{ constraint: ref("packages/tsts/src/go/compat.ts::GoConstraint", { t: "lit", text: JSON.stringify("~int32 | ~uint32") }) }],
    ret: kw("void"),
    params: [],
  };
  const markerWithCarrier = {
    kind: "func",
    typeParams: [{
      constraint: {
        t: "intersect",
        members: [
          ref("packages/tsts/src/go/compat.ts::GoConstraint", { t: "lit", text: JSON.stringify("~int32 | ~uint32") }),
          kw("number"),
        ],
      },
    }],
    ret: kw("void"),
    params: [],
  };
  assert.equal(compareSignatures(exp, markerOnly, null, (x) => x, conv).length, 0);
  assert.ok(kinds(compareSignatures(exp, markerWithCarrier, null, (x) => x, conv)).has("type-param-constraint"));
});

test("compareInterface: unsupported member shapes are reported, not dropped", () => {
  const exp = { kind: "interface", typeParams: [], members: [{ name: "x", type: kw("string") }] };
  const actual = { kind: "interface", typeParams: [], members: [{ name: "x", type: kw("string") }, { name: "<IndexSignature>", unsupported: "IndexSignature" }] };
  assert.ok(kinds(compareSignatures(exp, actual, null)).has("unsupported-member"));
});

test("compareInterface: duplicate members cannot collapse through the comparison map", () => {
  const expected = { kind: "interface", typeParams: [], members: [{ name: "value", type: kw("string") }] };
  const actual = { kind: "interface", typeParams: [], members: [{ name: "value", type: kw("string") }, { name: "value", type: kw("string") }] };
  assert.ok(kinds(compareSignatures(expected, actual, null)).has("duplicate-member"));
});

test("gate: unresolved type identity is surfaced", () => {
  const exp = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("name::Untracked") }] };
  const act = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("name::Untracked") }] };
  assert.ok(kinds(compareSignatures(exp, act, null)).has("unresolved-ref"));
});

test("gate: allowed ambient globals do not produce unresolved-ref", () => {
  const exp = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("global::Uint8Array") }] };
  const act = { kind: "func", typeParams: [], ret: kw("void"), params: [{ type: ref("global::Uint8Array") }] };
  assert.equal(compareSignatures(exp, act, null, (x) => x, noConv, ["Uint8Array"]).length, 0);
});

test("typesEqual: object descriptors compare structurally", () => {
  const left = { t: "object", members: [{ name: "flag", type: ref("m::TypeFlags") }, { name: "name", type: kw("string") }] };
  const right = { t: "object", members: [{ name: "name", type: kw("string") }, { name: "flag", type: ref("m::TypeFlags") }] };
  assert.ok(typesEqual(left, right));
  assert.ok(!typesEqual(left, { t: "object", members: [{ name: "name", type: kw("string") }] }));
});

test("typesEqual: nested unions are associative", () => {
  const a = ref("m::A");
  const b = ref("m::B");
  const c = ref("m::C");
  assert.ok(typesEqual({ t: "union", members: [a, { t: "union", members: [b, c] }] }, { t: "union", members: [c, a, b] }));
  assert.ok(typesEqual({ t: "intersect", members: [a, { t: "intersect", members: [b, c] }] }, { t: "intersect", members: [b, c, a] }));
});
