import assert from "node:assert/strict";
import { lstat, mkdir, mkdtemp, readFile, symlink, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import test from "node:test";

import { replaceDirectory } from "../scripts/directory-transaction.mjs";
import { removeSuccessfulScratchTree } from "../scripts/scratch-lifecycle.mjs";

test("directory replacement commits and returns the superseded directory", async () => {
  const repositoryRoot = resolve(".");
  const root = await mkdtemp(resolve(".temp", "directory-transaction-"));
  const target = join(root, "target");
  const staged = join(root, "staged");
  const preserved = join(root, "preserved", "target-old");
  await mkdir(target);
  await mkdir(staged);
  await writeFile(join(target, "value.txt"), "old\n", "utf8");
  await writeFile(join(staged, "value.txt"), "new\n", "utf8");

  assert.equal(await replaceDirectory(target, staged, preserved), preserved);
  assert.equal(await readFile(join(target, "value.txt"), "utf8"), "new\n");
  assert.equal(await readFile(join(preserved, "value.txt"), "utf8"), "old\n");
  await removeSuccessfulScratchTree(repositoryRoot, root);
});

test("directory replacement installs into an absent target", async () => {
  const repositoryRoot = resolve(".");
  const root = await mkdtemp(resolve(".temp", "directory-transaction-"));
  const target = join(root, "output", "target");
  const staged = join(root, "staged");
  const preserved = join(root, "preserved", "target-old");
  await mkdir(staged);
  await writeFile(join(staged, "value.txt"), "new\n", "utf8");

  assert.equal(await replaceDirectory(target, staged, preserved), undefined);
  assert.equal(await readFile(join(target, "value.txt"), "utf8"), "new\n");
  await removeSuccessfulScratchTree(repositoryRoot, root);
});

test("directory replacement rejects a symlink before changing either side", async () => {
  const repositoryRoot = resolve(".");
  const root = await mkdtemp(resolve(".temp", "directory-transaction-"));
  const external = join(root, "external");
  const target = join(root, "target");
  const staged = join(root, "staged");
  const preserved = join(root, "preserved", "target-old");
  await mkdir(external);
  await mkdir(staged);
  await writeFile(join(staged, "value.txt"), "new\n", "utf8");
  await symlink(external, target, "dir");

  await assert.rejects(
    replaceDirectory(target, staged, preserved),
    /target is not a directory/u,
  );
  assert.equal((await lstat(target)).isSymbolicLink(), true);
  assert.equal((await lstat(staged)).isDirectory(), true);
  await assert.rejects(lstat(preserved), { code: "ENOENT" });
  await removeSuccessfulScratchTree(repositoryRoot, root);
});
