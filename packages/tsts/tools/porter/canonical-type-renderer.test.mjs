import assert from "node:assert/strict";
import test from "node:test";

import { renderCanonicalType, renderCanonicalTypeParameters } from "./core/canonical-type-renderer.mjs";

const operations = {
  basic: (name) => `basic:${name}`,
  compat: (name) => name,
  carrier: (name) => ({ array: "GoArray", slice: "GoSlice", chan: "GoChan", unsafePointer: "GoUnsafePointer" })[name],
  pointerCarrier: (representation) => representation === "reference" ? "GoRef" : "GoPtr",
  reference: (reference, typeArguments) => `${reference.packagePath}::${reference.name}${typeArguments.length === 0 ? "" : `<${typeArguments.join(",")}>`}`,
};

test("canonical type rendering consumes only lowered semantic contracts", () => {
  assert.equal(
    renderCanonicalType({ kind: "basic", name: "int" }, operations),
    "basic:int",
  );
  assert.equal(
    renderCanonicalType({
      kind: "reference",
      reference: {
        packagePath: "github.com/microsoft/typescript-go/internal/core",
        name: "Path",
        objectId: "github.com/microsoft/typescript-go/internal/core::type::Path",
      },
      typeArguments: [{ kind: "basic", name: "string" }],
    }, operations),
    "github.com/microsoft/typescript-go/internal/core::Path<basic:string>",
  );
});

test("canonical type rendering retains exact decimal array lengths beyond JavaScript safe integers", () => {
  assert.equal(
    renderCanonicalType({
      kind: "array",
      length: "9007199254740993",
      element: { kind: "basic", name: "byte" },
    }, operations),
    'GoArray<basic:byte, "9007199254740993">',
  );
  assert.throws(
    () => renderCanonicalType({ kind: "array", length: 2, element: { kind: "basic", name: "byte" } }, operations),
    /exact decimal string/,
  );
});

test("canonical carrier rendering uses intrinsic nilability with no synthetic boolean arguments", () => {
  assert.equal(renderCanonicalType({
    kind: "carrier",
    carrier: "slice",
    arguments: [{ kind: "basic", name: "int" }],
    metadataArguments: [],
  }, operations), "GoSlice<basic:int>");
  assert.equal(renderCanonicalType({
    kind: "carrier",
    carrier: "chan",
    arguments: [{ kind: "basic", name: "int" }],
    metadataArguments: [{ kind: "string", value: "receive" }],
  }, operations), 'GoChan<basic:int, "receive">');
  assert.equal(renderCanonicalType({
    kind: "pointer",
    representation: "reference",
    element: { kind: "basic", name: "int" },
  }, operations), "GoRef<basic:int>");
  assert.equal(renderCanonicalType({
    kind: "carrier",
    carrier: "unsafePointer",
    arguments: [],
    metadataArguments: [],
  }, operations), "GoUnsafePointer");
  assert.equal(renderCanonicalTypeParameters([{
    reference: { name: "T" },
    constraint: { kind: "carrier", carrier: "slice", arguments: [{ kind: "basic", name: "int" }], metadataArguments: [] },
  }], operations), "<T extends GoSlice<basic:int>>");
  assert.throws(
    () => renderCanonicalTypeParameters([], operations, { syntheticNilability: { name: "N" } }),
    /do not accept synthetic rendering options/,
  );
});

test("canonical contracts fail closed on malformed composite and carrier metadata", () => {
  assert.throws(() => renderCanonicalType({ kind: "union", members: [] }, operations), /union has no members/);
  assert.throws(() => renderCanonicalType({
    kind: "carrier",
    carrier: "chan",
    arguments: [{ kind: "basic", name: "int" }],
    metadataArguments: [{ kind: "boolean", value: true }],
  }, operations), /invalid metadata/);
  assert.throws(
    () => renderCanonicalType({ kind: "pointer", representation: "unknown", element: { kind: "basic", name: "int" } }, operations),
    /unknown representation/,
  );
});
