import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  writeFile,
} from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

import {
  bundleExecutable,
  executableBundleManifestName,
  verifyExecutableBundle,
} from "../scripts/executable-bundle.mjs";
import { removeSuccessfulScratchTree } from "../scripts/scratch-lifecycle.mjs";
import { sealTargetManifest } from "../scripts/target-manifest.mjs";

const repositoryRoot = resolve(".");
const scratchRoot = resolve(".temp", "executable-bundle-tests");
const esbuild = resolve("node_modules", "esbuild", "bin", "esbuild");

test("single-esm assembly is deterministic and preserves module initialization", async () => {
  const first = await createFixture("deterministic-a-");
  const second = await createFixture("deterministic-b-");
  try {
    const firstManifest = await bundle(first);
    const secondManifest = await bundle(second);
    const firstBytes = await readFile(join(first.targetRoot, "out", "tsts.mjs"));
    const secondBytes = await readFile(join(second.targetRoot, "out", "tsts.mjs"));

    assert.deepEqual(secondBytes, firstBytes);
    assert.deepEqual(secondManifest, firstManifest);
    assert.equal(firstManifest.inputs.some((input) => input.path === "unused.js"), false);
    assert.deepEqual(firstManifest.externalImports, ["node:path"]);
    const executed = await import(
      `${pathToFileURL(join(first.targetRoot, "out", "tsts.mjs")).href}?first`
    );
    assert.deepEqual(executed.result, ["a", "b", "value.txt"]);
  } finally {
    await removeSuccessfulScratchTree(repositoryRoot, first.root);
    await removeSuccessfulScratchTree(repositoryRoot, second.root);
  }
});

test("single-esm assembly records input drift and rejects output mutation", async () => {
  const first = await createFixture("drift-a-");
  const second = await createFixture("drift-b-", { value: "changed" });
  try {
    const firstManifest = await bundle(first);
    const secondManifest = await bundle(second);
    assert.notEqual(secondManifest.output.digest, firstManifest.output.digest);
    assert.notDeepEqual(secondManifest.inputs, firstManifest.inputs);

    const output = join(first.targetRoot, "out", "tsts.mjs");
    await writeFile(output, "export const changed = true;\n", "utf8");
    await assert.rejects(
      verifyExecutableBundle(join(first.targetRoot, "out"), firstManifest),
      /output differs/u,
    );
  } finally {
    await removeSuccessfulScratchTree(repositoryRoot, first.root);
    await removeSuccessfulScratchTree(repositoryRoot, second.root);
  }
});

test("failed assembly leaves the emitted graph untouched", async () => {
  const fixture = await createFixture("failure-", { missingImport: true });
  const evidenceRoot = resolve(".temp", "executable-bundles");
  await mkdir(evidenceRoot, { recursive: true });
  const before = new Set(await readdir(evidenceRoot));
  try {
    await assert.rejects(bundle(fixture), /esbuild failed/u);
    assert.match(
      await readFile(join(fixture.targetRoot, "out", "runner.js"), "utf8"),
      /missing/u,
    );
    const created = (await readdir(evidenceRoot)).filter((name) => !before.has(name));
    assert.equal(created.length, 1);
    await removeSuccessfulScratchTree(repositoryRoot, join(evidenceRoot, created[0]));
  } finally {
    await removeSuccessfulScratchTree(repositoryRoot, fixture.root);
  }
});

async function createFixture(prefix, options = {}) {
  await mkdir(scratchRoot, { recursive: true });
  const root = await mkdtemp(join(scratchRoot, prefix));
  const targetRoot = join(root, "target");
  await mkdir(targetRoot);
  await writeFile(join(targetRoot, "source.ts"), "export {};\n", "utf8");
  await sealTargetManifest(
    targetRoot,
    "1".repeat(64),
    "2".repeat(64),
    "3".repeat(64),
  );
  const outputRoot = join(targetRoot, "out");
  await mkdir(outputRoot);
  await writeFile(
    join(outputRoot, "package.json"),
    '{"private":true,"type":"module"}\n',
    "utf8",
  );
  await writeFile(join(outputRoot, "state.js"), "export const order = [];\n", "utf8");
  await writeFile(
    join(outputRoot, "a.js"),
    `import { order } from "./state.js"; order.push("a"); export const value = ${JSON.stringify(options.value ?? "value")};\n`,
    "utf8",
  );
  await writeFile(
    join(outputRoot, "b.js"),
    'import { order } from "./state.js"; order.push("b");\n',
    "utf8",
  );
  const imported = options.missingImport ? './missing.js' : './a.js';
  await writeFile(
    join(outputRoot, "runner.js"),
    `import { basename } from "node:path"; import { order } from "./state.js"; import { value } from ${JSON.stringify(imported)}; import "./b.js"; export const result = [...order, basename(value + ".txt")];\n`,
    "utf8",
  );
  await writeFile(join(outputRoot, "unused.js"), "throw new Error('unused');\n", "utf8");
  return Object.freeze({ root, targetRoot });
}

async function bundle(fixture) {
  const bundlerBytes = await readFile(esbuild);
  return bundleExecutable({
    repositoryRoot,
    targetRoot: fixture.targetRoot,
    toolchain: Object.freeze({
      digest: "3".repeat(64),
      binaries: Object.freeze({ esbuild }),
      manifest: Object.freeze({
        binaries: Object.freeze([Object.freeze({
          key: "esbuild",
          digest: createHash("sha256").update(bundlerBytes).digest("hex"),
        })]),
      }),
    }),
    targetProfile: Object.freeze({
      digest: "2".repeat(64),
      assembly: Object.freeze({ modulePackaging: "single-esm" }),
    }),
  });
}

test.after(async () => {
  try {
    if ((await readdir(scratchRoot)).length === 0) {
      await removeSuccessfulScratchTree(repositoryRoot, scratchRoot);
    }
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
});
