import test from "node:test";
import assert from "node:assert/strict";

import {
  comparePatternKeys,
  getPackageNameFromTypesPackageName,
  getTypesPackageName,
  mangleScopedPackageName,
  parseNodeModuleFromPath,
  parsePackageName,
  tryGetJSExtensionForFile,
  unmangleScopedPackageName,
} from "./util.js";
import { JsxEmit } from "../outputpaths/outputpaths.js";

test("parseNodeModuleFromPath returns package root for simple package", () => {
  assert.strictEqual(
    parseNodeModuleFromPath("/a/node_modules/foo/bar.ts", false),
    "/a/node_modules/foo"
  );
});

test("parseNodeModuleFromPath returns package root for scoped package", () => {
  assert.strictEqual(
    parseNodeModuleFromPath("/a/node_modules/@scope/pkg/bar.ts", false),
    "/a/node_modules/@scope/pkg"
  );
});

test("parseNodeModuleFromPath returns empty when path has no node_modules", () => {
  assert.strictEqual(parseNodeModuleFromPath("/a/something/bar.ts", false), "");
});

test("parseNodeModuleFromPath uses the last occurrence of node_modules", () => {
  assert.strictEqual(
    parseNodeModuleFromPath("/a/node_modules/x/node_modules/y/index.ts", false),
    "/a/node_modules/x/node_modules/y"
  );
});

test("parsePackageName splits simple specifier", () => {
  const r = parsePackageName("foo/bar");
  assert.strictEqual(r[0], "foo");
  assert.strictEqual(r[1], "bar");
});

test("parsePackageName splits scoped specifier", () => {
  const r = parsePackageName("@scope/pkg/sub");
  assert.strictEqual(r[0], "@scope/pkg");
  assert.strictEqual(r[1], "sub");
});

test("parsePackageName returns whole name when no subpath", () => {
  const r = parsePackageName("foo");
  assert.strictEqual(r[0], "foo");
  assert.strictEqual(r[1], "");
});

test("parsePackageName returns scoped package alone when no subpath", () => {
  const r = parsePackageName("@scope/pkg");
  assert.strictEqual(r[0], "@scope/pkg");
  assert.strictEqual(r[1], "");
});

test("mangles scoped name", () => {
  assert.strictEqual(mangleScopedPackageName("@scope/pkg"), "scope__pkg");
});

test("leaves unscoped name unchanged", () => {
  assert.strictEqual(mangleScopedPackageName("foo"), "foo");
});

test("unmangles mangled name", () => {
  assert.strictEqual(unmangleScopedPackageName("scope__pkg"), "@scope/pkg");
});

test("leaves non mangled name unchanged", () => {
  assert.strictEqual(unmangleScopedPackageName("foo"), "foo");
});

test("round trips", () => {
  assert.strictEqual(unmangleScopedPackageName(mangleScopedPackageName("@a/b")), "@a/b");
});

test("wraps unscoped name", () => {
  assert.strictEqual(getTypesPackageName("foo"), "@types/foo");
});

test("wraps scoped name with mangling", () => {
  assert.strictEqual(getTypesPackageName("@scope/pkg"), "@types/scope__pkg");
});

test("unwraps mangled types name", () => {
  assert.strictEqual(getPackageNameFromTypesPackageName("@types/scope__pkg"), "@scope/pkg");
});

test("unwraps unscoped types name", () => {
  assert.strictEqual(getPackageNameFromTypesPackageName("@types/foo"), "foo");
});

test("returns input unchanged when not types", () => {
  assert.strictEqual(getPackageNameFromTypesPackageName("foo"), "foo");
});

test("comparePatternKeys ranks longer prefix higher", () => {
  assert.strictEqual(comparePatternKeys("foo/bar/*", "foo/*"), -1);
  assert.strictEqual(comparePatternKeys("foo/*", "foo/bar/*"), 1);
});

test("comparePatternKeys returns zero for equal patterns", () => {
  assert.strictEqual(comparePatternKeys("foo/*", "foo/*"), 0);
});

test("comparePatternKeys ranks literal below wildcard at same char length", () => {
  assert.strictEqual(comparePatternKeys("foo", "foo*"), 1);
  assert.strictEqual(comparePatternKeys("foo*", "foo"), -1);
});

test("comparePatternKeys ranks literal above wildcard when baselens tie", () => {
  assert.strictEqual(comparePatternKeys("foo", "fo*"), 1);
  assert.strictEqual(comparePatternKeys("fo*", "foo"), -1);
});

test("maps ts to js", () => {
  assert.strictEqual(tryGetJSExtensionForFile("foo.ts", JsxEmit.None), ".js");
});

test("maps dts to js", () => {
  assert.strictEqual(tryGetJSExtensionForFile("foo.d.ts", JsxEmit.None), ".js");
});

test("maps tsx with jsx preserve to jsx", () => {
  assert.strictEqual(tryGetJSExtensionForFile("foo.tsx", JsxEmit.Preserve), ".jsx");
});

test("maps tsx with jsx react to js", () => {
  assert.strictEqual(tryGetJSExtensionForFile("foo.tsx", JsxEmit.React), ".js");
});

test("maps mts to mjs", () => {
  assert.strictEqual(tryGetJSExtensionForFile("foo.mts", JsxEmit.None), ".mjs");
});

test("maps cts to cjs", () => {
  assert.strictEqual(tryGetJSExtensionForFile("foo.cts", JsxEmit.None), ".cjs");
});

test("preserves json extension", () => {
  assert.strictEqual(tryGetJSExtensionForFile("foo.json", JsxEmit.None), ".json");
});

test("returns empty for unsupported extension", () => {
  assert.strictEqual(tryGetJSExtensionForFile("foo.txt", JsxEmit.None), "");
});
