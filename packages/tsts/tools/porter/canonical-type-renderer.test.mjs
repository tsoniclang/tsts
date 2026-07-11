import assert from "node:assert/strict";
import test from "node:test";

import { renderCanonicalType } from "./core/canonical-type-renderer.mjs";

const operations = {
  basic: (name) => `basic:${name}`,
  compat: (name) => name,
  reference: (reference, typeArguments) => `${reference.packagePath}::${reference.name}${typeArguments.length === 0 ? "" : `<${typeArguments.join(",")}>`}`,
};

test("canonical type rendering defaults untyped basics and preserves package identities", () => {
  assert.equal(
    renderCanonicalType({ kind: "basic", basic: { name: "untyped int", untyped: true } }, operations),
    "basic:int",
  );
  assert.equal(
    renderCanonicalType({
      kind: "named",
      reference: {
        packagePath: "github.com/microsoft/typescript-go/internal/core",
        name: "Path",
        typeArgs: [{ kind: "basic", basic: { name: "string", untyped: false } }],
      },
    }, operations),
    "github.com/microsoft/typescript-go/internal/core::Path<basic:string>",
  );
});

test("canonical type rendering retains exact decimal array lengths beyond JavaScript safe integers", () => {
  assert.equal(
    renderCanonicalType({
      kind: "array",
      length: "9007199254740993",
      element: { kind: "basic", basic: { name: "byte", untyped: false } },
    }, operations),
    'GoArray<basic:byte, "9007199254740993">',
  );
  assert.throws(
    () => renderCanonicalType({ kind: "array", length: 2, element: { kind: "basic", basic: { name: "byte", untyped: false } } }, operations),
    /exact decimal string/,
  );
});

test("canonical value types fail hard on unsupported unions and malformed channels", () => {
  assert.throws(() => renderCanonicalType({ kind: "union", union: { terms: [] } }, operations), /cannot appear as a value declaration type/);
  assert.throws(
    () => renderCanonicalType({ kind: "channel", direction: "unknown", element: { kind: "basic", basic: { name: "int", untyped: false } } }, operations),
    /channel direction/,
  );
});
