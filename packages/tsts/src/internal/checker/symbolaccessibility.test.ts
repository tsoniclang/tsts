import assert from "node:assert/strict";
import { test } from "node:test";
import {
  stKindExports,
  stKindGlobals,
  stKindLocals,
  stKindMask,
  stKindMembers,
  stKindResolvedExports,
  symbolTableIDFromGlobals,
} from "./symbolaccessibility.js";

test("symbol table IDs preserve the pinned Go uint64 kind values", () => {
  assert.equal(stKindLocals, 0n);
  assert.equal(stKindExports, 1n << 61n);
  assert.equal(stKindMembers, 2n << 61n);
  assert.equal(stKindGlobals, 3n << 61n);
  assert.equal(stKindResolvedExports, 4n << 61n);
  assert.equal(stKindMask, 4n << 61n);
  assert.equal(symbolTableIDFromGlobals(), stKindGlobals);
  assert.equal(new Set([stKindLocals, stKindExports, stKindMembers, stKindGlobals, stKindResolvedExports]).size, 5);
});

test("symbol table source IDs retain low bits without collapsing kind bits", () => {
  const sourceID = 17n;
  assert.notEqual(stKindExports | sourceID, stKindMembers | sourceID);
  assert.notEqual(stKindMembers | sourceID, stKindGlobals | sourceID);
  assert.notEqual(stKindGlobals | sourceID, stKindResolvedExports | sourceID);
  assert.equal((stKindResolvedExports | sourceID) & stKindMask, stKindResolvedExports);
});
