import assert from "node:assert/strict";
import test from "node:test";

import { compareSignatures } from "./sig-check.mjs";

const variable = (initializer = {}) => ({
  name: "state",
  type: { t: "kw", kw: "number" },
  missing: false,
  declarationKind: "let",
  definite: false,
  modifiers: ["export"],
  ...initializer,
});

test("ordinary variable initializers remain outside the declaration contract", () => {
  const expected = { kind: "value", decls: [variable()] };
  const actual = { kind: "value", decls: [variable({
    initializerStatus: "unsupported",
    valueIssue: "CallExpression is not a constant expression",
  })] };
  assert.deepEqual(compareSignatures(expected, actual, null), []);
});
