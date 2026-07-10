import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { chmodSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { canonicalGit, canonicalJson, fingerprint, gitCheckoutProvenance, gitObjectId, hashInputRoots } from "../test-provenance.mjs";

test("canonical provenance is key-order independent and domain separated", () => {
  assert.equal(canonicalJson({ b: 2, a: { d: 4, c: 3 } }), canonicalJson({ a: { c: 3, d: 4 }, b: 2 }));
  assert.equal(fingerprint({ value: 1 }, "a"), fingerprint({ value: 1 }, "a"));
  assert.notEqual(fingerprint({ value: 1 }, "a"), fingerprint({ value: 1 }, "b"));
  assert.throws(() => canonicalJson({ value: undefined }), /unsupported canonical value/);
  assert.throws(() => canonicalJson({ value: Number.NaN }), /non-finite number/);
  const cyclic = {};
  cyclic.self = cyclic;
  assert.throws(() => canonicalJson(cyclic), /cyclic canonical value/);
});

test("Git provenance ignores replacement refs and Git object digests verify bytes", () => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-git-provenance-"));
  try {
    git(root, ["init", "-q"]);
    git(root, ["config", "user.name", "TSTS Test"]);
    git(root, ["config", "user.email", "tsts@example.invalid"]);
    writeFileSync(path.join(root, "value.txt"), "first\n");
    git(root, ["add", "value.txt"]);
    git(root, ["commit", "-q", "-m", "first"]);
    const original = canonicalGit(root, ["rev-parse", "HEAD"]);
    const originalTree = canonicalGit(root, ["rev-parse", "HEAD^{tree}"]);
    writeFileSync(path.join(root, "value.txt"), "second\n");
    git(root, ["commit", "-q", "-am", "second"]);
    const replacement = canonicalGit(root, ["rev-parse", "HEAD"]);
    git(root, ["reset", "-q", "--hard", original]);
    git(root, ["replace", original, replacement]);
    const evidence = gitCheckoutProvenance(root, "fixture");
    assert.equal(evidence.revision, original);
    assert.equal(evidence.tree, originalTree);
    assert.equal(gitObjectId(Buffer.from("value\n"), "blob", "sha1"), "6d4e150796aec4d9ee5a728616ba079ea2121ab3");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("input-root digest binds bytes, paths, modes, and symlink targets independent of checkout root", () => {
  const first = fixture();
  const second = fixture();
  try {
    const one = hashInputRoots([{ label: "fixture", path: first, symlinkPolicy: "resolved-contained" }]);
    const two = hashInputRoots([{ label: "fixture", path: second, symlinkPolicy: "resolved-contained" }]);
    assert.deepEqual(one, two);
    writeFileSync(path.join(second, "nested/value.txt"), "changed\n");
    assert.notEqual(one.digest, hashInputRoots([{ label: "fixture", path: second, symlinkPolicy: "resolved-contained" }]).digest);
    writeFileSync(path.join(second, "nested/value.txt"), "value\n");
    chmodSync(path.join(second, "nested/value.txt"), 0o600);
    assert.notEqual(one.digest, hashInputRoots([{ label: "fixture", path: second, symlinkPolicy: "resolved-contained" }]).digest);
    chmodSync(path.join(second, "nested/value.txt"), 0o644);
    rmSync(path.join(second, "link"));
    symlinkSync("other-target", path.join(second, "link"));
    assert.notEqual(one.digest, hashInputRoots([{ label: "fixture", path: second, symlinkPolicy: "resolved-contained" }]).digest);
    assert.throws(() => hashInputRoots([{ label: "same", path: first }, { label: "same", path: second }]), /duplicate input root label/);
    assert.throws(() => hashInputRoots([{ label: "fixture", path: first }]), /symlink is not allowed/);
  } finally {
    rmSync(first, { recursive: true, force: true });
    rmSync(second, { recursive: true, force: true });
  }
});

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-provenance-"));
  mkdirSync(path.join(root, "nested"));
  mkdirSync(path.join(root, "other-target"));
  writeFileSync(path.join(root, "nested/value.txt"), "value\n");
  writeFileSync(path.join(root, "other-target/value.txt"), "other\n");
  symlinkSync("nested", path.join(root, "link"));
  return root;
}

function git(root, args) {
  return execFileSync("git", ["-C", root, ...args], { encoding: "utf8" }).trim();
}
