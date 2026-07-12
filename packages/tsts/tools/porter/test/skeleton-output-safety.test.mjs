import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { pathToFileURL } from "node:url";

import {
  skeletonOutputRelativePath,
  skeletonOutputSentinelName,
} from "../core/scaffolding.mjs";
import { repoRoot, resolveRepo } from "../core/runtime.mjs";

const scaffoldingModuleUrl = pathToFileURL(resolveRepo("packages/tsts/tools/porter/core/scaffolding.mjs")).href;

test("skeleton output reset is fixed and sentinel-owned", (t) => {
  const root = fixtureRepo(t);

  const outputRoot = path.join(root, ...skeletonOutputRelativePath.split("/"));
  assertResetSucceeds(root);
  assert.deepEqual(readdirSync(outputRoot), [skeletonOutputSentinelName]);
  assert.match(readFileSync(path.join(outputRoot, skeletonOutputSentinelName), "utf8"), /^tsts-porter:skeleton-check-output:v1\n$/);

  writeFileSync(path.join(outputRoot, "stale.ts"), "stale\n");
  assertResetSucceeds(root);
  assert.deepEqual(readdirSync(outputRoot), [skeletonOutputSentinelName]);
});

test("skeleton output reset preserves directories without its sentinel", (t) => {
  const root = fixtureRepo(t);
  const outputRoot = path.join(root, ...skeletonOutputRelativePath.split("/"));
  mkdirSync(outputRoot, { recursive: true });
  const canary = path.join(outputRoot, "valuable.txt");
  writeFileSync(canary, "keep\n");

  assertResetFails(root, /refusing to delete Porter skeleton output without its ownership sentinel/);
  assert.equal(readFileSync(canary, "utf8"), "keep\n");
});

test("skeleton output reset preserves directories with a changed sentinel", (t) => {
  const root = fixtureRepo(t);
  const outputRoot = path.join(root, ...skeletonOutputRelativePath.split("/"));
  assertResetSucceeds(root);
  const canary = path.join(outputRoot, "valuable.txt");
  writeFileSync(canary, "keep\n");
  writeFileSync(path.join(outputRoot, skeletonOutputSentinelName), "not-owned\n");

  assertResetFails(root, /refusing to delete Porter skeleton output with an invalid ownership sentinel/);
  assert.equal(readFileSync(canary, "utf8"), "keep\n");
});

test("skeleton output reset rejects symlinked Porter temp ancestors", (t) => {
  const root = fixtureRepo(t);
  const outside = mkdtempSync(path.join(tmpdir(), "tsts-porter-outside-"));
  t.after(() => rmSync(outside, { recursive: true, force: true }));
  const canary = path.join(outside, "valuable.txt");
  writeFileSync(canary, "keep\n");
  symlinkSync(outside, path.join(root, ".temp"), "dir");

  assertResetFails(root, /Porter \.temp directory must be an existing non-symlink directory/);
  assert.equal(readFileSync(canary, "utf8"), "keep\n");
});

test("skeleton output reset rejects a symlinked output directory", (t) => {
  const root = fixtureRepo(t);
  const outside = mkdtempSync(path.join(tmpdir(), "tsts-porter-outside-"));
  t.after(() => rmSync(outside, { recursive: true, force: true }));
  const canary = path.join(outside, "valuable.txt");
  writeFileSync(canary, "keep\n");
  mkdirSync(path.join(root, ".temp", "porter"), { recursive: true });
  symlinkSync(outside, path.join(root, ...skeletonOutputRelativePath.split("/")), "dir");

  assertResetFails(root, /Porter skeleton output directory must be an existing non-symlink directory/);
  assert.equal(readFileSync(canary, "utf8"), "keep\n");
});

test("skeleton-check CLI rejects arbitrary output before touching it", (t) => {
  const target = mkdtempSync(path.join(tmpdir(), "tsts-porter-valuable-"));
  t.after(() => rmSync(target, { recursive: true, force: true }));
  const canary = path.join(target, "valuable.txt");
  writeFileSync(canary, "keep\n");

  const result = spawnSync(
    process.execPath,
    [resolveRepo("packages/tsts/tools/porter/porter-cli.mjs"), "skeleton-check", "--out", target],
    { cwd: repoRoot, encoding: "utf8" },
  );
  assert.equal(result.status, 1);
  assert.match(result.stderr, /porter skeleton-check: unknown option '--out'/);
  assert.equal(existsSync(canary), true);
  assert.equal(readFileSync(canary, "utf8"), "keep\n");
});

function fixtureRepo(t) {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-porter-skeleton-"));
  mkdirSync(path.join(root, ".git"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return root;
}

function assertResetSucceeds(root) {
  const result = runReset(root);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), path.join(root, ...skeletonOutputRelativePath.split("/")));
}

function assertResetFails(root, pattern) {
  const result = runReset(root);
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, pattern);
}

function runReset(root) {
  return spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "--eval",
      `import { resetSkeletonOutputDirectory } from ${JSON.stringify(scaffoldingModuleUrl)};
try {
  console.log(resetSkeletonOutputDirectory());
} catch (error) {
  console.error(error?.message ?? String(error));
  process.exitCode = 1;
}`,
    ],
    { cwd: root, encoding: "utf8" },
  );
}
