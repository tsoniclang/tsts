import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { hashInputRoots, readStableRegularFile } from "../test-provenance.mjs";

test("provenance traversal rejects symlinked ancestors and final files", (context) => {
  const root = mkdtempSync(join(tmpdir(), "tsts-provenance-nofollow-"));
  context.after(() => rmSync(root, { recursive: true, force: true }));
  const real = join(root, "real");
  mkdirSync(real);
  writeFileSync(join(real, "input.txt"), "bound\n");
  symlinkSync(real, join(root, "alias"));
  assert.throws(() => hashInputRoots([{ label: "alias", path: join(root, "alias") }]), /symlink is not allowed|symlink traversal is forbidden/);
  assert.throws(() => readStableRegularFile(join(root, "alias/input.txt"), "aliased input"), /symlink traversal is forbidden/);
  symlinkSync(join(real, "input.txt"), join(root, "file-link"));
  assert.throws(() => readStableRegularFile(join(root, "file-link"), "linked input"), /regular non-symlink file/);
});

test("resolved-contained policy binds link target and rejects escaping referents", (context) => {
  const root = mkdtempSync(join(tmpdir(), "tsts-provenance-contained-"));
  context.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "tree"));
  writeFileSync(join(root, "tree/target.txt"), "target\n");
  symlinkSync("target.txt", join(root, "tree/link.txt"));
  const evidence = hashInputRoots([{ label: "tree", path: join(root, "tree"), symlinkPolicy: "resolved-contained" }]);
  assert.equal(evidence.roots[0].symlinkCount, 1);
  symlinkSync("../outside.txt", join(root, "tree/escape.txt"));
  writeFileSync(join(root, "outside.txt"), "outside\n");
  assert.throws(() => hashInputRoots([{ label: "tree", path: join(root, "tree"), symlinkPolicy: "resolved-contained" }]), /symlink escapes evidence root/);
});
