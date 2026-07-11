import { test } from "node:test";
import assert from "node:assert/strict";
import { buildIndexedModuleValueEnvironments } from "./extract-signatures.mjs";
import { parserWithCount } from "./module-index-test-helpers.mjs";
import { indexTypeScriptModuleSources, loadTypeScriptModuleIndex } from "./module-index.mjs";
import { createCanonicalTypeResolver } from "./module-resolution.mjs";
import { resolveModuleId } from "./source-structure.mjs";

test("module paths and unsupported syntax fail closed", async (t) => {
  const counted = await parserWithCount(t);
  if (!counted) return;
  assert.equal(resolveModuleId("graphics.js", "pkg/use.ts"), "graphics.js");
  assert.equal(resolveModuleId(".hidden.js", "pkg/use.ts"), ".hidden.js");
  for (const specifier of ["pkg/../escape.js", "pkg/./value.js", "pkg//value.js", "bare.js?query"]) {
    assert.throws(() => resolveModuleId(specifier, "pkg/use.ts"), /noncanonical bare module specifier/);
  }
  assert.equal(resolveModuleId("../shared.js", "pkg/sub/use.ts"), "pkg/shared.ts");
  assert.throws(() => resolveModuleId("../../outside.js", "pkg/use.ts"), /underflows/);
  assert.throws(() => resolveModuleId("./data.json", "pkg/use.ts"), /must end in .js or .ts/);
  for (const moduleId of ["/pkg/use.ts", "./pkg/use.ts", "pkg/../use.ts", "pkg\\use.ts", "pkg/use.js"]) {
    assert.throws(
      () => indexTypeScriptModuleSources(counted.api, new Map([[moduleId, "export interface T {}"]])),
      /invalid TypeScript source module id/,
      moduleId,
    );
  }
  assert.throws(
    () => loadTypeScriptModuleIndex(counted.api, "/repo", "../outside"),
    /exact repo-relative path/,
  );
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([["pkg/use.ts", 'export { T } from "./missing.js";']])),
    /resolves to missing/,
  );
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([
      ["pkg/empty.ts", "export interface Present {}"],
      ["pkg/missing-export.ts", 'export { Missing } from "./empty.js";'],
    ])),
    /does not resolve in its declared namespace/,
  );
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([
      ["pkg/private.ts", "interface Hidden {} export interface Public {}"],
      ["pkg/private-use.ts", 'import type { Hidden } from "./private.js"; export type T = Hidden;'],
    ])),
    /references missing export 'pkg\/private.ts::Hidden'/,
  );
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([
      ["pkg/cycle-a.ts", 'export * from "./cycle-b.js";'],
      ["pkg/cycle-b.ts", 'export * from "./cycle-a.js";'],
      ["pkg/cycle-use.ts", 'import { Missing } from "./cycle-a.js"; export const value = Missing;'],
    ])),
    /references missing export 'pkg\/cycle-a.ts::Missing'/,
  );
  const destructuredIndex = indexTypeScriptModuleSources(counted.api, new Map([
    ["pkg/binding.ts", "const source = { value: 1 }; const { value } = source; export const good: number = 2;"],
  ]));
  assert.deepEqual(buildIndexedModuleValueEnvironments(counted.api, destructuredIndex).get("pkg/binding.ts").get("good"), { kind: "number", value: 2 });
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([["pkg/export.ts", "export { missing }; "]])),
    /references unknown local/,
  );
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([["pkg/import-equals.ts", 'import value = require("pkg");']])),
    /CommonJS import-equals/,
  );
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([["pkg/export-equals.ts", "const value = 1; export = value;"]])),
    /CommonJS export assignment/,
  );
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([["pkg/global.ts", "export as namespace Global;"]])),
    /global namespace export declarations/,
  );
  assert.throws(
    () => indexTypeScriptModuleSources(counted.api, new Map([["pkg/string-export.ts", 'const value = 1; export { value as "not-an-identifier" };']])),
    /string-named bindings are not representable/,
  );
  const external = indexTypeScriptModuleSources(counted.api, new Map([
    ["pkg/external.ts", 'export { T } from "graphics.js";'],
  ]));
  assert.ok(external.externalModules.has("graphics.js"));
  const canonicalize = createCanonicalTypeResolver({
    namedReexport: external.namedReexport,
    starReexport: external.starReexport,
    definedTypes: external.definedTypes,
    exportedTypes: external.exportedTypes,
    knownModules: new Set(external.modules.keys()),
    externalModules: external.externalModules,
    typeNamespaceReexport: external.typeNamespaceReexport,
  });
  assert.equal(canonicalize("pkg/external.ts::T"), "graphics.js::T");
});

test("canonical duplicate types require exact full identities", async (t) => {
  const counted = await parserWithCount(t);
  if (!counted) return;
  const index = indexTypeScriptModuleSources(counted.api, new Map([
    ["exact/a.ts", "export interface Shared {}"],
    ["exact/b.ts", "export interface Shared {}"],
    ["exact/unrelated.ts", "export interface Shared {}"],
  ]));
  const options = {
    namedReexport: index.namedReexport,
    starReexport: index.starReexport,
    definedTypes: index.definedTypes,
    exportedTypes: index.exportedTypes,
    knownModules: new Set(index.modules.keys()),
    externalModules: index.externalModules,
    canonicalTypeAliases: { "exact/a.ts::Shared": "exact/b.ts::Shared" },
  };
  const resolve = createCanonicalTypeResolver(options);
  assert.equal(resolve("exact/a.ts::Shared"), "exact/b.ts::Shared");
  assert.equal(resolve("exact/unrelated.ts::Shared"), "exact/unrelated.ts::Shared");
  assert.throws(
    () => createCanonicalTypeResolver({ ...options, canonicalTypeAliases: { "missing.ts::Shared": "exact/b.ts::Shared" } }),
    /source 'missing\.ts::Shared' is not an indexed type declaration/,
  );
});
