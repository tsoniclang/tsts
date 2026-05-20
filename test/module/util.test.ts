import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import {
  comparePatternKeys,
  getPackageNameFromTypesPackageName,
  getTypesPackageName,
  mangleScopedPackageName,
  parseNodeModuleFromPath,
  parsePackageName,
  tryGetJSExtensionForFile,
  unmangleScopedPackageName,
} from "../../src/module/util.js";
import { JsxEmit } from "../../src/outputpaths/outputpaths.js";

describe("module/util — parseNodeModuleFromPath", () => {
  it("returns package root for simple package", () => {
    assert.equal(
      parseNodeModuleFromPath("/a/node_modules/foo/bar.ts", false),
      "/a/node_modules/foo"
    );
  });

  it("returns package root for scoped package", () => {
    assert.equal(
      parseNodeModuleFromPath("/a/node_modules/@scope/pkg/bar.ts", false),
      "/a/node_modules/@scope/pkg"
    );
  });

  it("returns empty when path has no node_modules", () => {
    assert.equal(parseNodeModuleFromPath("/a/something/bar.ts", false), "");
  });

  it("uses the last occurrence of node_modules", () => {
    assert.equal(
      parseNodeModuleFromPath("/a/node_modules/x/node_modules/y/index.ts", false),
      "/a/node_modules/x/node_modules/y"
    );
  });
});

describe("module/util — parsePackageName", () => {
  it("splits simple specifier", () => {
    assert.deepEqual(parsePackageName("foo/bar"), ["foo", "bar"]);
  });

  it("splits scoped specifier", () => {
    assert.deepEqual(parsePackageName("@scope/pkg/sub"), ["@scope/pkg", "sub"]);
  });

  it("returns whole name when no subpath", () => {
    assert.deepEqual(parsePackageName("foo"), ["foo", ""]);
  });

  it("returns scoped package alone when no subpath", () => {
    assert.deepEqual(parsePackageName("@scope/pkg"), ["@scope/pkg", ""]);
  });
});

describe("module/util — mangle/unmangle scoped package name", () => {
  it("mangles scoped name", () => {
    assert.equal(mangleScopedPackageName("@scope/pkg"), "scope__pkg");
  });

  it("leaves unscoped name unchanged", () => {
    assert.equal(mangleScopedPackageName("foo"), "foo");
  });

  it("unmangles mangled name", () => {
    assert.equal(unmangleScopedPackageName("scope__pkg"), "@scope/pkg");
  });

  it("leaves non-mangled name unchanged", () => {
    assert.equal(unmangleScopedPackageName("foo"), "foo");
  });

  it("round-trips", () => {
    assert.equal(unmangleScopedPackageName(mangleScopedPackageName("@a/b")), "@a/b");
  });
});

describe("module/util — types package name", () => {
  it("wraps unscoped name", () => {
    assert.equal(getTypesPackageName("foo"), "@types/foo");
  });

  it("wraps scoped name with mangling", () => {
    assert.equal(getTypesPackageName("@scope/pkg"), "@types/scope__pkg");
  });

  it("unwraps mangled types name", () => {
    assert.equal(getPackageNameFromTypesPackageName("@types/scope__pkg"), "@scope/pkg");
  });

  it("unwraps unscoped types name", () => {
    assert.equal(getPackageNameFromTypesPackageName("@types/foo"), "foo");
  });

  it("returns input unchanged when not @types/", () => {
    assert.equal(getPackageNameFromTypesPackageName("foo"), "foo");
  });
});

describe("module/util — comparePatternKeys", () => {
  it("ranks longer prefix higher (more specific)", () => {
    assert.equal(comparePatternKeys("foo/bar/*", "foo/*"), -1);
    assert.equal(comparePatternKeys("foo/*", "foo/bar/*"), 1);
  });

  it("returns 0 for equal patterns", () => {
    assert.equal(comparePatternKeys("foo/*", "foo/*"), 0);
  });

  it("ranks literal below wildcard pattern at same character length", () => {
    // TS-Go semantics: a literal pattern's baseLen = len(s), a wildcard's
    // baseLen = indexOf('*')+1. So "foo*" (baseLen 4) is considered more
    // specific than "foo" (baseLen 3) by this comparator.
    assert.equal(comparePatternKeys("foo", "foo*"), 1);
    assert.equal(comparePatternKeys("foo*", "foo"), -1);
  });

  it("ranks literal above wildcard when baseLens tie", () => {
    // "foo" baseLen 3 vs "fo*" baseLen 3 → literal (no aIdx) wins via the
    // aPatternIndex == -1 branch returning 1 (meaning a comes after… wait,
    // see comparator: aPatternIndex == -1 returns 1 (b before a). So
    // comparePatternKeys(literal, wildcard) at same baseLen returns 1.
    assert.equal(comparePatternKeys("foo", "fo*"), 1);
    assert.equal(comparePatternKeys("fo*", "foo"), -1);
  });
});

describe("module/util — tryGetJSExtensionForFile", () => {
  it("maps .ts to .js", () => {
    assert.equal(tryGetJSExtensionForFile("foo.ts", JsxEmit.None), ".js");
  });

  it("maps .d.ts to .js", () => {
    assert.equal(tryGetJSExtensionForFile("foo.d.ts", JsxEmit.None), ".js");
  });

  it("maps .tsx with jsx=preserve to .jsx", () => {
    assert.equal(tryGetJSExtensionForFile("foo.tsx", JsxEmit.Preserve), ".jsx");
  });

  it("maps .tsx with jsx=react to .js", () => {
    assert.equal(tryGetJSExtensionForFile("foo.tsx", JsxEmit.React), ".js");
  });

  it("maps .mts to .mjs", () => {
    assert.equal(tryGetJSExtensionForFile("foo.mts", JsxEmit.None), ".mjs");
  });

  it("maps .cts to .cjs", () => {
    assert.equal(tryGetJSExtensionForFile("foo.cts", JsxEmit.None), ".cjs");
  });

  it("preserves .json extension", () => {
    assert.equal(tryGetJSExtensionForFile("foo.json", JsxEmit.None), ".json");
  });

  it("returns empty for unsupported extension", () => {
    assert.equal(tryGetJSExtensionForFile("foo.txt", JsxEmit.None), "");
  });
});
