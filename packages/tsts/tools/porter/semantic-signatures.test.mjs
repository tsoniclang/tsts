import assert from "node:assert/strict";
import test from "node:test";

import { renderValueGroup } from "./core/type-renderer.mjs";
import {
  buildExpectedIndex,
  goUnitDescriptor,
  semanticTypeDescriptor,
} from "./ts-extractor/expected-from-go-semantic.mjs";

const profile = {
  modules: { core: "src/go/scalars.ts", compat: "src/go/compat.ts" },
  bridge: { pointer: "GoPtr", slice: "GoSlice", array: "GoArray", map: "GoMap", chan: "GoChan" },
  primitives: {
    keyword: { string: "string", any: "unknown" },
    core: { bool: "bool", int: "int", int32: "int", float64: "double" },
    compat: { rune: "GoRune", error: "GoError", complex128: "GoComplex128" },
  },
  stdlibTypes: { "iter.Seq": "GoSeq" },
  facadeTemplate: "src/go/{importPath}.ts",
};
const semanticProfile = 0;

function indexFor(units = []) {
  const snapshot = { files: [{ importPath: "example/p", units }] };
  const tsById = new Map(units.map((unit) => [unit.id, { path: `src/p/${unit.name}.ts` }]));
  return buildExpectedIndex({ goModulePath: "example", tsRoot: "src" }, snapshot, tsById, profile);
}

const basic = (name, untyped = false) => ({ kind: "basic", basic: { name, untyped } });
const named = (packagePath, name, objectId = `${packagePath}::type::${name}`, typeArgs = []) => ({
  kind: "named",
  reference: { packagePath, name, objectId, typeArgs },
});
const parameterRef = (ownerId, index, name = `T${index}`) => ({ ownerId, role: "type", index, name });
const parameter = (ownerId, index, constraint, name) => ({ reference: parameterRef(ownerId, index, name), constraint });
const variants = (semantic, profiles = [semanticProfile]) => [{ ...semantic, profiles }];

test("canonical semantic types map resolved array lengths, identities, and constraints", () => {
  const typeUnit = {
    id: "example::p.go::type::Box",
    kind: "type",
    name: "Box",
    semantic: variants({ type: { object: { id: "example/p::type::Box", packagePath: "example/p", name: "Box" } } }),
  };
  const index = indexFor([typeUnit]);
  const context = { index, typeParameters: new Map() };
  assert.deepEqual(
    semanticTypeDescriptor({ kind: "array", length: "4", element: basic("int") }, context),
    {
      t: "ref",
      id: "src/go/compat.ts::GoArray",
      args: [
        { t: "ref", id: "src/go/scalars.ts::int", args: [] },
        { t: "literal", kind: "string", value: "4" },
      ],
    },
  );
  assert.deepEqual(
    semanticTypeDescriptor(named("example/p", "Box"), context),
    { t: "ref", id: "src/p/Box.ts::Box", args: [] },
  );
  assert.deepEqual(
    semanticTypeDescriptor({ kind: "union", union: { terms: [
      { tilde: true, type: basic("int32") },
      { tilde: false, type: basic("string") },
    ] } }, context),
    {
      t: "union",
      members: [
        { t: "goApprox", type: { t: "ref", id: "src/go/scalars.ts::int", args: [] } },
        { t: "kw", kw: "string" },
      ],
    },
  );
});

test("function descriptors use exact go/types parameters, constraints, variadics, and results", () => {
  const owner = "example/p::func::Collect";
  const typeParameter = parameter(owner, 0, { kind: "interface", interface: {
    explicitMethods: [], embeddedTypes: [], completeMethods: [], comparable: true, implicit: true, methodSetOnly: false,
  } }, "T");
  const typeRef = { kind: "typeParameter", typeParameter: typeParameter.reference };
  const unit = {
    id: "example::p.go::func::Collect",
    kind: "func",
    name: "Collect",
    semantic: variants({
      kind: "func",
      signature: {
        receiverTypeParameters: [],
        typeParameters: [typeParameter],
        parameters: { variables: [{ name: "values", type: { kind: "slice", element: typeRef } }] },
        results: { variables: [{ name: "", type: { kind: "map", key: basic("string"), element: typeRef } }] },
        variadic: true,
      },
      valueSpecs: [],
    }),
  };
  assert.deepEqual(goUnitDescriptor(unit, indexFor()), {
    kind: "func",
    modifiers: ["export"],
    signatures: [{
      role: "implementation",
      declarationModifiers: ["export"],
      params: [{
        name: "values",
        role: "parameter",
        modifiers: [],
        type: { t: "array", element: { t: "tp", depth: 0, index: 0 } },
        rest: true,
        optional: false,
        optionalSyntax: "required",
        question: false,
        missingType: false,
        initializerStatus: "missing",
        initializer: undefined,
        initializerIssue: undefined,
      }],
      ret: {
        t: "ref",
        id: "src/go/compat.ts::GoMap",
        args: [{ t: "kw", kw: "string" }, { t: "tp", depth: 0, index: 0 }],
      },
      missingReturnType: false,
      returnTypePolicy: "required",
      typeParams: [{
        name: "T",
        binding: { depth: 0, index: 0 },
        modifiers: { const: false, variance: null, unsupported: [] },
        constraint: { t: "ref", id: "name::comparable", args: [] },
        default: null,
        invalidConstraint: null,
      }],
      signatureModifiers: [],
    }],
  });
});

test("value declarations use exact go/constant values and retain blank binding types", () => {
  const unit = {
    id: "example::p.go::constGroup::_+Scale+Label",
    kind: "constGroup",
    name: "_+Scale+Label",
    valueSpecs: [{ names: ["_", "Scale", "Label"] }],
    semantic: variants({
      kind: "constGroup",
      valueSpecs: [{ specIndex: 0, names: [
        { name: "_", blank: true, type: basic("untyped int", true), constant: { kind: "Int", exact: "7" } },
        { name: "Scale", blank: false, type: basic("untyped float", true), constant: { kind: "Float", exact: "1/3" } },
        { name: "Label", blank: false, type: basic("untyped string", true), constant: { kind: "String", exact: '"ok"', stringValue: "ok" } },
      ] }],
    }),
  };
  const descriptor = goUnitDescriptor(unit, indexFor());
  const rendered = renderValueGroup(unit, {
    config: { goModulePath: "example" },
    coreImports: new Set(),
    compatImports: new Set(),
    imports: new Map(),
    diagnostics: [],
    localTypeNames: new Set(),
  }, "const");
  const renderedNames = [...rendered.matchAll(/export const ([^:]+):/g)].map((match) => match[1]);
  assert.deepEqual(descriptor.decls.map((declaration) => declaration.name), renderedNames);
  assert.notEqual(renderedNames[0], "_");
  assert.deepEqual(descriptor.decls.map(({ name, value }) => ({ name, value })), [
    { name: renderedNames[0], value: { kind: "number", value: "7" } },
    { name: "Scale", value: { kind: "number", value: "1/3" } },
    { name: "Label", value: { kind: "string", value: "ok" } },
  ]);
  assert.deepEqual(descriptor.decls.map((declaration) => declaration.type), [
    { t: "ref", id: "src/go/scalars.ts::int", args: [] },
    { t: "ref", id: "src/go/scalars.ts::double", args: [] },
    { t: "kw", kw: "string" },
  ]);
  assert.deepEqual(descriptor.decls.map(({ declarationKind, definite, modifiers, missing, initializerStatus }) => ({
    declarationKind,
    definite,
    modifiers,
    missing,
    initializerStatus,
  })), [
    { declarationKind: "const", definite: false, modifiers: ["export"], missing: false, initializerStatus: "known" },
    { declarationKind: "const", definite: false, modifiers: ["export"], missing: false, initializerStatus: "known" },
    { declarationKind: "const", definite: false, modifiers: ["export"], missing: false, initializerStatus: "known" },
  ]);
});

test("profile-dependent declarations remain explicit instead of selecting one target", () => {
  const unit = {
    id: "example::p.go::constGroup::WordBits",
    kind: "constGroup",
    name: "WordBits",
    semantic: [
      {
        kind: "constGroup",
        profiles: [1],
        valueSpecs: [{ specIndex: 0, names: [
          { name: "WordBits", blank: false, type: basic("untyped int", true), constant: { kind: "Int", exact: "32" } },
        ] }],
      },
      {
        kind: "constGroup",
        profiles: [semanticProfile],
        valueSpecs: [{ specIndex: 0, names: [
          { name: "WordBits", blank: false, type: basic("untyped int", true), constant: { kind: "Int", exact: "64" } },
        ] }],
      },
    ],
  };
  assert.deepEqual(goUnitDescriptor(unit, indexFor()), {
    kind: "profileVariants",
    variants: [
      {
        descriptor: {
          kind: "value",
          decls: [{
            name: "WordBits", declarationKind: "const", type: { t: "ref", id: "src/go/scalars.ts::int", args: [] },
            missing: false, definite: false, modifiers: ["export"], value: { kind: "number", value: "32" },
            valueIssue: undefined, initializerStatus: "known",
          }],
        },
        profiles: [1],
      },
      {
        descriptor: {
          kind: "value",
          decls: [{
            name: "WordBits", declarationKind: "const", type: { t: "ref", id: "src/go/scalars.ts::int", args: [] },
            missing: false, definite: false, modifiers: ["export"], value: { kind: "number", value: "64" },
            valueIssue: undefined, initializerStatus: "known",
          }],
        },
        profiles: [semanticProfile],
      },
    ],
  });
});

test("semantic mapping fails hard for unsupported or incomplete canonical types", () => {
  const context = { index: indexFor(), typeParameters: new Map() };
  assert.throws(() => semanticTypeDescriptor({ kind: "mystery" }, context), /unsupported canonical go\/types descriptor/);
  assert.throws(() => semanticTypeDescriptor({ kind: "array", length: "Width", element: basic("int") }, context), /invalid canonical Go array length/);
  assert.throws(() => semanticTypeDescriptor({ kind: "typeParameter", typeParameter: parameterRef("missing", 0) }, context), /unbound Go type parameter/);
});
