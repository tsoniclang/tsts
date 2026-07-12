import assert from "node:assert/strict";
import test from "node:test";

import { compareSignatures } from "./sig-check/comparison.mjs";
import { canonicalizeGoTypeConstraint } from "./ts-extractor/constraint-canonicalization.mjs";
import { loadConventions } from "./ts-extractor/conventions.mjs";
import { goUnitDescriptor } from "./ts-extractor/expected-from-go-semantic.mjs";

const core = "src/go/scalars.ts";
const compat = "src/go/compat.ts";
const goConstraintId = `${compat}::GoConstraint`;
const index = {
  core,
  compat,
  goConstraintId,
  primKeyword: { string: "string", any: "unknown" },
  primCore: { bool: "bool", int: "int", int32: "int", uint32: "uint" },
  primCompat: {},
};
const conventions = loadConventions({ goConstraintId });

const kw = (keyword) => ({ t: "kw", kw: keyword });
const ref = (id, args = []) => ({ t: "ref", id, args });
const approximation = (type) => ({ t: "goApprox", type });
const marker = (text) => ref(goConstraintId, [{ t: "literal", kind: "string", value: text }]);
const intersection = (...members) => ({ t: "intersect", members });
const embedded = (type) => ({
  t: "object",
  members: [{
    kind: "property",
    name: "__tsgoEmbedded0",
    modifiers: [],
    readonly: true,
    optional: true,
    type,
  }],
});

function callable(constraint) {
  return {
    kind: "func",
    modifiers: ["export"],
    signatures: [{
      role: "implementation",
      declarationModifiers: ["export"],
      params: [],
      ret: kw("void"),
      missingReturnType: false,
      returnTypePolicy: "required",
      typeParams: [{
        name: "T",
        binding: { depth: 0, index: 0 },
        modifiers: { const: false, variance: null, unsupported: [] },
        constraint,
        default: null,
        invalidConstraint: null,
      }],
      signatureModifiers: [],
    }],
  };
}

test("embedded numeric type sets equal exact GoConstraint carriers", () => {
  const goShape = embedded({
    t: "union",
    members: [
      approximation(ref(`${core}::int`)),
      approximation(ref(`${core}::uint`)),
    ],
  });
  const tsShape = intersection(marker("~int32 | ~uint32"), kw("number"));
  const expected = canonicalizeGoTypeConstraint(goShape, { text: "~int32 | ~uint32" }, index);

  assert.deepEqual(expected, tsShape);
  assert.deepEqual(compareSignatures(callable(expected), callable(tsShape), null, (id) => id, conventions), []);

  const wrong = intersection(marker("~int64 | ~uint64"), kw("number"));
  assert.deepEqual(
    compareSignatures(callable(expected), callable(wrong), null, (id) => id, conventions).map((entry) => entry.kind),
    ["type-param-constraint"],
  );
});

test("composite and non-approximate embedded type sets retain exact carriers", () => {
  const key = { t: "tp", depth: 0, index: 1 };
  const value = { t: "tp", depth: 0, index: 2 };
  const map = ref(`${compat}::GoMap`, [key, value]);
  assert.deepEqual(
    canonicalizeGoTypeConstraint(embedded(approximation(map)), { text: "~map[K]V" }, index),
    intersection(marker("~map[K]V"), map),
  );

  const pointers = {
    t: "union",
    members: [ref(`${compat}::GoPtr`, [ref("src/ast.ts::Node")]), ref(`${compat}::GoPtr`, [ref("src/ast.ts::Symbol")])],
  };
  assert.deepEqual(canonicalizeGoTypeConstraint(embedded(pointers), undefined, index), pointers);
});

test("semantic expected signatures canonicalize source type-set evidence", () => {
  const ownerId = "example/p::func::hash";
  const reference = { ownerId, role: "type", index: 0, name: "T" };
  const unit = {
    id: "example::p.go::func::hash",
    kind: "func",
    name: "hash",
    typeParameterDetails: [{ name: "T", constraint: { text: "~int32 | ~uint32" } }],
    semantic: [{
      kind: "func",
      profiles: [0],
      signature: {
        receiverTypeParameters: [],
        typeParameters: [{
          reference,
          constraint: {
            kind: "interface",
            nilable: true,
            interface: {
              explicitMethods: [],
              embeddedTypes: [{
                kind: "union",
                nilable: false,
                union: {
                  terms: [
                    { tilde: true, type: { kind: "basic", nilable: false, basic: { name: "int32", untyped: false } } },
                    { tilde: true, type: { kind: "basic", nilable: false, basic: { name: "uint32", untyped: false } } },
                  ],
                },
              }],
              embeddedKinds: ["typeSet"],
              completeMethods: [],
              comparable: true,
              implicit: true,
              methodSetOnly: false,
            },
          },
        }],
        parameters: { variables: [] },
        results: { variables: [] },
        variadic: false,
      },
    }],
  };

  assert.deepEqual(goUnitDescriptor(unit, index).signatures[0].typeParams[0].constraint, intersection(
    marker("~int32 | ~uint32"),
    kw("number"),
  ));
});
