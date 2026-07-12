import assert from "node:assert/strict";
import test from "node:test";

import { compareSignatures } from "./sig-check/comparison.mjs";

const keyword = (kw) => ({ t: "kw", kw });
const typeParameter = (name) => ({
  name,
  binding: { depth: 0, index: 0 },
  modifiers: { const: false, variance: null, unsupported: [] },
  constraint: null,
  default: null,
  invalidConstraint: null,
});
const method = (name, role = "signature") => ({
  kind: "method",
  name,
  role,
  modifiers: [],
  type: {
    t: "fn",
    params: [],
    ret: keyword("void"),
    missingReturnType: false,
    returnTypePolicy: "required",
    typeParams: [],
    signatureModifiers: [],
  },
});

function mergedInterface(secondTypeParameter = "T") {
  const firstParameter = typeParameter("T");
  const secondParameter = typeParameter(secondTypeParameter);
  const first = method("first");
  const second = method("second");
  const fragments = [
    { modifiers: ["export"], typeParams: [firstParameter], heritage: [], members: [first] },
    { modifiers: ["export"], typeParams: [secondParameter], heritage: [], members: [second] },
  ];
  return {
    kind: "interface",
    modifiers: ["export"],
    typeParams: [firstParameter],
    heritage: [],
    members: [first, second],
    fragments,
  };
}

test("merged declarations compare every fragment rather than only their aggregate", () => {
  const expected = mergedInterface();
  const redistributed = structuredClone(expected);
  redistributed.fragments[0].members = structuredClone(expected.members);
  redistributed.fragments[1].members = [];
  const kinds = new Set(compareSignatures(expected, redistributed, null).map((mismatch) => mismatch.kind));
  assert.equal(kinds.has("missing-member"), true);
  assert.equal(kinds.has("extra-member"), true);

  const renamedFragmentBinder = mergedInterface("U");
  assert.equal(compareSignatures(expected, renamedFragmentBinder, null)
    .some((mismatch) => mismatch.kind === "type-param-name"), true);

  const base = { token: "extends", space: "type", types: [{ t: "ref", id: "pkg/base.ts::Base", args: [] }] };
  const inherited = mergedInterface();
  inherited.heritage = [base];
  inherited.fragments[0].heritage = [base];
  const movedHeritage = structuredClone(inherited);
  movedHeritage.fragments[0].heritage = [];
  movedHeritage.fragments[1].heritage = structuredClone(movedHeritage.heritage);
  assert.equal(compareSignatures(inherited, movedHeritage, null)
    .some((mismatch) => mismatch.kind === "interface-heritage"), true);
});

test("callable member body-presence roles are outside signature comparison", () => {
  const expected = mergedInterface();
  const actual = structuredClone(expected);
  actual.members[0].role = "implementation";
  actual.fragments[0].members[0].role = "implementation";
  assert.deepEqual(compareSignatures(expected, actual, null), []);
});

test("merged enum fragments retain exact member placement", () => {
  const zero = { name: "Zero", value: { kind: "number", value: "0" }, valueIssue: undefined };
  const one = { name: "One", value: { kind: "number", value: "1" }, valueIssue: undefined };
  const expected = {
    kind: "enum",
    modifiers: ["export"],
    members: [zero, one],
    fragments: [
      { modifiers: ["export"], members: [zero] },
      { modifiers: ["export"], members: [one] },
    ],
  };
  const redistributed = structuredClone(expected);
  redistributed.fragments[0].members = structuredClone(expected.members);
  redistributed.fragments[1].members = [];
  const mismatches = compareSignatures(expected, redistributed, null);
  assert.equal(mismatches.some((mismatch) => mismatch.kind === "enum-member-count"), true);
});
test("heritage roots use constructor space while nested arguments use type space", () => {
  const descriptor = {
    kind: "class",
    modifiers: ["export"],
    typeParams: [],
    heritage: [{
      token: "extends",
      space: "value",
      types: [{
        t: "ref",
        id: "pkg/barrel.ts::Base",
        args: [{ t: "ref", id: "pkg/barrel.ts::Argument", args: [] }],
      }],
    }],
    members: [],
  };
  const seen = [];
  const canonical = (identity, space) => {
    seen.push(`${space}:${identity}`);
    return identity;
  };
  assert.deepEqual(compareSignatures(descriptor, structuredClone(descriptor), null, canonical), []);
  assert.equal(seen.includes("value:pkg/barrel.ts::Base"), true);
  assert.equal(seen.includes("type:pkg/barrel.ts::Argument"), true);
});
