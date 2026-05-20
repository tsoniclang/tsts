/**
 * Tests for tspath module.
 *
 * Subset ported from TS-Go internal/tspath/path_test.go. As more functions
 * are ported, more tests come in.
 */

import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import {
  changeAnyExtension,
  changeExtension,
  changeFullExtension,
  combinePaths,
  containsIgnoredPath,
  ensureTrailingDirectorySeparator,
  extensionIsTs,
  fileExtensionIs,
  fileExtensionIsOneOf,
  getAnyExtensionFromPath,
  getBaseFileName,
  getDeclarationEmitExtensionForPath,
  getDeclarationFileExtension,
  getDirectoryPath,
  getEncodedRootLength,
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
} from "#src/tspath/index.js";

describe("tspath — normalizeSlashes", () => {
  it("normalizes backslashes to forward slashes", () => {
    assert.equal(normalizeSlashes("a"), "a");
    assert.equal(normalizeSlashes("a/b"), "a/b");
    assert.equal(normalizeSlashes("a\\b"), "a/b");
    assert.equal(normalizeSlashes("\\\\server\\path"), "//server/path");
  });
});

describe("tspath — getRootLength", () => {
  it("handles POSIX and relative paths", () => {
    assert.equal(getRootLength("a"), 0);
    assert.equal(getRootLength("/"), 1);
    assert.equal(getRootLength("/path"), 1);
  });

  it("handles DOS paths", () => {
    assert.equal(getRootLength("c:"), 2);
    assert.equal(getRootLength("c:d"), 0);
    assert.equal(getRootLength("c:/"), 3);
    assert.equal(getRootLength("c:\\"), 3);
  });

  it("handles UNC paths", () => {
    assert.equal(getRootLength("//server"), 8);
    assert.equal(getRootLength("//server/share"), 9);
    assert.equal(getRootLength("\\\\server"), 8);
    assert.equal(getRootLength("\\\\server\\share"), 9);
  });

  it("handles file URLs", () => {
    assert.equal(getRootLength("file:///"), 8);
    assert.equal(getRootLength("file:///path"), 8);
    assert.equal(getRootLength("file:///c:"), 10);
    assert.equal(getRootLength("file:///c:d"), 8);
    assert.equal(getRootLength("file:///c:/path"), 11);
  });

  it("handles http URLs", () => {
    assert.equal(getRootLength("http://server"), 13);
    assert.equal(getRootLength("http://server/path"), 14);
  });
});

describe("tspath — pathIsAbsolute", () => {
  it("returns true for absolute paths", () => {
    assert.equal(pathIsAbsolute("/path/to/file.ext"), true);
    assert.equal(pathIsAbsolute("c:/path/to/file.ext"), true);
    assert.equal(pathIsAbsolute("file:///path/to/file.ext"), true);
  });

  it("returns false for relative paths", () => {
    assert.equal(pathIsAbsolute("path/to/file.ext"), false);
    assert.equal(pathIsAbsolute("./path/to/file.ext"), false);
  });
});

describe("tspath — isUrl", () => {
  it("returns false for non-URL paths", () => {
    assert.equal(isUrl("a"), false);
    assert.equal(isUrl("/"), false);
    assert.equal(isUrl("c:"), false);
    assert.equal(isUrl("//server"), false);
  });

  it("returns true for URL paths", () => {
    assert.equal(isUrl("file:///path"), true);
    assert.equal(isUrl("http://server"), true);
    assert.equal(isUrl("file:///c:/path"), true);
  });
});

describe("tspath — isRootedDiskPath", () => {
  it("returns true for rooted disk paths only", () => {
    assert.equal(isRootedDiskPath("/path"), true);
    assert.equal(isRootedDiskPath("c:/path"), true);
    assert.equal(isRootedDiskPath("file:///path"), false); // URL
    assert.equal(isRootedDiskPath("path"), false);
  });
});

describe("tspath — hasTrailingDirectorySeparator", () => {
  it("detects trailing separators", () => {
    assert.equal(hasTrailingDirectorySeparator("/"), true);
    assert.equal(hasTrailingDirectorySeparator("/path/"), true);
    assert.equal(hasTrailingDirectorySeparator("/path"), false);
    assert.equal(hasTrailingDirectorySeparator(""), false);
  });
});

describe("tspath — combinePaths", () => {
  it("combines non-absolute paths", () => {
    assert.equal(combinePaths("path", "to", "file.ext"), "path/to/file.ext");
  });

  it("does not simplify dot segments", () => {
    assert.equal(combinePaths("path", "dir", "..", "to", "file.ext"), "path/dir/../to/file.ext");
  });

  it("resets on absolute trailing path", () => {
    assert.equal(combinePaths("/path", "to", "file.ext"), "/path/to/file.ext");
    assert.equal(combinePaths("/path", "/to", "file.ext"), "/to/file.ext");
  });

  it("resets on DOS absolute trailing path", () => {
    assert.equal(combinePaths("c:/path", "to", "file.ext"), "c:/path/to/file.ext");
    assert.equal(combinePaths("c:/path", "c:/to", "file.ext"), "c:/to/file.ext");
  });
});

describe("tspath — normalizePath", () => {
  it("collapses dot segments", () => {
    assert.equal(normalizePath("/path/./to/file.ext"), "/path/to/file.ext");
    assert.equal(normalizePath("/path/../to/file.ext"), "/to/file.ext");
  });

  it("converts backslashes", () => {
    assert.equal(normalizePath("c:\\path\\to\\file.ext"), "c:/path/to/file.ext");
  });
});

describe("tspath — getDirectoryPath / getBaseFileName", () => {
  it("returns directory part", () => {
    assert.equal(getDirectoryPath("/path/to/file.ext"), "/path/to");
    // For paths without a directory separator, TS-Go returns the path itself
    assert.equal(getDirectoryPath("file.ext"), "file.ext");
  });

  it("returns base filename", () => {
    assert.equal(getBaseFileName("/path/to/file.ext"), "file.ext");
    assert.equal(getBaseFileName("file.ext"), "file.ext");
    // A trailing slash is stripped, then the last segment is returned
    assert.equal(getBaseFileName("/path/to/"), "to");
  });
});

describe("tspath — trailing separators", () => {
  it("removes trailing", () => {
    assert.equal(removeTrailingDirectorySeparator("/path/"), "/path");
    assert.equal(removeTrailingDirectorySeparator("/path"), "/path");
  });

  it("ensures trailing", () => {
    assert.equal(ensureTrailingDirectorySeparator("/path"), "/path/");
    assert.equal(ensureTrailingDirectorySeparator("/path/"), "/path/");
  });
});

describe("tspath — pathIsRelative", () => {
  it("detects relative paths", () => {
    assert.equal(pathIsRelative("./foo"), true);
    assert.equal(pathIsRelative("../foo"), true);
    assert.equal(pathIsRelative("foo"), false);
    assert.equal(pathIsRelative("/foo"), false);
    assert.equal(pathIsRelative("c:/foo"), false);
  });
});

describe("tspath — extensions", () => {
  it("fileExtensionIs", () => {
    assert.equal(fileExtensionIs("foo.ts", ".ts"), true);
    assert.equal(fileExtensionIs("foo.tsx", ".ts"), false);
    assert.equal(fileExtensionIs("foo.d.ts", ".d.ts"), true);
  });

  it("hasExtension", () => {
    assert.equal(hasExtension("foo.ts"), true);
    assert.equal(hasExtension("foo"), false);
  });

  it("extensionIsTs", () => {
    assert.equal(extensionIsTs(".ts"), true);
    assert.equal(extensionIsTs(".tsx"), true);
    assert.equal(extensionIsTs(".d.ts"), true);
    assert.equal(extensionIsTs(".js"), false);
  });

  it("removeFileExtension", () => {
    assert.equal(removeFileExtension("foo.ts"), "foo");
    assert.equal(removeFileExtension("foo.d.ts"), "foo");
    assert.equal(removeFileExtension("foo"), "foo");
  });

  it("changeExtension", () => {
    assert.equal(changeExtension("foo.ts", ".js"), "foo.js");
    // changeExtension matches .d.ts as a unit (first entry in extensionsToRemove)
    assert.equal(changeExtension("foo.d.ts", ".js"), "foo.js");
  });

  it("changeFullExtension", () => {
    assert.equal(changeFullExtension("foo.d.ts", ".js"), "foo.js");
  });

  it("getDeclarationFileExtension", () => {
    assert.equal(getDeclarationFileExtension("foo.d.ts"), ".d.ts");
    assert.equal(getDeclarationFileExtension("foo.d.mts"), ".d.mts");
    assert.equal(getDeclarationFileExtension("foo.ts"), "");
  });

  it("getDeclarationEmitExtensionForPath", () => {
    assert.equal(getDeclarationEmitExtensionForPath("foo.ts"), ".d.ts");
    assert.equal(getDeclarationEmitExtensionForPath("foo.mts"), ".d.mts");
    assert.equal(getDeclarationEmitExtensionForPath("foo.cts"), ".d.cts");
  });

  it("isDeclarationFileName", () => {
    assert.equal(isDeclarationFileName("foo.d.ts"), true);
    assert.equal(isDeclarationFileName("foo.ts"), false);
  });
});

describe("tspath — ignored paths", () => {
  it("containsIgnoredPath catches common patterns", () => {
    assert.equal(containsIgnoredPath("/project/node_modules/.bin/foo"), true);
    assert.equal(containsIgnoredPath("/project/.git/config"), true);
    assert.equal(containsIgnoredPath("/project/.#lock"), true);
    assert.equal(containsIgnoredPath("/project/src/foo.ts"), false);
  });
});

describe("tspath — toPath", () => {
  it("normalizes case based on flag", () => {
    assert.equal(toPath("Foo.ts", "/base", true), "/base/Foo.ts");
    assert.equal(toPath("Foo.ts", "/base", false), "/base/foo.ts");
  });

  it("absolute paths stay absolute", () => {
    assert.equal(toPath("/abs/path", "/base", true), "/abs/path");
  });
});

describe("tspath — getNormalizedAbsolutePath", () => {
  it("resolves relative to currentDirectory", () => {
    assert.equal(getNormalizedAbsolutePath("./foo", "/base"), "/base/foo");
    assert.equal(getNormalizedAbsolutePath("../foo", "/base"), "/foo");
    assert.equal(getNormalizedAbsolutePath("/abs/path", "/base"), "/abs/path");
  });
});

describe("tspath — getAnyExtensionFromPath", () => {
  it("returns extension when matching the provided list", () => {
    assert.equal(getAnyExtensionFromPath("foo.ts", [".ts"], false), ".ts");
    assert.equal(getAnyExtensionFromPath("foo.ts", [".js"], false), "");
  });

  it("falls back to lastIndexOf when no list provided", () => {
    assert.equal(getAnyExtensionFromPath("foo.ts", undefined, false), ".ts");
    assert.equal(getAnyExtensionFromPath("foo.d.ts", undefined, false), ".ts");
  });
});
