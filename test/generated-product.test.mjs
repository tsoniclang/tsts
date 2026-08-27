import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import test from "node:test";

import {
  publishGeneratedProduct,
  verifyGeneratedProductGitVisibility,
  verifyGeneratedProductMatches,
  verifyPublishedProduct,
} from "../scripts/generated-product.mjs";
import { removeSuccessfulScratchTree } from "../scripts/scratch-lifecycle.mjs";
import { sealTargetManifest } from "../scripts/target-manifest.mjs";

const scratchRoot = resolve(".temp");

test("generated product publishes the exact TypeScript source tree", async () => {
  await withFixture(async ({ repositoryRoot, targetRoot, publishedRoot }) => {
    await createTarget(targetRoot);
    const manifest = await publishGeneratedProduct(
      repositoryRoot,
      targetRoot,
      publishedRoot,
    );
    assert.equal(manifest.source.files, 5);
    await verifyPublishedProduct(publishedRoot);
    await verifyGeneratedProductMatches(targetRoot, publishedRoot);
    assert.equal(
      await readFile(join(publishedRoot, "source", "runner.ts"), "utf8"),
      "import './program.js';\n",
    );
  });
});

test("generated product rejects committed and regenerated source drift", async () => {
  await withFixture(async ({ repositoryRoot, targetRoot, publishedRoot }) => {
    await createTarget(targetRoot);
    await publishGeneratedProduct(repositoryRoot, targetRoot, publishedRoot);
    await writeFile(join(publishedRoot, "source", "program.ts"), "export const value = 2;\n");
    await assert.rejects(
      verifyPublishedProduct(publishedRoot),
      /TypeScript target content, type, or membership differs/u,
    );

    await publishGeneratedProduct(repositoryRoot, targetRoot, publishedRoot);
    await writeFile(join(targetRoot, "program.ts"), "export const value = 3;\n");
    await assert.rejects(
      verifyGeneratedProductMatches(targetRoot, publishedRoot),
      /TypeScript target source member 'program.ts' differs/u,
    );
  });
});

test("generated product rejects Git-ignored manifest members", async () => {
  await withFixture(async ({ repositoryRoot, targetRoot, publishedRoot }) => {
    runGit(repositoryRoot, ["init", "--quiet"]);
    await writeFile(join(repositoryRoot, ".gitignore"), "node_modules/\n");
    await createTarget(targetRoot, { withIgnoredMember: true });
    await publishGeneratedProduct(repositoryRoot, targetRoot, publishedRoot);
    const verified = await verifyPublishedProduct(publishedRoot);
    assert.throws(
      () => verifyGeneratedProductGitVisibility(
        repositoryRoot,
        publishedRoot,
        verified.source,
      ),
      /Git-ignored members/u,
    );

    await writeFile(
      join(repositoryRoot, ".gitignore"),
      "node_modules/\n!generated/**\n",
    );
    verifyGeneratedProductGitVisibility(repositoryRoot, publishedRoot, verified.source);
  });
});

async function createTarget(targetRoot, { withIgnoredMember = false } = {}) {
  await mkdir(join(targetRoot, "runtime"), { recursive: true });
  await writeFile(join(targetRoot, "package.json"), "{\"private\":true,\"type\":\"module\"}\n");
  await writeFile(join(targetRoot, "program.ts"), "export const value = 1;\n");
  await writeFile(join(targetRoot, "runner.ts"), "import './program.js';\n");
  await writeFile(join(targetRoot, "runtime", "value.ts"), "export const runtime = true;\n");
  if (withIgnoredMember) {
    await mkdir(join(targetRoot, "node_modules", "runtime"), { recursive: true });
    await writeFile(
      join(targetRoot, "node_modules", "runtime", "index.js"),
      "export const runtime = true;\n",
    );
  }
  await sealTargetManifest(
    targetRoot,
    "a".repeat(64),
    "b".repeat(64),
    "c".repeat(64),
  );
}

async function withFixture(callback) {
  await mkdir(scratchRoot, { recursive: true });
  const repositoryRoot = await mkdtemp(join(scratchRoot, "generated-product-"));
  try {
    const targetRoot = join(repositoryRoot, ".temp", "target");
    const publishedRoot = join(repositoryRoot, "generated");
    await callback({ repositoryRoot, targetRoot, publishedRoot });
  } finally {
    await removeSuccessfulScratchTree(resolve("."), repositoryRoot);
  }
}

function runGit(root, arguments_) {
  const result = spawnSync("git", ["-C", root, ...arguments_], {
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
}
