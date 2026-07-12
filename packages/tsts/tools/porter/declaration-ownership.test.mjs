import assert from "node:assert/strict";
import test from "node:test";

import {
  buildDeclarationOwnershipRegistry,
  declarationOwnershipIds,
} from "./sig-check/declaration-ownership.mjs";

test("global declaration ownership is disjoint across every Porter storage mechanism", () => {
  const classIds = new Set(declarationOwnershipIds("go/value.ts", "Value", "class"));
  const functionIds = new Set(declarationOwnershipIds("go/value.ts", "Open", "function"));
  const valid = buildDeclarationOwnershipRegistry([
    { owner: "authored-facade", ids: classIds },
    { owner: "external-package", ids: functionIds },
  ]);
  assert.equal(valid.mismatches.length, 0);
  assert.equal(valid.inventory.length, 3);

  const conflict = buildDeclarationOwnershipRegistry([
    { owner: "authored-facade", ids: classIds },
    { owner: "go-type-storage", ids: new Set([classIds.values().next().value]) },
  ]);
  assert.equal(conflict.mismatches.length, 1);
  assert.equal(conflict.mismatches[0].kind, "duplicate-declaration-ownership");
  assert.match(conflict.mismatches[0].detail, /authored-facade.*go-type-storage/);
});

test("global declaration ownership requires exact identity sets and named owners", () => {
  assert.throws(() => buildDeclarationOwnershipRegistry([{ owner: "", ids: new Set() }]), /non-empty owner/);
  assert.throws(() => buildDeclarationOwnershipRegistry([{ owner: "x", ids: [] }]), /exact Set/);
});
