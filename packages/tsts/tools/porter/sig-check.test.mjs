// Unit tests for the signature comparator + canonicalizer + convention engine.
// Descriptor-level (no parser/snapshot), so fast and deterministic.
import { test } from "node:test";
import assert from "node:assert/strict";
import { typesEqual, canonicalKey } from "./ts-extractor/ast-signatures.mjs";
import { loadConventions, normalizeDescriptor } from "./ts-extractor/conventions.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";
import { compareSignatures, descriptorInventoryMismatches, resolveOverride, unitSignatureHash, validateOverrideUse, withSignatureOverrideHashes } from "./sig-check.mjs";

const ref = (id, ...args) => ({ t: "ref", id, args });
const kw = (k) => ({ t: "kw", kw: k });
const exactTypeParameter = (parameter = {}, index = 0, depth = 0) => ({
  name: parameter.name ?? `T${index}`,
  binding: parameter.binding ?? { depth, index },
  modifiers: parameter.modifiers ?? { const: false, variance: null, unsupported: [] },
  constraint: parameter.constraint ?? null,
  default: parameter.default ?? null,
  invalidConstraint: parameter.invalidConstraint ?? null,
});
const exactParameter = (parameter = {}, index = 0) => ({
  name: parameter.name ?? `arg${index}`,
  role: parameter.role ?? "parameter",
  modifiers: parameter.modifiers ?? [],
  type: parameter.type,
  rest: parameter.rest ?? false,
  optional: parameter.optional ?? false,
  optionalSyntax: parameter.optionalSyntax ?? "required",
  question: parameter.question ?? false,
  missingType: parameter.missingType ?? false,
  initializerStatus: parameter.initializerStatus ?? "missing",
  initializer: parameter.initializer,
  initializerIssue: parameter.initializerIssue,
});
const exactSignature = (signature = {}) => ({
  role: signature.role ?? "implementation",
  declarationModifiers: signature.declarationModifiers ?? ["export"],
  params: (signature.params ?? []).map(exactParameter),
  ret: signature.ret ?? kw("void"),
  missingReturnType: signature.missingReturnType ?? false,
  returnTypePolicy: signature.returnTypePolicy ?? "required",
  typeParams: (signature.typeParams ?? []).map(exactTypeParameter),
  signatureModifiers: signature.signatureModifiers ?? [],
});
const callable = (signature = {}) => {
  const exact = exactSignature(signature);
  const { role: _role, declarationModifiers: _declarationModifiers, ...descriptor } = exact;
  return { t: "fn", ...descriptor };
};

const func = (signature) => ({ kind: "func", modifiers: ["export"], signatures: [exactSignature(signature)] });
const funcSet = (signatures) => ({ kind: "func", modifiers: ["export"], signatures: signatures.map(exactSignature) });
const member = (name, type, options = {}) => {
  const kind = options.kind ?? "property";
  const callable = new Set(["method", "call", "construct", "index", "constructor", "get", "set"]).has(kind);
  return { kind, name, ...(callable ? { role: options.role ?? "signature" } : {}), modifiers: [], type, ...options };
};
const iface = (members, options = {}) => {
  const descriptor = {
    kind: "interface",
    modifiers: ["export"],
    typeParams: [],
    heritage: [],
    members,
    ...options,
  };
  return {
    ...descriptor,
    fragments: options.fragments ?? [{
      modifiers: descriptor.modifiers,
      typeParams: descriptor.typeParams,
      heritage: descriptor.heritage,
      members: descriptor.members,
    }],
  };
};
const value = (name, type, options = {}) => ({
  name,
  type,
  missing: false,
  declarationKind: "const",
  definite: false,
  modifiers: ["export"],
  ...options,
});
const kinds = (ms) => new Set(ms.map((m) => m.kind));
const conventionBase = { goConstraintId: "packages/tsts/src/go/compat.ts::GoConstraint" };
const noConv = loadConventions(conventionBase);

test("typesEqual: Array<T> == T[]", () => {
  const arrayGen = ref("global::Array", kw("string"));
  const arraySugar = { t: "array", element: kw("string") };
  // Array<T> is canonicalized to {t:array} by the extractor; here assert the array form matches itself
  assert.ok(typesEqual(arraySugar, { t: "array", element: kw("string") }));
  assert.equal(canonicalKey(arrayGen) === canonicalKey(arraySugar), false); // pre-canonicalization differ
});

test("typesEqual: unresolved ids never compare by terminal name", () => {
  assert.ok(!typesEqual(ref("name::Node"), ref("global::Node")));
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
  const exp = func({ typeParams: [], ret: kw("void"), params: [{ type: ref("m::A") }, { type: ref("m::B") }] });
  const dropParam = func({ typeParams: [], ret: kw("void"), params: [{ type: ref("m::A") }] });
  assert.ok(kinds(compareSignatures(exp, dropParam, null)).has("arity"));

  const wrongType = func({ typeParams: [], ret: kw("void"), params: [{ type: ref("m::A") }, { type: ref("m::C") }] });
  assert.ok(kinds(compareSignatures(exp, wrongType, null)).has("param-type"));

  const wrongRet = func({ typeParams: [], ret: kw("number"), params: exp.signatures[0].params });
  assert.ok(kinds(compareSignatures(exp, wrongRet, null)).has("return-type"));

  const swapped = func({ typeParams: [], ret: kw("void"), params: [{ type: ref("m::B") }, { type: ref("m::A") }] });
  assert.ok(kinds(compareSignatures(exp, swapped, null)).has("param-order"));

  assert.equal(compareSignatures(exp, exp, null).length, 0);
});

test("missing function annotations fail closed", () => {
  const expected = func({ typeParams: [], ret: kw("void"), params: [{ type: kw("number") }] });
  const actual = func({
    typeParams: [],
    ret: kw("void"),
    missingReturnType: true,
    params: [{ type: kw("number"), missingType: true }],
  });
  const mismatches = kinds(compareSignatures(expected, actual, null));
  assert.ok(mismatches.has("param-annotation-missing"));
  assert.ok(mismatches.has("return-annotation-missing"));
});

test("function overload sets compare every ordered declaration signature", () => {
  const one = func({ typeParams: [], ret: kw("string"), params: [{ type: kw("string") }] });
  const two = funcSet([
    { role: "overload", typeParams: [], ret: kw("string"), params: [{ name: "value", type: kw("string") }] },
    { typeParams: [], ret: kw("number"), params: [{ name: "value", type: kw("number") }] },
  ]);
  assert.ok(kinds(compareSignatures(one, two, null)).has("function-signature-count"));
  assert.equal(compareSignatures(two, structuredClone(two), null).length, 0);
});

test("exact declarations retain modifier and lexical type-parameter contracts", () => {
  const expected = func({
    typeParams: [{
      name: "T",
      binding: { depth: 0, index: 0 },
      modifiers: { const: true, variance: "out", unsupported: [] },
      constraint: kw("object"),
      default: kw("unknown"),
    }],
    signatureModifiers: ["async"],
  });
  const mutations = [
    [(actual) => { actual.modifiers = []; }, "declaration-modifier"],
    [(actual) => { actual.signatures[0].declarationModifiers = ["declare"]; }, "declaration-modifier"],
    [(actual) => { actual.signatures[0].signatureModifiers = []; }, "function-modifier"],
    [(actual) => { actual.signatures[0].typeParams[0].name = "U"; }, "type-param-name"],
    [(actual) => { actual.signatures[0].typeParams[0].binding = { depth: 1, index: 0 }; }, "type-param-binding"],
    [(actual) => { actual.signatures[0].typeParams[0].modifiers.const = false; }, "type-param-const"],
    [(actual) => { actual.signatures[0].typeParams[0].modifiers.variance = null; }, "type-param-variance"],
    [(actual) => { actual.signatures[0].typeParams[0].constraint = kw("string"); }, "type-param-constraint"],
    [(actual) => { actual.signatures[0].typeParams[0].default = null; }, "type-param-default"],
  ];
  for (const [mutate, mismatchKind] of mutations) {
    const actual = structuredClone(expected);
    mutate(actual);
    assert.ok(kinds(compareSignatures(expected, actual, null)).has(mismatchKind), mismatchKind);
  }
});

test("exact parameters retain names, this role, rest, question, initializer, and modifiers", () => {
  const expected = func({ params: [
    { name: "this", role: "this", type: ref("m::Receiver") },
    {
      name: "value",
      type: kw("number"),
      modifiers: ["readonly"],
      optional: true,
      optionalSyntax: "initializer",
      initializerStatus: "known",
      initializer: { kind: "number", value: "1" },
    },
    { name: "rest", type: { t: "array", element: kw("string") }, rest: true },
  ] });
  const mutations = [
    [(actual) => { actual.signatures[0].params[0].name = "receiver"; }, "param-name"],
    [(actual) => { actual.signatures[0].params[0].role = "parameter"; }, "param-role"],
    [(actual) => { actual.signatures[0].params[1].modifiers = []; }, "param-modifier"],
    [(actual) => { actual.signatures[0].params[1].optionalSyntax = "question"; }, "param-optional-syntax"],
    [(actual) => { actual.signatures[0].params[1].question = true; }, "param-question"],
    [(actual) => { actual.signatures[0].params[1].initializer = { kind: "number", value: "2" }; }, "param-initializer"],
    [(actual) => { actual.signatures[0].params[2].rest = false; }, "variadic-position"],
  ];
  for (const [mutate, mismatchKind] of mutations) {
    const actual = structuredClone(expected);
    mutate(actual);
    assert.ok(kinds(compareSignatures(expected, actual, null)).has(mismatchKind), mismatchKind);
  }
});

test("exact member and value state includes declaration-only fields", () => {
  const property = member("value", kw("number"), { definite: false });
  const expectedInterface = iface([property]);
  const definiteMember = structuredClone(expectedInterface);
  definiteMember.members[0].definite = true;
  definiteMember.fragments[0].members[0].definite = true;
  assert.ok(kinds(compareSignatures(expectedInterface, definiteMember, null)).has("member-definite"));

  const expectedValue = { kind: "value", decls: [value("item", kw("number"))] };
  const changedValue = structuredClone(expectedValue);
  changedValue.decls[0].definite = true;
  changedValue.decls[0].modifiers = [];
  const valueKinds = kinds(compareSignatures(expectedValue, changedValue, null));
  assert.ok(valueKinds.has("value-definite"));
  assert.ok(valueKinds.has("value-modifier"));
});

test("obsolete, hidden, accessor, and non-plain signature fields fail the exact descriptor contract", () => {
  const expected = func({ params: [{ name: "value", type: kw("number") }] });
  for (const mutate of [
    (actual) => { delete actual.modifiers; },
    (actual) => { delete actual.signatures[0].returnTypePolicy; },
    (actual) => { actual.legacy = true; },
    (actual) => { actual.signatures[0].params[0].text = "number"; },
    (actual) => Object.defineProperty(actual.signatures[0], "returnTypePolicy", { get: () => "required" }),
    (actual) => { Object.setPrototypeOf(actual.signatures[0].params[0], { inherited: true }); },
  ]) {
    const actual = structuredClone(expected);
    mutate(actual);
    assert.ok(kinds(compareSignatures(expected, actual, null)).has("invalid-signature-contract"));
  }
});

test("declaration kind is compared before kind-specific descriptor dispatch", () => {
  const expected = func({ typeParams: [], ret: kw("void"), params: [] });
  for (const actual of [
    iface([]),
    { kind: "alias", modifiers: ["export"], typeParams: [], type: kw("void") },
    { kind: "other", nodeKind: "ClassDeclaration" },
  ]) {
    assert.deepEqual(compareSignatures(expected, actual, null).map((mismatch) => mismatch.kind), ["declaration-kind"]);
  }
});

test("compareInterface: member-type, missing-member, extra-member; method == fn-property", () => {
  const exp = iface([member("x", ref("m::A")), member("y", kw("string"))]);
  const wrong = iface([member("x", ref("m::B")), member("y", kw("string"))]);
  assert.ok(kinds(compareSignatures(exp, wrong, null)).has("member-type"));

  const missing = iface([member("x", ref("m::A"))]);
  assert.ok(kinds(compareSignatures(exp, missing, null)).has("missing-member"));

  const extra = iface([...exp.members, member("z", kw("number"))]);
  assert.ok(kinds(compareSignatures(exp, extra, null)).has("extra-member"));

  // method `m(p):R` and property `m: (p)=>R` both arrive as {t:'fn'} members -> equal.
  const fnType = callable({ params: [{ name: "value", type: kw("string") }], ret: kw("void") });
  const ifaceA = iface([member("m", fnType, { kind: "method" })]);
  const ifaceB = iface([member("m", callable({ params: [{ name: "value", type: kw("string") }], ret: kw("void") }), { kind: "method" })]);
  assert.equal(compareSignatures(ifaceA, ifaceB, null).length, 0);
});

test("interface heritage and member modifiers compare exactly", () => {
  const property = member("value", kw("number"));
  const expected = iface([property]);
  assert.equal(compareSignatures(expected, { ...expected, members: [{ ...property }] }, null).length, 0);
  const heritage = [{ token: "extends", space: "type", types: [ref("m::Base")] }];
  const members = [{ ...property, readonly: true, optional: true }];
  const actual = { ...expected, heritage, members, fragments: [{ ...expected.fragments[0], heritage, members }] };
  const mismatches = kinds(compareSignatures(expected, actual, null));
  assert.ok(mismatches.has("interface-heritage"));
  assert.ok(mismatches.has("member-readonly"));
  assert.ok(mismatches.has("member-optionality"));

  const plain = callable();
  const generic = callable({ typeParams: [{}] });
  assert.equal(typesEqual(plain, generic), false);
});

test("allowed globals cannot hide hard imported identity drift", () => {
  const expected = func({ typeParams: [], params: [{ type: ref("global::Date") }], ret: kw("void") });
  const actual = func({ typeParams: [], params: [{ type: ref("pkg/date.ts::Date") }], ret: kw("void") });
  assert.ok(kinds(compareSignatures(expected, actual, null, (id) => id, noConv, { accept: (identity) => identity === "global::Date" })).has("param-type"));
});

test("compareValue: value-annotation-missing and value-type", () => {
  const exp = { kind: "value", decls: [value("c", ref("core::int"))] };
  const unannotated = { kind: "value", decls: [value("c", undefined, { missing: true })] };
  assert.ok(kinds(compareSignatures(exp, unannotated, null)).has("value-annotation-missing"));

  const wrongType = { kind: "value", decls: [value("c", kw("string"))] };
  assert.ok(kinds(compareSignatures(exp, wrongType, null)).has("value-type"));

  assert.equal(compareSignatures(exp, { kind: "value", decls: [value("c", ref("core::int"))] }, null).length, 0);
  assert.deepEqual(
    compareSignatures(
      { kind: "value", decls: [value("version", kw("string"), { initializerStatus: "known", value: { kind: "string", value: "7.1.0-dev" } })] },
      { kind: "value", decls: [value("version", kw("string"), { initializerStatus: "known", value: { kind: "string", value: "7.0.0-dev" } })] },
      null,
    ).map((mismatch) => mismatch.kind),
    ["value-initializer"],
  );

  const complete = { kind: "value", decls: [value("a", kw("number")), value("b", kw("string"))] };
  assert.deepEqual(
    compareSignatures(complete, { kind: "value", decls: [value("a", kw("number"))] }, null).map((mismatch) => mismatch.kind),
    ["missing-value"],
  );
  assert.deepEqual(
    compareSignatures(complete, { kind: "value", decls: [...complete.decls, value("c", kw("boolean"))] }, null).map((mismatch) => mismatch.kind),
    ["extra-value"],
  );
  assert.ok(kinds(compareSignatures(complete, { kind: "value", decls: [...complete.decls].reverse() }, null)).has("value-order"));
});

test("overrides: ignore aspect only", () => {
  const exp = func({ typeParams: [], ret: kw("void"), params: [{ type: ref("m::A") }] });
  const wrong = func({ typeParams: [], ret: kw("number"), params: [{ type: ref("m::B") }] });
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
  assert.ok(kinds(compareSignatures(func({ typeParams: [], ret: kw("void"), params: [] }), undefined, null)).has("actual-missing"));
});

test("local signature override captures exact Go and TypeScript hashes", () => {
  const exp = func({ typeParams: [], ret: kw("void"), params: [{ type: ref("m::A") }] });
  const actual = func({ typeParams: [], ret: kw("void"), params: [{ type: ref("m::B") }] });
  actual.signatures[0].params[0].initializerStatus = "known";
  actual.signatures[0].params[0].initializer = { kind: "number", value: "1" };
  assert.ok(kinds(compareSignatures(exp, actual, null)).has("param-initializer-status"));
  const issues = [];
  const override = resolveOverride(
    {
      category: "runtime-performance",
      allow: ["signature"],
      reason: "Target-native carrier.",
      goSignatureHash: unitSignatureHash(exp),
      tsSignatureHash: unitSignatureHash(actual),
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
      goSignatureHash: "0".repeat(64),
      tsSignatureHash: unitSignatureHash(actual),
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

test("signature mismatches carry exact local-override hashes", () => {
  const expected = func({ typeParams: [], ret: kw("void"), params: [{ type: ref("m::A") }] });
  const actual = func({ typeParams: [], ret: kw("void"), params: [{ type: ref("m::B") }] });
  const [mismatch] = withSignatureOverrideHashes(compareSignatures(expected, actual, null), expected, actual);

  assert.equal(mismatch.goSignatureHash, unitSignatureHash(expected));
  assert.equal(mismatch.tsSignatureHash, unitSignatureHash(actual));
  assert.match(mismatch.goSignatureHash, /^[0-9a-f]{64}$/);
});

test("signature override cannot waive initializer or value-order drift", () => {
  const expected = {
    kind: "value",
    decls: [
      value("first", kw("number"), { initializerStatus: "known", value: { kind: "number", value: "1" } }),
      value("second", kw("number"), { initializerStatus: "known", value: { kind: "number", value: "2" } }),
    ],
  };
  const actual = {
    kind: "value",
    decls: [
      value("second", kw("number"), { initializerStatus: "known", value: { kind: "number", value: "3" } }),
      value("first", kw("number"), { initializerStatus: "known", value: { kind: "number", value: "1" } }),
    ],
  };
  const issues = [];
  const override = resolveOverride({
    category: "runtime-representation",
    allow: ["signature"],
    reason: "The declaration uses an explicitly reviewed target representation.",
    goSignatureHash: unitSignatureHash(expected),
    tsSignatureHash: unitSignatureHash(actual),
  }, "id", expected, actual, (value) => value, issues);
  assert.deepEqual(issues, []);
  const mismatchKinds = kinds(compareSignatures(expected, actual, override));
  assert.ok(mismatchKinds.has("value-order"));
  assert.ok(mismatchKinds.has("value-initializer"));
});

test("unused exact override allowances are rejected", () => {
  const issues = [];
  validateOverrideUse({ allow: ["signature", "initializer", "value-order"] }, [], "id", issues);
  assert.deepEqual(issues.map((entry) => entry.reason.split(" ")[1]), ["'signature'", "'initializer'", "'value-order'"]);
});

test("local initializer override ignores only exact snapshotted initializer drift", () => {
  const expected = { kind: "value", decls: [value("limit", kw("number"), { initializerStatus: "known", value: { kind: "number", value: "10" } })] };
  const actual = { kind: "value", decls: [value("limit", kw("number"), { initializerStatus: "known", value: { kind: "number", value: "12" } })] };
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
  const expected = { kind: "value", decls: [value("first", kw("number")), value("second", kw("number"))] };
  const actual = { kind: "value", decls: [value("second", kw("number")), value("first", kw("number"))] };
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
    {},
    { acceptNullable: true },
    { anyMapKey: true },
    { unwrapPtrFunc: true },
    { acceptNilableGoTypes: true },
    { facadeGenericRefs: ["go/sync.ts::Pool"] },
  ]) {
    assert.throws(() => loadConventions({ ...conventionBase, structural }), /unknown current-contract key.*structural/);
  }
});

test("signature profile rejects every unknown or retired contract key", () => {
  assert.throws(() => loadProfile({ signatureCheck: { structural: {} } }), /unknown current-contract key/);
  assert.throws(() => loadProfile({ signatureCheck: { _doc: "out-of-schema" } }), /unknown current-contract key/);
  assert.throws(() => loadProfile({ signatureCheck: { conventions: { structural: {} } } }), /unknown current-contract key/);
});

test("conventions reject arbitrary descriptor equivalences", () => {
  assert.throws(() => loadConventions({ ...conventionBase, equivalences: [] }), /unknown current-contract key/);
  const conv = loadConventions(conventionBase);
  const goComparable = ref("name::comparable");
  const tsComparable = ref("packages/tsts/src/go/compat.ts::GoComparable");
  assert.ok(!typesEqual(normalizeDescriptor(goComparable, conv, "constraint"), normalizeDescriptor(tsComparable, conv, "constraint")));
  assert.ok(!typesEqual(normalizeDescriptor(goComparable, conv, "type"), normalizeDescriptor(tsComparable, conv, "type")));
});

test("compareTypeParams: non-trivial constraints cannot be erased", () => {
  const exp = func({ typeParams: [{ constraint: ref("name::comparable") }], ret: kw("void"), params: [] });
  const actual = func({ typeParams: [{ constraint: null }], ret: kw("void"), params: [] });
  assert.ok(kinds(compareSignatures(exp, actual, null, (x) => x, noConv)).has("type-param-constraint"));
});

test("compareTypeParams: current literal descriptors preserve GoConstraint markers and audit runtime carriers", () => {
  const conv = loadConventions(conventionBase);
  const marker = ref(
    "packages/tsts/src/go/compat.ts::GoConstraint",
    { t: "literal", kind: "string", value: "~int32 | ~uint32" },
  );
  const exp = func({ typeParams: [{ constraint: marker }], ret: kw("void"), params: [] });
  const markerOnly = func({
    typeParams: [{ constraint: structuredClone(marker) }],
    ret: kw("void"),
    params: [],
  });
  const markerWithCarrier = func({
    typeParams: [{
      constraint: {
        t: "intersect",
        members: [
          structuredClone(marker),
          kw("number"),
        ],
      },
    }],
    ret: kw("void"),
    params: [],
  });
  assert.equal(compareSignatures(exp, markerOnly, null, (x) => x, conv).length, 0);
  assert.ok(kinds(compareSignatures(exp, markerWithCarrier, null, (x) => x, conv)).has("type-param-constraint"));
});

test("compareInterface: unsupported member shapes are reported, not dropped", () => {
  const exp = iface([member("x", kw("string"))]);
  const actual = iface([member("x", kw("string")), { kind: "unsupported", name: "<IndexSignature>", unsupported: "IndexSignature" }]);
  assert.ok(kinds(compareSignatures(exp, actual, null)).has("unsupported-member"));
});

test("compareInterface: duplicate members cannot collapse through the comparison map", () => {
  const expected = iface([member("value", kw("string"))]);
  const actual = iface([member("value", kw("string")), member("value", kw("string"))]);
  assert.ok(kinds(compareSignatures(expected, actual, null)).has("duplicate-member"));
});

test("classes and enums compare exact declaration modifiers, members, order, and values", () => {
  const classShape = { kind: "class", modifiers: ["abstract"], typeParams: [], heritage: [], members: [member("value", kw("string"))] };
  assert.equal(compareSignatures(classShape, structuredClone(classShape), null).length, 0);
  assert.ok(kinds(compareSignatures(classShape, { ...structuredClone(classShape), modifiers: [] }, null)).has("declaration-modifier"));

  const enumShape = { kind: "enum", modifiers: ["const"], members: [{ name: "First", value: { kind: "number", value: "0" } }] };
  assert.equal(compareSignatures(enumShape, structuredClone(enumShape), null).length, 0);
  assert.ok(kinds(compareSignatures(enumShape, { ...structuredClone(enumShape), members: [{ name: "First", value: { kind: "number", value: "1" } }] }, null)).has("enum-member-value"));
});

test("gate: unresolved type identity is surfaced", () => {
  const exp = func({ typeParams: [], ret: kw("void"), params: [{ type: ref("name::Untracked") }] });
  const act = func({ typeParams: [], ret: kw("void"), params: [{ type: ref("name::Untracked") }] });
  assert.ok(kinds(compareSignatures(exp, act, null)).has("unresolved-ref"));
});

test("gate: reviewed ambient declarations do not produce unresolved-ref", () => {
  const exp = func({ typeParams: [], ret: kw("void"), params: [{ type: ref("global::Uint8Array") }] });
  const act = func({ typeParams: [], ret: kw("void"), params: [{ type: ref("global::Uint8Array") }] });
  assert.equal(compareSignatures(exp, act, null, (x) => x, noConv, { accept: (identity) => identity === "global::Uint8Array" }).length, 0);
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
