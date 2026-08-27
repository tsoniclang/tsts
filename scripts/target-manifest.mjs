import { createHash } from "node:crypto";
import { lstat, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { isDeepStrictEqual } from "node:util";

import { compareCodeUnits, compareRecordPaths } from "./canonical-order.mjs";

export const targetManifestName = "tsts-target-manifest.json";

export async function sealTargetManifest(
  targetRoot,
  canonicalSemanticDigest,
  targetProfileDigest,
  toolchainDigest,
) {
  try {
    await lstat(join(targetRoot, targetManifestName));
    throw new Error("Target manifest exists before the target assembly is sealed");
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
  const manifest = {
    schemaVersion: 3,
    canonicalSemanticDigest: requireDigest(canonicalSemanticDigest, "canonical semantic"),
    targetProfileDigest: requireDigest(targetProfileDigest, "target profile"),
    toolchainDigest: requireDigest(toolchainDigest, "toolchain"),
    members: await listMembers(targetRoot),
  };
  await writeFile(join(targetRoot, targetManifestName), encodeManifest(manifest), "utf8");
  return freezeResult(manifest);
}

export async function verifyTargetManifest(
  targetRoot,
  canonicalSemanticDigest,
  targetProfileDigest,
) {
  const manifest = await readTargetManifest(targetRoot);
  assertEqual(
    "canonical semantic digest",
    manifest.canonicalSemanticDigest,
    requireDigest(canonicalSemanticDigest, "canonical semantic"),
  );
  assertEqual(
    "target profile digest",
    manifest.targetProfileDigest,
    requireDigest(targetProfileDigest, "target profile"),
  );
  const physical = await listMembers(targetRoot);
  if (!isDeepStrictEqual(physical, manifest.members)) {
    throw new Error(
      "TypeScript target content, type, or membership differs from its manifest",
    );
  }
  return manifest;
}

export async function readTargetManifest(targetRoot) {
  const text = await readFile(join(targetRoot, targetManifestName), "utf8");
  if ((await lstat(join(targetRoot, targetManifestName))).nlink !== 1) {
    throw new Error("TypeScript target manifest is a hard link");
  }
  const manifest = parseRecord(text, "TypeScript target manifest");
  rejectUnknownKeys(
    manifest,
    new Set([
      "schemaVersion",
      "canonicalSemanticDigest",
      "targetProfileDigest",
      "toolchainDigest",
      "members",
    ]),
    "TypeScript target manifest",
  );
  if (manifest.schemaVersion !== 3 || text !== encodeManifest(manifest)) {
    throw new Error("TypeScript target manifest schema or encoding is not canonical");
  }
  requireDigest(manifest.canonicalSemanticDigest, "canonical semantic");
  requireDigest(manifest.targetProfileDigest, "target profile");
  requireDigest(manifest.toolchainDigest, "toolchain");
  validateMembers(manifest.members);
  return freezeResult(manifest);
}

export async function verifyTargetSourceManifest(targetRoot) {
  const manifest = await readTargetManifest(targetRoot);
  if (manifest.members.some((member) => member.path === "out" || member.path.startsWith("out/"))) {
    throw new Error("TypeScript target source manifest includes emitted output");
  }
  const physical = await listMembers(targetRoot, "", new Set(["out"]));
  assertManifestMembers("TypeScript target source", physical, manifest.members);
  return manifest;
}

async function listMembers(root, directory = "", excludedRootDirectories = new Set()) {
  const records = [];
  for (const entry of await readdir(join(root, directory), { withFileTypes: true })) {
    const path = directory.length === 0 ? entry.name : `${directory}/${entry.name}`;
    if (directory.length === 0 && entry.isDirectory() && excludedRootDirectories.has(entry.name)) {
      continue;
    }
    if (path === targetManifestName) {
      continue;
    }
    if (entry.isDirectory()) {
      records.push(...await listMembers(root, path, excludedRootDirectories));
    } else if (entry.isFile()) {
      const absolute = join(root, path);
      if ((await lstat(absolute)).nlink !== 1) {
        throw new Error(`TypeScript target member '${path}' is a hard link`);
      }
      const bytes = await readFile(absolute);
      records.push({
        path,
        type: "file",
        size: bytes.byteLength,
        digest: createHash("sha256").update(bytes).digest("hex"),
      });
    } else {
      throw new Error(`TypeScript target member '${path}' is not a regular file`);
    }
  }
  return records.sort(compareRecordPaths);
}

function validateMembers(members) {
  if (!Array.isArray(members)) {
    throw new Error("TypeScript target manifest members must be an array");
  }
  const paths = [];
  for (const member of members) {
    if (!isRecord(member)) {
      throw new Error("TypeScript target manifest member must be an object");
    }
    rejectUnknownKeys(member, new Set(["path", "type", "size", "digest"]), "TypeScript target member");
    if (
      typeof member.path !== "string" || member.path.length === 0 ||
      member.type !== "file" || !Number.isSafeInteger(member.size) || member.size < 0
    ) {
      throw new Error("TypeScript target manifest member identity is invalid");
    }
    requireDigest(member.digest, `target member '${member.path}'`);
    paths.push(member.path);
  }
  if (!isDeepStrictEqual(paths, [...new Set(paths)].sort(compareCodeUnits))) {
    throw new Error("TypeScript target manifest members must be unique and sorted");
  }
}

function assertManifestMembers(subject, actual, expected) {
  const actualByPath = new Map(actual.map((member) => [member.path, member]));
  const expectedByPath = new Map(expected.map((member) => [member.path, member]));
  const missing = expected.find((member) => !actualByPath.has(member.path));
  if (missing !== undefined) {
    throw new Error(`${subject} member '${missing.path}' is missing`);
  }
  const extra = actual.find((member) => !expectedByPath.has(member.path));
  if (extra !== undefined) {
    throw new Error(`${subject} has unmanifested member '${extra.path}'`);
  }
  const changed = expected.find((member) =>
    !isDeepStrictEqual(actualByPath.get(member.path), member)
  );
  if (changed !== undefined) {
    throw new Error(`${subject} member '${changed.path}' differs from its manifest`);
  }
}

function freezeResult(manifest) {
  return Object.freeze({
    canonicalSemanticDigest: manifest.canonicalSemanticDigest,
    targetProfileDigest: manifest.targetProfileDigest,
    files: Object.freeze(manifest.members.map((member) => member.path)),
    members: Object.freeze(manifest.members.map((member) => Object.freeze({ ...member }))),
    toolchainDigest: manifest.toolchainDigest,
  });
}

function encodeManifest(manifest) {
  return `${JSON.stringify({
    schemaVersion: manifest.schemaVersion,
    canonicalSemanticDigest: manifest.canonicalSemanticDigest,
    targetProfileDigest: manifest.targetProfileDigest,
    toolchainDigest: manifest.toolchainDigest,
    members: manifest.members,
  }, undefined, 2)}\n`;
}

function requireDigest(value, subject) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/u.test(value)) {
    throw new Error(`${subject} digest must be lowercase SHA-256`);
  }
  return value;
}

function parseRecord(text, subject) {
  const value = JSON.parse(text);
  if (!isRecord(value)) {
    throw new Error(`${subject} must be an object`);
  }
  return value;
}

function rejectUnknownKeys(value, allowed, subject) {
  const unexpected = Object.keys(value).find((key) => !allowed.has(key));
  if (unexpected !== undefined || Object.keys(value).length !== allowed.size) {
    throw new Error(`${subject} fields are invalid`);
  }
}

function assertEqual(subject, actual, expected) {
  if (actual !== expected) {
    throw new Error(`${subject} differs: expected=${expected} actual=${String(actual)}`);
  }
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
