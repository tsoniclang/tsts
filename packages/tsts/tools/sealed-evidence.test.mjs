import assert from "node:assert/strict";
import fs from "node:fs";
import { syncBuiltinESMExports } from "node:module";
import fsPromises, { mkdir, mkdtemp, readFile, readdir, realpath, rename, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import test from "node:test";

import {
  publishSealedDirectory,
  readVerifiedEvidenceFile,
  readVerifiedEvidenceJson,
  sealEvidenceDirectory,
  verifyEvidenceDirectory,
} from "./sealed-evidence.mjs";

const canonicalTempRoot = await realpath(tmpdir());
const secureFilesystemAvailable = process.platform !== "win32" && Number.isInteger(fs.constants.O_NOFOLLOW) && fs.constants.O_NOFOLLOW !== 0 && Number.isInteger(fs.constants.O_DIRECTORY) && fs.constants.O_DIRECTORY !== 0;
const filesystemTest = secureFilesystemAvailable ? test : test.skip;

filesystemTest("sealed evidence binds the complete recursive directory inventory", async () => {
  await withTemporaryDirectory("tsts-sealed-evidence-", async (root) => {
    const directory = join(root, "evidence");
    await mkdir(join(directory, "nested"), { recursive: true });
    await writeFile(join(directory, "nested/value.txt"), "value\n");
    const seal = await sealEvidenceDirectory(directory, { outcome: "passed", count: 1 });
    assert.equal(verifyEvidenceDirectory(directory).evidenceDigest, seal.evidenceDigest);
  });
});

filesystemTest("sealed evidence rejects tampering, replacement, and extra entries", async (context) => {
  await context.test("same-size content tampering", async () => {
    await withTemporaryDirectory("tsts-sealed-tamper-", async (root) => {
      const directory = await createEvidenceDirectory(root, "evidence", "value\n");
      await sealEvidenceDirectory(directory, { outcome: "passed" });
      await writeFile(join(directory, "value.txt"), "VALUE\n");
      assert.throws(() => verifyEvidenceDirectory(directory), /inventory mismatch/);
    });
  });

  await context.test("path replacement", async () => {
    await withTemporaryDirectory("tsts-sealed-swap-", async (root) => {
      const directory = await createEvidenceDirectory(root, "evidence", "value\n");
      await sealEvidenceDirectory(directory, { outcome: "passed" });
      await rename(join(directory, "value.txt"), join(root, "displaced.txt"));
      await writeFile(join(directory, "value.txt"), "other\n");
      assert.throws(() => verifyEvidenceDirectory(directory), /inventory mismatch/);
    });
  });

  await context.test("extra file", async () => {
    await withTemporaryDirectory("tsts-sealed-extra-", async (root) => {
      const directory = await createEvidenceDirectory(root, "evidence", "value\n");
      await sealEvidenceDirectory(directory, { outcome: "passed" });
      await writeFile(join(directory, "extra.txt"), "extra\n");
      assert.throws(() => verifyEvidenceDirectory(directory), /inventory mismatch/);
    });
  });
});

filesystemTest("sealed evidence rejects root, ancestor, and child symlink traversal", async (context) => {
  await context.test("root symlink", async () => {
    await withTemporaryDirectory("tsts-sealed-root-link-", async (root) => {
      const realRoot = await createEvidenceDirectory(root, "real", "value\n");
      const linkedRoot = join(root, "linked");
      await symlink(realRoot, linkedRoot, "dir");
      await assert.rejects(() => sealEvidenceDirectory(linkedRoot, { outcome: "passed" }), /symlink/);
    });
  });

  await context.test("ancestor symlink", async () => {
    await withTemporaryDirectory("tsts-sealed-ancestor-link-", async (root) => {
      const realAncestor = join(root, "real-ancestor");
      const directory = await createEvidenceDirectory(realAncestor, "evidence", "value\n");
      assert.equal(directory, join(realAncestor, "evidence"));
      const linkedAncestor = join(root, "linked-ancestor");
      await symlink(realAncestor, linkedAncestor, "dir");
      await assert.rejects(() => sealEvidenceDirectory(join(linkedAncestor, "evidence"), { outcome: "passed" }), /symlink/);
    });
  });

  await context.test("child file and directory symlinks", async () => {
    await withTemporaryDirectory("tsts-sealed-child-links-", async (root) => {
      const fileLinkRoot = await createEvidenceDirectory(root, "file-link", "target\n");
      await symlink("value.txt", join(fileLinkRoot, "linked.txt"));
      await assert.rejects(() => sealEvidenceDirectory(fileLinkRoot, { outcome: "passed" }), /symlink is forbidden/);

      const directoryLinkRoot = join(root, "directory-link");
      await mkdir(join(directoryLinkRoot, "target"), { recursive: true });
      await writeFile(join(directoryLinkRoot, "target/value.txt"), "target\n");
      await symlink("target", join(directoryLinkRoot, "linked"), "dir");
      await assert.rejects(() => sealEvidenceDirectory(directoryLinkRoot, { outcome: "passed" }), /symlink is forbidden/);
    });
  });
});

filesystemTest("regular-file reads fail closed when lstat is raced with a symlink swap", { concurrency: false }, async () => {
  await withTemporaryDirectory("tsts-sealed-lstat-race-", async (root) => {
    const directory = await createEvidenceDirectory(root, "evidence", "same verified bytes\n");
    const outside = join(root, "outside.txt");
    await writeFile(outside, "same verified bytes\n");
    await sealEvidenceDirectory(directory, { outcome: "passed" });

    const originalLstatSync = fs.lstatSync;
    let swapped = false;
    fs.lstatSync = function lstatAndSwap(path, options) {
      const stat = originalLstatSync.call(fs, path, options);
      if (!swapped && typeof path === "string" && basename(path) === "value.txt") {
        swapped = true;
        fs.renameSync(join(directory, "value.txt"), join(root, "displaced.txt"));
        fs.symlinkSync(outside, join(directory, "value.txt"));
      }
      return stat;
    };
    syncBuiltinESMExports();
    try {
      assert.throws(() => verifyEvidenceDirectory(directory), /symlink|changed/);
      assert.equal(swapped, true);
    } finally {
      fs.lstatSync = originalLstatSync;
      syncBuiltinESMExports();
    }
  });
});

filesystemTest("seal publication never replaces an existing or racing seal", async (context) => {
  await context.test("existing seal", async () => {
    await withTemporaryDirectory("tsts-sealed-existing-seal-", async (root) => {
      const directory = await createEvidenceDirectory(root, "evidence", "value\n");
      await sealEvidenceDirectory(directory, { writer: "original" });
      const originalBytes = await readFile(join(directory, "COMPLETE.json"));
      await assert.rejects(() => sealEvidenceDirectory(directory, { writer: "replacement" }), /refusing to replace evidence seal/);
      assert.deepEqual(await readFile(join(directory, "COMPLETE.json")), originalBytes);
      assert.deepEqual(verifyEvidenceDirectory(directory).metadata, { writer: "original" });
    });
  });

  await context.test("concurrent sealers", async () => {
    await withTemporaryDirectory("tsts-sealed-seal-race-", async (root) => {
      const directory = await createEvidenceDirectory(root, "evidence", "value\n");
      const results = await Promise.allSettled([
        sealEvidenceDirectory(directory, { writer: "left" }),
        sealEvidenceDirectory(directory, { writer: "right" }),
      ]);
      assert.equal(results.filter((result) => result.status === "fulfilled").length, 1);
      assert.equal(results.filter((result) => result.status === "rejected").length, 1);
      const rejection = results.find((result) => result.status === "rejected");
      assert.match(rejection.reason.message, /refusing to replace evidence seal/);
      const winner = results.find((result) => result.status === "fulfilled").value;
      assert.equal(verifyEvidenceDirectory(directory).evidenceDigest, winner.evidenceDigest);
      assert.equal((await readdir(directory)).some((name) => name.includes(".partial-")), false);
    });
  });
});

filesystemTest("directory publication never replaces existing or racing evidence", async (context) => {
  await context.test("existing sealed destination", async () => {
    await withTemporaryDirectory("tsts-sealed-existing-destination-", async (root) => {
      const staging = await createEvidenceDirectory(root, "staging", "new\n");
      const destination = await createEvidenceDirectory(root, "destination", "old\n");
      await sealEvidenceDirectory(staging, { writer: "new" });
      await sealEvidenceDirectory(destination, { writer: "old" });
      const originalSeal = await readFile(join(destination, "COMPLETE.json"));
      await assert.rejects(() => publishSealedDirectory(staging, destination), /refusing to replace published evidence directory/);
      assert.deepEqual(await readFile(join(destination, "COMPLETE.json")), originalSeal);
      assert.deepEqual(verifyEvidenceDirectory(destination).metadata, { writer: "old" });
      assert.deepEqual(verifyEvidenceDirectory(staging).metadata, { writer: "new" });
    });
  });

  await context.test("existing empty destination", async () => {
    await withTemporaryDirectory("tsts-sealed-empty-destination-", async (root) => {
      const staging = await createEvidenceDirectory(root, "staging", "new\n");
      const destination = join(root, "destination");
      await mkdir(destination);
      await sealEvidenceDirectory(staging, { writer: "new" });
      await assert.rejects(() => publishSealedDirectory(staging, destination), /refusing to replace published evidence directory/);
      assert.deepEqual(await readdir(destination), []);
      assert.deepEqual(verifyEvidenceDirectory(staging).metadata, { writer: "new" });
    });
  });

  await context.test("sealed destination appearing during rename", { concurrency: false }, async () => {
    await withTemporaryDirectory("tsts-sealed-destination-race-", async (root) => {
      const staging = await createEvidenceDirectory(root, "staging", "new\n");
      const racer = await createEvidenceDirectory(root, "racer", "racer\n");
      const destination = join(root, "destination");
      await sealEvidenceDirectory(staging, { writer: "new" });
      await sealEvidenceDirectory(racer, { writer: "racer" });

      const originalRename = fsPromises.rename;
      let raced = false;
      fsPromises.rename = async function renameWithDestinationRace(oldPath, newPath) {
        if (!raced && basename(oldPath) === "staging" && basename(newPath) === "destination") {
          raced = true;
          await originalRename(racer, destination);
        }
        return originalRename(oldPath, newPath);
      };
      syncBuiltinESMExports();
      try {
        await assert.rejects(() => publishSealedDirectory(staging, destination), /refusing to replace published evidence directory/);
        assert.equal(raced, true);
      } finally {
        fsPromises.rename = originalRename;
        syncBuiltinESMExports();
      }

      assert.deepEqual(verifyEvidenceDirectory(destination).metadata, { writer: "racer" });
      assert.deepEqual(verifyEvidenceDirectory(staging).metadata, { writer: "new" });
    });
  });

  await context.test("concurrent publishers", async () => {
    await withTemporaryDirectory("tsts-sealed-publish-race-", async (root) => {
      const stagingLeft = await createEvidenceDirectory(root, "staging-left", "left\n");
      const stagingRight = await createEvidenceDirectory(root, "staging-right", "right\n");
      await sealEvidenceDirectory(stagingLeft, { writer: "left" });
      await sealEvidenceDirectory(stagingRight, { writer: "right" });
      const destination = join(root, "destination");
      const results = await Promise.allSettled([
        publishSealedDirectory(stagingLeft, destination),
        publishSealedDirectory(stagingRight, destination),
      ]);
      assert.equal(results.filter((result) => result.status === "fulfilled").length, 1);
      assert.equal(results.filter((result) => result.status === "rejected").length, 1);
      const rejection = results.find((result) => result.status === "rejected");
      assert.match(rejection.reason.message, /refusing (?:concurrent publication|to replace published evidence directory)/);
      const winnerIndex = results.findIndex((result) => result.status === "fulfilled");
      const winner = winnerIndex === 0 ? "left" : "right";
      const loserDirectory = winnerIndex === 0 ? stagingRight : stagingLeft;
      assert.deepEqual(verifyEvidenceDirectory(destination).metadata, { writer: winner });
      assert.deepEqual(verifyEvidenceDirectory(loserDirectory).metadata, { writer: winner === "left" ? "right" : "left" });
      assert.equal((await readdir(root)).some((name) => name.startsWith(".tsts-sealed-evidence-publish-")), false);
    });
  });
});

filesystemTest("consumers receive and parse the exact bytes that verification hashed", async () => {
  await withTemporaryDirectory("tsts-sealed-exact-bytes-", async (root) => {
    const directory = join(root, "evidence");
    const payload = Buffer.from("{\n  \"answer\": 42,\n  \"status\": \"exact\"\n}\n", "utf8");
    await mkdir(directory);
    await writeFile(join(directory, "payload.json"), payload);
    await sealEvidenceDirectory(directory, { outcome: "passed" });

    const raw = readVerifiedEvidenceFile(directory, "payload.json");
    const parsed = readVerifiedEvidenceJson(directory, "payload.json");
    assert.deepEqual(raw.bytes, payload);
    assert.deepEqual(parsed.bytes, payload);
    assert.deepEqual(parsed.value, { answer: 42, status: "exact" });
    assert.equal(raw.seal.evidenceDigest, parsed.seal.evidenceDigest);

    await writeFile(join(directory, "payload.json"), "{\"answer\":0}\n");
    assert.deepEqual(raw.bytes, payload);
    assert.deepEqual(parsed.value, { answer: 42, status: "exact" });
    assert.throws(() => verifyEvidenceDirectory(directory), /inventory mismatch/);
  });
});

test("sealed evidence fails closed without secure no-follow traversal", { skip: secureFilesystemAvailable }, async () => {
  await withTemporaryDirectory("tsts-sealed-unsupported-", async (root) => {
    const directory = await createEvidenceDirectory(root, "evidence", "value\n");
    await assert.rejects(() => sealEvidenceDirectory(directory, { outcome: "passed" }), /unavailable.*refusing sealed evidence operation/);
  });
});

async function createEvidenceDirectory(root, name, contents) {
  const directory = join(root, name);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "value.txt"), contents);
  return directory;
}

async function withTemporaryDirectory(prefix, action) {
  const root = await mkdtemp(join(canonicalTempRoot, prefix));
  try {
    return await action(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}
