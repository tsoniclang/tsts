import assert from "node:assert/strict";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import test from "node:test";

import { sealTargetManifest, verifyTargetManifest } from "../scripts/target-manifest.mjs";
import { readTypeScriptTargetProfile } from "../scripts/typescript-target-profile.mjs";

const scratchRoot = resolve(".temp", "profile-tests");

test("target profile has one stable semantic identity", async () => {
  const root = await createScratch("identity-");
  const first = join(root, "first.json");
  const second = join(root, "second.json");
  await writeFile(first, JSON.stringify({
    schemaVersion: 1,
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
    schemaVersion: 1,
  }, undefined, 2), "utf8");

  const left = await readTypeScriptTargetProfile(first);
  const right = await readTypeScriptTargetProfile(second);
  assert.equal(left.digest, right.digest);
  assert.deepEqual(left.optimizations, right.optimizations);
  assert.equal(Object.isFrozen(left.optimizations), true);
});

test("target profile rejects unknown product configuration", async () => {
  const root = await createScratch("invalid-");
  const path = join(root, "profile.json");
  await writeFile(path, JSON.stringify({
    schemaVersion: 1,
    optimizations: {},
    fallback: true,
  }), "utf8");
  await assert.rejects(
    readTypeScriptTargetProfile(path),
    /unsupported field 'fallback'/u,
  );
});

test("target manifest rejects profile drift and unselected remnants", async () => {
  const root = await createScratch("manifest-");
  await writeFile(join(root, "program.ts"), "export {};\n", "utf8");
  const canonicalDigest = "1".repeat(64);
  const profileDigest = "2".repeat(64);
  await sealTargetManifest(root, canonicalDigest, profileDigest);
  await verifyTargetManifest(root, canonicalDigest, profileDigest);
  await assert.rejects(
    verifyTargetManifest(root, canonicalDigest, "3".repeat(64)),
    /target profile digest differs/u,
  );
  await writeFile(join(root, "unselected.ts"), "throw new Error();\n", "utf8");
  await assert.rejects(
    verifyTargetManifest(root, canonicalDigest, profileDigest),
    /manifest membership differs/u,
  );
});

async function createScratch(prefix) {
  await mkdir(scratchRoot, { recursive: true });
  return mkdtemp(join(scratchRoot, prefix));
}
