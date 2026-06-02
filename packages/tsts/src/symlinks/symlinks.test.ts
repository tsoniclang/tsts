import test from "node:test";
import assert from "node:assert/strict";

import { KnownSymlinks } from "./index.js";
import { toPath } from "../tspath/index.js";

test("starts empty", () => {
  const s = new KnownSymlinks("/cwd", true);
  assert.strictEqual(s.getDirectories().size, 0);
  assert.strictEqual(s.getFiles().size, 0);
});

test("set file records symlink to realpath and realpath to symlink set", () => {
  const s = new KnownSymlinks("/cwd", true);
  const symlinkPath = toPath("/cwd/link.ts", "/cwd", true);
  s.setFile("/cwd/link.ts", symlinkPath, "/cwd/real/file.ts");

  assert.strictEqual(s.getFiles().get(symlinkPath), "/cwd/real/file.ts");
  const realPath = toPath("/cwd/real/file.ts", "/cwd", true);
  const symlinks = s.getFilesByRealpath().get(realPath);
  assert.notEqual(symlinks, null);
  assert.ok(symlinks!.has("/cwd/link.ts"));
});

test("process resolution infers directory symlink from filename suffix match", () => {
  const s = new KnownSymlinks("/cwd", true);
  s.processResolution("/cwd/link/foo.ts", "/cwd/real/foo.ts");

  const linkFilePath = toPath("/cwd/link/foo.ts", "/cwd", true);
  assert.strictEqual(s.getFiles().get(linkFilePath), "/cwd/real/foo.ts");

  const linkDirPath = toPath("/cwd/link", "/cwd", true) + "/";
  const dirLink = s.getDirectories().get(linkDirPath as ReturnType<typeof toPath>);
  assert.notEqual(dirLink, null);
  assert.strictEqual(dirLink!.real, "/cwd/real/");
});

test("process resolution ignores empty paths", () => {
  const s = new KnownSymlinks("/cwd", true);
  s.processResolution("", "/cwd/real/foo.ts");
  s.processResolution("/cwd/link/foo.ts", "");
  assert.strictEqual(s.getFiles().size, 0);
});

test("does not infer a symlink when filenames differ", () => {
  const s = new KnownSymlinks("/cwd", true);
  s.processResolution("/cwd/link/foo.ts", "/cwd/real/bar.ts");
  assert.strictEqual(s.getFiles().size, 1);
  assert.strictEqual(s.getDirectories().size, 0);
});
