import assert from "node:assert/strict";
import { test } from "node:test";
import type { TargetParameter, TargetTypeRef } from "./facts.js";
import { substituteTargetParameter, substituteTargetTypeRef } from "./target-type-ref-substitution.js";

const int32Type = Object.freeze({ kind: "source-primitive", name: "int32" } as const satisfies TargetTypeRef);
const stringType = Object.freeze({ kind: "target-named", id: "Acme.String" } as const satisfies TargetTypeRef);

test("target type substitution replaces direct parameters and preserves absent substitutions", () => {
  const selected = Object.freeze({ kind: "type-parameter", name: "T" } as const satisfies TargetTypeRef);
  const unselected = Object.freeze({ kind: "type-parameter", name: "U" } as const satisfies TargetTypeRef);
  const substitutions = new Map<string, TargetTypeRef>([["T", int32Type]]);

  assert.ok(substituteTargetTypeRef(selected, substitutions) === int32Type);
  assert.ok(substituteTargetTypeRef(unselected, substitutions) === unselected);
  assert.ok(substituteTargetTypeRef(selected, new Map()) === selected);
});

test("target type substitution closes every recursive TargetTypeRef position", () => {
  const parameter = Object.freeze({ kind: "type-parameter", name: "T" } as const satisfies TargetTypeRef);
  const nested: TargetTypeRef = Object.freeze({
    kind: "tuple",
    elements: Object.freeze([
      Object.freeze({ kind: "source-global", name: "Box", typeArguments: Object.freeze([parameter]) }),
      Object.freeze({ kind: "target-named", id: "Acme.Box", typeArguments: Object.freeze([parameter]) }),
      Object.freeze({ kind: "array", element: parameter, rank: 2 }),
      Object.freeze({ kind: "pointer", pointee: parameter, mutability: "mut" }),
      Object.freeze({
        kind: "function-pointer",
        args: Object.freeze([parameter]),
        result: parameter,
        abi: Object.freeze(["cdecl"]),
      }),
      Object.freeze({ kind: "associated-type", owner: parameter, name: "Item" }),
      Object.freeze({ kind: "opaque", id: "Acme.Opaque" }),
      Object.freeze({ kind: "lifetime", name: "scope" }),
      Object.freeze({ kind: "target-specific", target: "acme", name: "opaque-id", value: parameter }),
    ]),
  });

  const substituted = substituteTargetTypeRef(nested, new Map([["T", stringType]]));
  assert.ok(substituted !== nested);
  assert.equal(substituted.kind, "tuple");
  if (substituted.kind !== "tuple") {
    throw new Error("Expected substituted tuple target type.");
  }
  assert.ok(substituted.elements[0]?.kind === "source-global" && substituted.elements[0].typeArguments?.[0] === stringType);
  assert.ok(substituted.elements[1]?.kind === "target-named" && substituted.elements[1].typeArguments?.[0] === stringType);
  assert.ok(substituted.elements[2]?.kind === "array" && substituted.elements[2].element === stringType);
  assert.ok(substituted.elements[3]?.kind === "pointer" && substituted.elements[3].pointee === stringType);
  assert.ok(substituted.elements[4]?.kind === "function-pointer" && substituted.elements[4].args[0] === stringType && substituted.elements[4].result === stringType);
  assert.ok(substituted.elements[5]?.kind === "associated-type" && substituted.elements[5].owner === stringType);
  assert.ok(substituted.elements[6] === nested.elements[6], "Opaque target types have no substitutable children.");
  assert.ok(substituted.elements[7] === nested.elements[7], "Lifetime target types have no substitutable children.");
  assert.ok(substituted.elements[8] === nested.elements[8], "Target-owned opaque values must never be traversed or rewritten.");
});

test("target type substitution preserves unchanged identity and shared subgraphs", () => {
  const shared = Object.freeze({ kind: "array", element: int32Type } as const satisfies TargetTypeRef);
  const unchanged = Object.freeze({ kind: "tuple", elements: Object.freeze([shared, shared]) } as const satisfies TargetTypeRef);
  assert.ok(substituteTargetTypeRef(unchanged, new Map([["T", stringType]])) === unchanged);

  const parameter = Object.freeze({ kind: "type-parameter", name: "T" } as const satisfies TargetTypeRef);
  const sharedGeneric = Object.freeze({ kind: "array", element: parameter } as const satisfies TargetTypeRef);
  const generic = Object.freeze({ kind: "tuple", elements: Object.freeze([sharedGeneric, sharedGeneric]) } as const satisfies TargetTypeRef);
  const substituted = substituteTargetTypeRef(generic, new Map([["T", stringType]]));
  assert.equal(substituted.kind, "tuple");
  if (substituted.kind !== "tuple") {
    throw new Error("Expected substituted tuple target type.");
  }
  assert.ok(substituted.elements[0] === substituted.elements[1], "Shared input target-type subgraphs must remain shared after substitution.");
  assert.ok(substituted.elements[0] !== sharedGeneric);
});

test("target type substitution rejects cycles and handles deep graphs iteratively", () => {
  const cyclic: { kind: "array"; element: TargetTypeRef } = { kind: "array", element: int32Type };
  cyclic.element = cyclic;
  assert.throws(
    () => substituteTargetTypeRef(cyclic, new Map([["T", stringType]])),
    /cyclic TargetTypeRef/,
  );

  const depth = 20_000;
  let deep: TargetTypeRef = Object.freeze({ kind: "type-parameter", name: "T" });
  for (let index = 0; index < depth; index++) {
    deep = Object.freeze({ kind: "array", element: deep });
  }
  const substituted = substituteTargetTypeRef(deep, new Map([["T", int32Type]]));
  let cursor = substituted;
  for (let index = 0; index < depth; index++) {
    assert.equal(cursor.kind, "array");
    if (cursor.kind !== "array") {
      throw new Error(`Expected array target type at depth ${index}.`);
    }
    cursor = cursor.element;
  }
  assert.ok(cursor === int32Type);
});

test("target parameter substitution preserves metadata and snapshots only changed parameters", () => {
  const typeParameter = Object.freeze({ kind: "type-parameter", name: "T" } as const satisfies TargetTypeRef);
  const parameter = Object.freeze({
    name: "value",
    type: Object.freeze({ kind: "array", element: typeParameter }),
    passingMode: "byref-readonly",
    paramsArray: true,
    optional: true,
  } as const satisfies TargetParameter);

  assert.ok(substituteTargetParameter(parameter, new Map([["U", stringType]])) === parameter);
  const substituted = substituteTargetParameter(parameter, new Map([["T", int32Type]]));
  assert.ok(substituted !== parameter);
  assert.equal(Object.isFrozen(substituted), true);
  assert.equal(substituted.name, "value");
  assert.equal(substituted.passingMode, "byref-readonly");
  assert.equal(substituted.paramsArray, true);
  assert.equal(substituted.optional, true);
  assert.ok(substituted.type.kind === "array" && substituted.type.element === int32Type);
});
