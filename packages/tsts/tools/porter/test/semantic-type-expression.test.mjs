import assert from "node:assert/strict";
import test from "node:test";

import { validateTypeExpression } from "../core/snapshot.mjs";
import { identType } from "./helpers.mjs";

test("syntax TypeExpr kinds have exact required payloads and no fail-open positions", () => {
  const ident = identType("T");
  const parameter = { names: ["value"], type: ident };
  const member = { kind: "field", name: "Value", exported: true, type: "T", typeExpr: ident };
  const expressions = [
    ident,
    { kind: "selector", text: "pkg.T", package: "pkg", name: "T" },
    { kind: "pointer", text: "*T", element: ident },
    { kind: "slice", text: "[]T", element: ident },
    { kind: "array", text: "[2*N]T", length: "2*N", element: ident },
    { kind: "map", text: "map[string]T", key: identType("string"), value: ident },
    { kind: "func", text: "func(value T) T", parameters: [parameter], results: [{ type: ident }] },
    { kind: "interface", text: "interface{}", members: [] },
    { kind: "struct", text: "struct{ Value T }", members: [member] },
    { kind: "ellipsis", text: "...T", element: ident },
    { kind: "instantiation", text: "Box[T]", element: identType("Box"), typeArgs: [ident] },
    { kind: "paren", text: "(T)", element: ident },
    { kind: "channel", text: "<-chan T", direction: "receive", element: ident },
    { kind: "unary", text: "~T", op: "~", element: ident },
    { kind: "binary", text: "T | U", op: "|", left: ident, right: identType("U") },
  ];
  for (const expression of expressions) {
    const issues = [];
    validateTypeExpression(expression, "type", issues, { required: true });
    assert.deepEqual(issues, [], expression.kind);
  }

  const mutations = [
    [undefined, /is required/],
    [null, /is required/],
    [{ kind: "future", text: "T" }, /unknown/],
    [{ kind: "pointer", text: "*T", element: null }, /element is required/],
    [{ kind: "array", text: "[]T", length: "", element: ident }, /length must be non-empty/],
    [{ kind: "map", text: "map[T]T", key: ident, value: null }, /value is required/],
    [{ kind: "channel", text: "chan T", direction: "both", element: ident }, /direction is invalid/],
    [{ kind: "func", text: "func(T)", parameters: [{ type: null }], results: [] }, /type is required/],
    [{ kind: "struct", text: "struct{}", members: null }, /members must be an array/],
    [{ kind: "instantiation", text: "Box", element: identType("Box"), typeArgs: [] }, /typeArgs must be a non-empty/],
    [{ kind: "unary", text: "~T", op: "", element: ident }, /op must be a non-empty/],
    [{ kind: "binary", text: "T&U", op: "&", left: ident, right: identType("U") }, /op must be '\|'/],
    [{ kind: "binary", text: "T|U", op: "|", left: null, right: ident }, /left is required/],
    [{ kind: "ident", text: "Wrong", name: "T" }, /text must equal identifier name/],
    [{ kind: "func", text: "func(...T, T)", parameters: [{ variadic: true, type: ident }, { type: ident }], results: [] }, /only valid on the final/],
    [{ ...ident, unexpected: true }, /keys must be exactly/],
  ];
  for (const [expression, pattern] of mutations) {
    const issues = [];
    validateTypeExpression(expression, "type", issues, { required: true });
    assert.ok(issues.some((issue) => pattern.test(issue)), `${JSON.stringify(expression)}: ${issues.join("; ")}`);
  }
});
