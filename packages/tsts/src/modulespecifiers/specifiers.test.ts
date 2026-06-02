import test from "node:test";
import assert from "node:assert/strict";

import { containsNodeModules, type ResolvedModule } from "./specifiers.js";
import { tryGetRealFileNameForNonJSDeclarationFileName } from "./util.js";

// `getEachFileNameOfModule` / `tryGetModuleNameFromExportsOrImports` tests
// require the full host surface (symlink cache, package-json info, etc.) and
// the upstream tspath helpers. Those land with the corresponding TSTS
// subsystems; this file tests the parts that are self-contained.

test("contains node modules returns true for node modules paths", () => {
  assert.ok(containsNodeModules("/project/node_modules/lodash/index.js"));
});

test("contains node modules returns false for non node modules paths", () => {
  assert.ok(!containsNodeModules("/project/src/utils.ts"));
});

test("contains node modules handles node modules in middle", () => {
  assert.ok(containsNodeModules("/project/packages/node_modules/pkg/file.js"));
});

test("contains node modules handles empty path", () => {
  assert.ok(!containsNodeModules(""));
});

// Faithful port of TS-Go `getBaseFileName` / `removeExtension` for the
// test's purposes. The full implementations live in `tspath`; here we
// supply the minimal logic needed.
function getBaseFileName(p: string): string {
  const slash = p.lastIndexOf("/");
  return slash === -1 ? p : p.slice(slash + 1);
}

function removeExtension(p: string, ext: string): string {
  return p.endsWith(ext) ? p.slice(0, p.length - ext.length) : p;
}

test("json declaration file returns underlying asset", () => {
  assert.strictEqual(
    tryGetRealFileNameForNonJSDeclarationFileName("/project/foo.d.json.ts", getBaseFileName, removeExtension),
    "/project/foo.json",
  );
});

test("multi dot source extension declaration file returns full basename", () => {
  assert.strictEqual(
    tryGetRealFileNameForNonJSDeclarationFileName("/project/foo.module.d.css.ts", getBaseFileName, removeExtension),
    "/project/foo.module.css",
  );
});

test("plain dts file returns empty string", () => {
  assert.strictEqual(
    tryGetRealFileNameForNonJSDeclarationFileName("/project/foo.d.ts", getBaseFileName, removeExtension),
    "",
  );
});

// Ensure the type is exercised so the forward-declared module-resolution
// surface compiles even without the full module port.
function _typeCheck_ResolvedModule(m: ResolvedModule): boolean {
  return m.isResolved();
}
void _typeCheck_ResolvedModule;
