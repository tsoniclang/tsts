import assert from "node:assert/strict";
import test from "node:test";
import type { Node } from "../internal/ast/ast.js";
import {
  argumentPassingFactKey,
  attributeFactKey,
  defaultValueFactKey,
  fieldFactKey,
  functionPointerFactKey,
  pointerFactKey,
} from "./facts.js";

test("authored source fact payloads reject arbitrary identity objects", () => {
  const invalidNode = {} as Node;
  const cases: readonly (() => unknown)[] = [
    () => argumentPassingFactKey.snapshot({
      mode: "by-value",
      targetExpression: invalidNode,
    }),
    () => attributeFactKey.snapshot({
      target: invalidNode,
      attributeName: "Example",
      arguments: [],
    }),
    () => defaultValueFactKey.snapshot({ type: invalidNode }),
    () => fieldFactKey.snapshot({ name: "value", type: invalidNode }),
    () => functionPointerFactKey.snapshot({
      parameters: [invalidNode],
      result: invalidNode,
      abi: [],
    }),
    () => pointerFactKey.snapshot({
      pointee: invalidNode,
      mutability: "target-defined",
      unsafeRequired: true,
    }),
  ];

  for (const snapshot of cases) {
    assert.throws(snapshot, /must be a compiler source node/);
  }
});
