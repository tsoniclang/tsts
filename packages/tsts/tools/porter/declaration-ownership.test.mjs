import assert from "node:assert/strict";
import test from "node:test";

import {
  buildDeclarationOwnershipRegistry,
  declarationOwnershipIds,
} from "./sig-check/declaration-ownership.mjs";
import { finalizeGeneratedDeclarationOwners } from "./core/generated-declaration-owner-catalog.mjs";

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

test("generated declaration ownership is immutable and bound to exact Porter evidence", () => {
  const config = {};
  const snapshot = {};
  const row = {
    generator: "porter:test",
    moduleId: "src/generated.ts",
    objectId: "example.test/pkg::type::Value",
    tsName: "Value",
    unitId: "example.test::pkg/value.go::type::Value",
  };
  const catalog = finalizeGeneratedDeclarationOwners(config, snapshot, [row]);
  row.tsName = "Changed";
  assert.equal(catalog.get(row.objectId).tsName, "Value");
  assert.throws(() => { catalog.get(row.objectId).tsName = "Changed"; }, /read only|Cannot assign/);
  assert.throws(() => catalog.require({}, snapshot), /different config or snapshot/);
  assert.throws(() => finalizeGeneratedDeclarationOwners(config, snapshot, [row, row]), /more than one finalized owner/);
  assert.throws(
    () => finalizeGeneratedDeclarationOwners(config, snapshot, [{ ...row, legacyPath: "src/legacy.ts" }]),
    /keys must be exactly/,
  );
});
