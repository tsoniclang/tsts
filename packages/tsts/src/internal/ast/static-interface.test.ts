import assert from "node:assert/strict";
import test from "node:test";

import { createIdentifierData } from "./generated/data.js";

test("generated AST interface methods are static non-enumerable prototype methods", () => {
  const identifier = createIdentifierData();
  const prototype = Object.getPrototypeOf(identifier) as object;

  assert.equal(identifier.__tsgoGoReceiver(), identifier);
  assert.equal(Object.prototype.propertyIsEnumerable.call(prototype, "AsNode"), false);
  assert.equal(Object.keys(identifier).includes("AsNode"), false);
  assert.equal(Object.keys(identifier).includes("__tsgoGoReceiver"), false);
});
