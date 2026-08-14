import assert from "node:assert/strict";
import {
  chmod,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  symlink,
  writeFile,
} from "node:fs/promises";
import { join, resolve } from "node:path";
import test from "node:test";

import { removeSuccessfulScratchTree } from "../scripts/scratch-lifecycle.mjs";

test("successful scratch cleanup is confined and does not follow links", async () => {
  const repositoryRoot = resolve(".");
  const root = await mkdtemp(resolve(".temp", "scratch-cleanup-"));
  const external = await mkdtemp(resolve(".temp", "scratch-external-"));
  const sealed = join(root, "sealed");
  await mkdir(sealed);
  await writeFile(join(sealed, "evidence.txt"), "complete\n", "utf8");
  await writeFile(join(external, "retained.txt"), "external\n", "utf8");
  await symlink(external, join(sealed, "external-link"));
  await chmod(sealed, 0o555);

  await removeSuccessfulScratchTree(repositoryRoot, root);
  await assert.rejects(lstat(root), { code: "ENOENT" });
  assert.equal(await readFile(join(external, "retained.txt"), "utf8"), "external\n");
  await assert.rejects(
    removeSuccessfulScratchTree(repositoryRoot, repositoryRoot),
    /outside the owned \.temp tree/u,
  );
  await assert.rejects(
    removeSuccessfulScratchTree(repositoryRoot, resolve(".temp")),
    /outside the owned \.temp tree/u,
  );
  await removeSuccessfulScratchTree(repositoryRoot, external);
});
