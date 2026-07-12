import assert from "node:assert/strict";
import test from "node:test";

import { loadConventions } from "./conventions.mjs";
import { loadProfile } from "./profile.mjs";

test("signature profile uses one exact recursively validated contract", () => {
  const profile = loadProfile({});
  assert.equal(profile.bridge.pointer, "GoPtr");
  assert.equal(profile.bridge.nilable, "GoNilable");

  for (const signatureCheck of [
    { parser: null },
    { parser: { freshnessSrcDirs: ["one", "one"] } },
    { allowedGlobals: ["Date", "Date"] },
    { facadeTemplate: "packages/no-placeholder.ts" },
    { facadeTemplate: "packages/{importPath}/{importPath}.ts" },
    { facadeTemplate: "packages/{importPath}/{unknown}.ts" },
    { canonicalTypeAliases: { Short: "also-short" } },
    { namedTypeMappings: { Short: "m.ts::Type" } },
    { namedTypeMappings: { "pkg::type::Type": "short" } },
    { namedTypeMappings: {
      "one.example::type::Type": "src/native.ts::HostType",
      "two.example::type::Type": "src/native.ts::HostType",
    } },
    { externalFunctionReturns: { "pkg.F": { module: "m.ts", name: "F", extra: true } } },
    { externalInterfaceMembers: { "pkg.I": [{ name: "M", type: { t: "fn", params: [], ret: { t: "kw", kw: "void" } } }] } },
  ]) assert.throws(() => loadProfile({ signatureCheck }));

  assert.throws(() => loadProfile({ signatureCheck: { stdlibTypes: {} } }), /unknown current-contract key/);
  assert.throws(() => loadProfile({ signatureCheck: { namedTypeMappings: {} } }), /unknown current-contract key/);
});

test("conventions expose only the exact GoConstraint carrier", () => {
  const base = { goConstraintId: "m.ts::Constraint" };
  assert.throws(() => loadConventions({ ...base, unknown: true }), /unknown current-contract key/);
  assert.throws(() => loadConventions({ ...base, equivalences: [] }), /unknown current-contract key/);
  assert.deepEqual(loadConventions(base), base);
});
