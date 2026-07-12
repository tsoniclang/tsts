import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { buildGitCommitTreeEvidence, gitObjectHash, gitTreeHash } from "./core/git-commit-tree-evidence.mjs";
import { gitTreeEntries, readGitCommitObjectBody } from "./source-pin.mjs";

test("Git evidence reconstruction agrees with Git for every supported entry mode", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-git-evidence-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const nested = path.join(root, "nested");
  mkdirSync(nested);
  initializeRepository(nested);
  writeFileSync(path.join(nested, "value.txt"), "nested\n");
  runGit(nested, ["add", "value.txt"]);
  commit(nested, "nested");
  const nestedRevision = runGit(nested, ["rev-parse", "HEAD"]).trim();

  initializeRepository(root);
  mkdirSync(path.join(root, "bin"));
  writeFileSync(path.join(root, "README.md"), "root\n");
  writeFileSync(path.join(root, "bin", "run"), "#!/bin/sh\nexit 0\n");
  chmodSync(path.join(root, "bin", "run"), 0o755);
  symlinkSync("README.md", path.join(root, "readme-link"));
  runGit(root, ["add", "README.md", "bin/run", "readme-link"]);
  runGit(root, ["update-index", "--add", "--cacheinfo", `160000,${nestedRevision},nested`]);
  commit(root, "root");

  const revision = runGit(root, ["rev-parse", "HEAD"]).trim();
  const entries = gitTreeEntries(root, revision);
  const commitBody = readGitCommitObjectBody(root, revision);
  const evidence = buildGitCommitTreeEvidence({ commitBody, entries, objectFormat: "sha1", revision });
  assert.equal(gitObjectHash("commit", commitBody), revision);
  assert.equal(gitTreeHash(entries), runGit(root, ["rev-parse", "HEAD^{tree}"]).trim());
  assert.deepEqual(new Set(evidence.entries.map((entry) => entry.mode)), new Set(["100644", "100755", "120000", "160000"]));
});

function initializeRepository(root) {
  runGit(root, ["init", "--quiet"]);
}

function commit(root, message) {
  runGit(root, ["-c", "user.name=TSTS", "-c", "user.email=tsts@example.invalid", "commit", "--quiet", "-m", message]);
}

function runGit(root, args) {
  const result = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout;
}
