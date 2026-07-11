import assert from "node:assert/strict";
import test from "node:test";

import { loadConventions } from "./conventions.mjs";
import { loadProfile } from "./profile.mjs";

test("signature profile uses one exact recursively validated contract", () => {
  const profile = loadProfile({});
  assert.equal(profile.stdlibTypes["iter::type::Seq"], "packages/tsts/src/go/compat.ts::GoSeq");
  assert.equal(profile.bridge.pointer, "GoPtr");
  assert.equal(profile.bridge.nilable, "GoNilable");

  for (const signatureCheck of [
    { parser: null },
    { parser: { freshnessSrcDirs: ["one", "one"] } },
    { allowedGlobals: ["Date", "Date"] },
    { facadeTemplate: "packages/no-placeholder.ts" },
    { canonicalTypeAliases: { Short: "also-short" } },
    { namedTypeMappings: { Short: "m.ts::Type" } },
    { namedTypeMappings: { "pkg::type::Type": "short" } },
    { externalFunctionReturns: { "pkg.F": { module: "m.ts", name: "F", extra: true } } },
    { externalInterfaceMembers: { "pkg.I": [{ name: "M", type: { t: "fn", params: [], ret: { t: "kw", kw: "void" } } }] } },
  ]) assert.throws(() => loadProfile({ signatureCheck }));

  assert.deepEqual(loadProfile({ signatureCheck: {
    namedTypeMappings: { "example.com/native::type::Type": "src/native.ts::HostType" },
  } }).namedTypeMappings["example.com/native::type::Type"], "src/native.ts::HostType");
});

test("convention rules require explicit scope and exact fields", () => {
  const base = { goConstraintId: "m.ts::Constraint" };
  assert.throws(() => loadConventions({ ...base, unknown: true }), /unknown current-contract key/);
  assert.throws(() => loadConventions({ ...base, equivalences: [{ as: "same", match: [{ id: "a.ts::A" }, { id: "b.ts::B" }] }] }),
    /missing current-contract key.*scope/);
  assert.doesNotThrow(() => loadConventions({ ...base, equivalences: [{
    as: "same", scope: "type", match: [{ id: "a.ts::A" }, { id: "b.ts::B" }],
  }] }));
});
