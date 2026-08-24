import assert from "node:assert/strict";
import { link, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import test from "node:test";

import { sealTargetManifest, verifyTargetManifest } from "../scripts/target-manifest.mjs";
import { removeSuccessfulScratchTree } from "../scripts/scratch-lifecycle.mjs";
import { readTypeScriptTargetProfile } from "../scripts/typescript-target-profile.mjs";

const scratchRoot = resolve(".temp", "profile-tests");

test("target profile has one stable semantic identity", async () => {
  const root = await createScratch("identity-");
  const first = join(root, "first.json");
  const second = join(root, "second.json");
  await writeFile(first, JSON.stringify({
    schemaVersion: 3,
    optimizations: {
      pointerFlows: "closed-direct",
      scalarProjections: "closed-direct",
    },
  }), "utf8");
  await writeFile(second, JSON.stringify({
    optimizations: {
      scalarProjections: "closed-direct",
      pointerFlows: "closed-direct",
    },
    schemaVersion: 3,
  }, undefined, 2), "utf8");

  const left = await readTypeScriptTargetProfile(first);
  const right = await readTypeScriptTargetProfile(second);
  assert.equal(left.digest, right.digest);
  assert.deepEqual(left.optimizations, right.optimizations);
  assert.deepEqual(left.diagnostics, { planningPhases: false });
  assert.deepEqual(left.sourceInvocationManifests, []);
  assert.equal(Object.isFrozen(left.optimizations), true);
  assert.equal(Object.isFrozen(left.diagnostics), true);
  assert.equal(Object.isFrozen(left.sourceInvocationManifests), true);
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target profile owns normalized source invocation manifests", async () => {
  const root = await createScratch("source-manifests-");
  const path = join(root, "profile.json");
  await writeFile(path, JSON.stringify({
    schemaVersion: 3,
    optimizations: {},
    sourceInvocationManifests: [
      {
        sourcePath: "contracts/gotots-manifest.json",
        installedPath: "installed/gotots-manifest.json",
      },
      {
        sourcePath: "contracts/provider-manifest.json",
        installedPath: "installed/provider-manifest.json",
      },
    ],
  }), "utf8");
  const profile = await readTypeScriptTargetProfile(path);
  assert.deepEqual(profile.sourceInvocationManifests, [
    {
      sourcePath: "contracts/gotots-manifest.json",
      installedPath: "installed/gotots-manifest.json",
    },
    {
      sourcePath: "contracts/provider-manifest.json",
      installedPath: "installed/provider-manifest.json",
    },
  ]);
  assert.equal(Object.isFrozen(profile.sourceInvocationManifests[0]), true);

  await writeFile(path, JSON.stringify({
    schemaVersion: 3,
    optimizations: {},
    sourceInvocationManifests: [{
      sourcePath: "gotots-manifest.json",
      installedPath: "../outside.json",
    }],
  }), "utf8");
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /must be a normalized relative path/u,
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target profile rejects unknown product configuration", async () => {
  const root = await createScratch("invalid-");
  const path = join(root, "profile.json");
  await writeFile(path, JSON.stringify({
    schemaVersion: 3,
    optimizations: {},
    fallback: true,
  }), "utf8");
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /unsupported field 'fallback'/u,
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target profile validates bounded planning diagnostics", async () => {
  const root = await createScratch("diagnostics-");
  const path = join(root, "profile.json");
  await writeFile(path, JSON.stringify({
    schemaVersion: 3,
    optimizations: {},
    diagnostics: { planningPhases: true },
  }), "utf8");
  const profile = await readTypeScriptTargetProfile(path);
  assert.deepEqual(profile.diagnostics, { planningPhases: true });

  await writeFile(path, JSON.stringify({
    schemaVersion: 3,
    optimizations: {},
    diagnostics: { planningPhases: "yes" },
  }), "utf8");
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /'planningPhases' must be boolean/u,
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target manifest rejects profile drift and unselected remnants", async () => {
  const root = await createScratch("manifest-");
  await writeFile(join(root, "program.ts"), "export {};\n", "utf8");
  const canonicalDigest = "1".repeat(64);
  const profileDigest = "2".repeat(64);
  const toolchainDigest = "3".repeat(64);
  await sealTargetManifest(root, canonicalDigest, profileDigest, toolchainDigest);
  await verifyTargetManifest(root, canonicalDigest, profileDigest);
  await assert.rejects(
    verifyTargetManifest(root, canonicalDigest, "4".repeat(64)),
    /target profile digest differs/u,
  );
  await writeFile(join(root, "unselected.ts"), "throw new Error();\n", "utf8");
  await assert.rejects(
    verifyTargetManifest(root, canonicalDigest, profileDigest),
    /content, type, or membership differs/u,
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target manifest rejects byte mutation and hard links", async () => {
  const root = await createScratch("target-bytes-");
  const target = join(root, "target");
  await mkdir(target);
  await writeFile(join(target, "program.ts"), "export const value = 1;\n", "utf8");
  await sealTargetManifest(target, "1".repeat(64), "2".repeat(64), "3".repeat(64));
  await writeFile(join(target, "program.ts"), "export const value = 2;\n", "utf8");
  await assert.rejects(
    verifyTargetManifest(target, "1".repeat(64), "2".repeat(64)),
    /content, type, or membership differs/u,
  );

  const hardlinkTarget = join(root, "hardlink-target");
  await mkdir(hardlinkTarget);
  const external = join(root, "external.ts");
  await writeFile(external, "export {};\n", "utf8");
  await link(external, join(hardlinkTarget, "program.ts"));
  await assert.rejects(
    sealTargetManifest(
      hardlinkTarget,
      "1".repeat(64),
      "2".repeat(64),
      "3".repeat(64),
    ),
    /hard link/u,
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

test("target manifest ordering is locale independent code-unit order", async () => {
  const root = await createScratch("target-order-");
  for (const path of ["z.ts", "ä.ts", "A.ts", "a.ts"]) {
    await writeFile(join(root, path), "export {};\n", "utf8");
  }
  const original = String.prototype.localeCompare;
  String.prototype.localeCompare = () => {
    throw new Error("locale ordering is forbidden");
  };
  try {
    await sealTargetManifest(root, "1".repeat(64), "2".repeat(64), "3".repeat(64));
  } finally {
    String.prototype.localeCompare = original;
  }
  const manifest = JSON.parse(
    await readFile(join(root, "tsts-target-manifest.json"), "utf8"),
  );
  assert.deepEqual(
    manifest.members.map((member) => member.path),
    ["A.ts", "a.ts", "z.ts", "ä.ts"],
  );
  await removeSuccessfulScratchTree(resolve("."), root);
});

async function createScratch(prefix) {
  await mkdir(scratchRoot, { recursive: true });
  return mkdtemp(join(scratchRoot, prefix));
}
