/**
 * Tests for symlinks. Covers data-structure shape and processResolution.
 */

import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import { KnownSymlinks } from "../../src/symlinks/index.js";
import { toPath } from "../../src/tspath/index.js";

describe("symlinks — KnownSymlinks data structure", () => {
  it("starts empty", () => {
    const s = new KnownSymlinks("/cwd", true);
    assert.equal(s.getDirectories().size, 0);
    assert.equal(s.getFiles().size, 0);
  });

  it("setFile records symlink → realpath and realpath → symlink set", () => {
    const s = new KnownSymlinks("/cwd", true);
    const symlinkPath = toPath("/cwd/link.ts", "/cwd", true);
    s.setFile("/cwd/link.ts", symlinkPath, "/cwd/real/file.ts");

    assert.equal(s.getFiles().get(symlinkPath), "/cwd/real/file.ts");
    const realPath = toPath("/cwd/real/file.ts", "/cwd", true);
    const symlinks = s.getFilesByRealpath().get(realPath);
    assert.ok(symlinks);
    assert.equal(symlinks!.has("/cwd/link.ts"), true);
  });

  it("processResolution infers directory symlink from filename suffix match", () => {
    const s = new KnownSymlinks("/cwd", true);
    s.processResolution("/cwd/link/foo.ts", "/cwd/real/foo.ts");

    // Files recorded
    const linkFilePath = toPath("/cwd/link/foo.ts", "/cwd", true);
    assert.equal(s.getFiles().get(linkFilePath), "/cwd/real/foo.ts");

    // Directory symlink inferred: /cwd/link → /cwd/real
    const linkDirPath = toPath("/cwd/link", "/cwd", true) + "/";
    const dirLink = s.getDirectories().get(linkDirPath as ReturnType<typeof toPath>);
    assert.ok(dirLink);
    assert.equal(dirLink!.real, "/cwd/real/");
  });

  it("processResolution ignores empty paths", () => {
    const s = new KnownSymlinks("/cwd", true);
    s.processResolution("", "/cwd/real/foo.ts");
    s.processResolution("/cwd/link/foo.ts", "");
    assert.equal(s.getFiles().size, 0);
  });

  it("does not infer a symlink when filenames differ", () => {
    const s = new KnownSymlinks("/cwd", true);
    s.processResolution("/cwd/link/foo.ts", "/cwd/real/bar.ts");
    // Files are still tracked
    assert.equal(s.getFiles().size, 1);
    // But no directory symlink
    assert.equal(s.getDirectories().size, 0);
  });
});
