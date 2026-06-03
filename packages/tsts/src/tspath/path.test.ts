import test from "node:test";
import assert from "node:assert/strict";

import {
  changeExtension,
  changeFullExtension,
  combinePaths,
  containsIgnoredPath,
  ensureTrailingDirectorySeparator,
  extensionIsTs,
  fileExtensionIs,
  getAnyExtensionFromPath,
  getBaseFileName,
  getDeclarationEmitExtensionForPath,
  getDeclarationFileExtension,
  getDirectoryPath,
  getNormalizedAbsolutePath,
  getRootLength,
  hasExtension,
  hasTrailingDirectorySeparator,
  isDeclarationFileName,
  isRootedDiskPath,
  isUrl,
  normalizePath,
  normalizeSlashes,
  pathIsAbsolute,
  pathIsRelative,
  removeFileExtension,
  removeTrailingDirectorySeparator,
  toPath,
} from "./index.js";

test("normalizes backslashes to forward slashes", () => {
  assert.strictEqual(normalizeSlashes("a"), "a");
  assert.strictEqual(normalizeSlashes("a/b"), "a/b");
  assert.strictEqual(normalizeSlashes("a\\b"), "a/b");
  assert.strictEqual(normalizeSlashes("\\\\server\\path"), "//server/path");
});

test("getRootLength handles posix and relative paths", () => {
  assert.strictEqual(getRootLength("a"), 0);
  assert.strictEqual(getRootLength("/"), 1);
  assert.strictEqual(getRootLength("/path"), 1);
});

test("getRootLength handles dos paths", () => {
  assert.strictEqual(getRootLength("c:"), 2);
  assert.strictEqual(getRootLength("c:d"), 0);
  assert.strictEqual(getRootLength("c:/"), 3);
  assert.strictEqual(getRootLength("c:\\"), 3);
});

test("getRootLength handles unc paths", () => {
  assert.strictEqual(getRootLength("//server"), 8);
  assert.strictEqual(getRootLength("//server/share"), 9);
  assert.strictEqual(getRootLength("\\\\server"), 8);
  assert.strictEqual(getRootLength("\\\\server\\share"), 9);
});

test("getRootLength handles file urls", () => {
  assert.strictEqual(getRootLength("file:///"), 8);
  assert.strictEqual(getRootLength("file:///path"), 8);
  assert.strictEqual(getRootLength("file:///c:"), 10);
  assert.strictEqual(getRootLength("file:///c:d"), 8);
  assert.strictEqual(getRootLength("file:///c:/path"), 11);
});

test("getRootLength handles http urls", () => {
  assert.strictEqual(getRootLength("http://server"), 13);
  assert.strictEqual(getRootLength("http://server/path"), 14);
});

test("pathIsAbsolute returns true for absolute paths", () => {
  assert.ok(pathIsAbsolute("/path/to/file.ext"));
  assert.ok(pathIsAbsolute("c:/path/to/file.ext"));
  assert.ok(pathIsAbsolute("file:///path/to/file.ext"));
});

test("pathIsAbsolute returns false for relative paths", () => {
  assert.ok(!pathIsAbsolute("path/to/file.ext"));
  assert.ok(!pathIsAbsolute("./path/to/file.ext"));
});

test("isUrl returns false for non url paths", () => {
  assert.ok(!isUrl("a"));
  assert.ok(!isUrl("/"));
  assert.ok(!isUrl("c:"));
  assert.ok(!isUrl("//server"));
});

test("isUrl returns true for url paths", () => {
  assert.ok(isUrl("file:///path"));
  assert.ok(isUrl("http://server"));
  assert.ok(isUrl("file:///c:/path"));
});

test("isRootedDiskPath returns true for rooted disk paths only", () => {
  assert.ok(isRootedDiskPath("/path"));
  assert.ok(isRootedDiskPath("c:/path"));
  assert.ok(!isRootedDiskPath("file:///path"));
  assert.ok(!isRootedDiskPath("path"));
});

test("hasTrailingDirectorySeparator detects trailing separators", () => {
  assert.ok(hasTrailingDirectorySeparator("/"));
  assert.ok(hasTrailingDirectorySeparator("/path/"));
  assert.ok(!hasTrailingDirectorySeparator("/path"));
  assert.ok(!hasTrailingDirectorySeparator(""));
});

test("combinePaths combines non absolute paths", () => {
  assert.strictEqual(combinePaths("path", "to", "file.ext"), "path/to/file.ext");
});

test("combinePaths does not simplify dot segments", () => {
  assert.strictEqual(
    combinePaths("path", "dir", "..", "to", "file.ext"),
    "path/dir/../to/file.ext"
  );
});

test("combinePaths resets on absolute trailing path", () => {
  assert.strictEqual(combinePaths("/path", "to", "file.ext"), "/path/to/file.ext");
  assert.strictEqual(combinePaths("/path", "/to", "file.ext"), "/to/file.ext");
});

test("combinePaths resets on dos absolute trailing path", () => {
  assert.strictEqual(combinePaths("c:/path", "to", "file.ext"), "c:/path/to/file.ext");
  assert.strictEqual(combinePaths("c:/path", "c:/to", "file.ext"), "c:/to/file.ext");
});

test("normalizePath collapses dot segments", () => {
  assert.strictEqual(normalizePath("/path/./to/file.ext"), "/path/to/file.ext");
  assert.strictEqual(normalizePath("/path/../to/file.ext"), "/to/file.ext");
});

test("normalizePath converts backslashes", () => {
  assert.strictEqual(normalizePath("c:\\path\\to\\file.ext"), "c:/path/to/file.ext");
});

test("getDirectoryPath returns directory part", () => {
  assert.strictEqual(getDirectoryPath("/path/to/file.ext"), "/path/to");
  assert.strictEqual(getDirectoryPath("file.ext"), "");
});

test("getBaseFileName returns base filename", () => {
  assert.strictEqual(getBaseFileName("/path/to/file.ext"), "file.ext");
  assert.strictEqual(getBaseFileName("file.ext"), "file.ext");
  assert.strictEqual(getBaseFileName("/path/to/"), "to");
});

test("removeTrailingDirectorySeparator removes trailing", () => {
  assert.strictEqual(removeTrailingDirectorySeparator("/path/"), "/path");
  assert.strictEqual(removeTrailingDirectorySeparator("/path"), "/path");
});

test("ensureTrailingDirectorySeparator ensures trailing", () => {
  assert.strictEqual(ensureTrailingDirectorySeparator("/path"), "/path/");
  assert.strictEqual(ensureTrailingDirectorySeparator("/path/"), "/path/");
});

test("pathIsRelative detects relative paths", () => {
  assert.ok(pathIsRelative("./foo"));
  assert.ok(pathIsRelative("../foo"));
  assert.ok(!pathIsRelative("foo"));
  assert.ok(!pathIsRelative("/foo"));
  assert.ok(!pathIsRelative("c:/foo"));
});

test("fileExtensionIs", () => {
  assert.ok(fileExtensionIs("foo.ts", ".ts"));
  assert.ok(!fileExtensionIs("foo.tsx", ".ts"));
  assert.ok(fileExtensionIs("foo.d.ts", ".d.ts"));
});

test("hasExtension", () => {
  assert.ok(hasExtension("foo.ts"));
  assert.ok(!hasExtension("foo"));
});

test("extensionIsTs", () => {
  assert.ok(extensionIsTs(".ts"));
  assert.ok(extensionIsTs(".tsx"));
  assert.ok(extensionIsTs(".d.ts"));
  assert.ok(!extensionIsTs(".js"));
});

test("removeFileExtension", () => {
  assert.strictEqual(removeFileExtension("foo.ts"), "foo");
  assert.strictEqual(removeFileExtension("foo.d.ts"), "foo");
  assert.strictEqual(removeFileExtension("foo"), "foo");
});

test("changeExtension", () => {
  assert.strictEqual(changeExtension("foo.ts", ".js"), "foo.js");
  assert.strictEqual(changeExtension("foo.d.ts", ".js"), "foo.js");
});

test("changeFullExtension", () => {
  assert.strictEqual(changeFullExtension("foo.d.ts", ".js"), "foo.js");
});

test("getDeclarationFileExtension", () => {
  assert.strictEqual(getDeclarationFileExtension("foo.d.ts"), ".d.ts");
  assert.strictEqual(getDeclarationFileExtension("foo.d.mts"), ".d.mts");
  assert.strictEqual(getDeclarationFileExtension("foo.ts"), "");
});

test("getDeclarationEmitExtensionForPath", () => {
  assert.strictEqual(getDeclarationEmitExtensionForPath("foo.ts"), ".d.ts");
  assert.strictEqual(getDeclarationEmitExtensionForPath("foo.mts"), ".d.mts");
  assert.strictEqual(getDeclarationEmitExtensionForPath("foo.cts"), ".d.cts");
});

test("isDeclarationFileName", () => {
  assert.ok(isDeclarationFileName("foo.d.ts"));
  assert.ok(!isDeclarationFileName("foo.ts"));
});

test("containsIgnoredPath catches common patterns", () => {
  assert.ok(containsIgnoredPath("/project/node_modules/.bin/foo"));
  assert.ok(containsIgnoredPath("/project/.git/config"));
  assert.ok(containsIgnoredPath("/project/.#lock"));
  assert.ok(!containsIgnoredPath("/project/src/foo.ts"));
});

test("toPath normalizes case based on flag", () => {
  assert.strictEqual(toPath("Foo.ts", "/base", true), "/base/Foo.ts");
  assert.strictEqual(toPath("Foo.ts", "/base", false), "/base/foo.ts");
});

test("toPath absolute paths stay absolute", () => {
  assert.strictEqual(toPath("/abs/path", "/base", true), "/abs/path");
});

test("getNormalizedAbsolutePath resolves relative to current directory", () => {
  assert.strictEqual(getNormalizedAbsolutePath("./foo", "/base"), "/base/foo");
  assert.strictEqual(getNormalizedAbsolutePath("../foo", "/base"), "/foo");
  assert.strictEqual(getNormalizedAbsolutePath("/abs/path", "/base"), "/abs/path");
});

test("getAnyExtensionFromPath returns extension when matching provided list", () => {
  assert.strictEqual(getAnyExtensionFromPath("foo.ts", [".ts"], false), ".ts");
  assert.strictEqual(getAnyExtensionFromPath("foo.ts", [".js"], false), "");
});

test("getAnyExtensionFromPath falls back to last index of when no list provided", () => {
  assert.strictEqual(getAnyExtensionFromPath("foo.ts", undefined, false), ".ts");
  assert.strictEqual(getAnyExtensionFromPath("foo.d.ts", undefined, false), ".ts");
});
