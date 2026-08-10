import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const manifestName = "tsts-target-manifest.json";

export async function sealTargetManifest(
  targetRoot,
  canonicalSemanticDigest,
  targetProfileDigest,
) {
  const beforeSeal = await listPhysicalFiles(targetRoot);
  if (beforeSeal.includes(manifestName)) {
    throw new Error("Target manifest exists before the target assembly is sealed");
  }
  const files = [...beforeSeal, manifestName].sort();
  await writeFile(join(targetRoot, manifestName), `${JSON.stringify({
    schemaVersion: 2,
    canonicalSemanticDigest: requireDigest(
      canonicalSemanticDigest,
      "canonical semantic",
    ),
    targetProfileDigest: requireDigest(targetProfileDigest, "target profile"),
    files,
  }, undefined, 2)}\n`, "utf8");
  return Object.freeze(files);
}

export async function verifyTargetManifest(
  targetRoot,
  canonicalSemanticDigest,
  targetProfileDigest,
) {
  const manifest = parseRecord(
    await readFile(join(targetRoot, manifestName), "utf8"),
    "TypeScript target manifest",
  );
  rejectUnknownKeys(
    manifest,
    new Set([
      "schemaVersion",
      "canonicalSemanticDigest",
      "targetProfileDigest",
      "files",
    ]),
    "TypeScript target manifest",
  );
  if (manifest["schemaVersion"] !== 2) {
    throw new Error("TypeScript target manifest schemaVersion must be 2");
  }
  assertEqual(
    "canonical semantic digest",
    manifest["canonicalSemanticDigest"],
    requireDigest(canonicalSemanticDigest, "canonical semantic"),
  );
  assertEqual(
    "target profile digest",
    manifest["targetProfileDigest"],
    requireDigest(targetProfileDigest, "target profile"),
  );
  const files = manifest["files"];
  if (!Array.isArray(files) || !files.every((path) => typeof path === "string")) {
    throw new Error("TypeScript target manifest files must be strings");
  }
  const expected = [...files].sort();
  if (
    new Set(files).size !== files.length ||
    files.some((path, index) => path !== expected[index])
  ) {
    throw new Error("TypeScript target manifest files must be unique and sorted");
  }
  const physical = await listPhysicalFiles(targetRoot);
  assertEqualPaths("TypeScript target manifest membership", files, physical);
  return Object.freeze([...files]);
}

async function listPhysicalFiles(root, directory = "") {
  const paths = [];
  for (const entry of await readdir(join(root, directory), { withFileTypes: true })) {
    const path = directory.length === 0 ? entry.name : `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      paths.push(...await listPhysicalFiles(root, path));
    } else {
      paths.push(path);
    }
  }
  return paths.sort();
}

function requireDigest(value, subject) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/u.test(value)) {
    throw new Error(`${subject} digest must be lowercase SHA-256`);
  }
  return value;
}

function parseRecord(text, subject) {
  const value = JSON.parse(text);
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${subject} must be an object`);
  }
  return value;
}

function rejectUnknownKeys(value, allowed, subject) {
  const unexpected = Object.keys(value).find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    throw new Error(`${subject} has unsupported field '${unexpected}'`);
  }
}

function assertEqual(subject, actual, expected) {
  if (actual !== expected) {
    throw new Error(`${subject} differs: expected=${expected} actual=${String(actual)}`);
  }
}

function assertEqualPaths(subject, expected, actual) {
  if (
    expected.length !== actual.length ||
    expected.some((path, index) => path !== actual[index])
  ) {
    throw new Error(
      `${subject} differs\nexpected=${JSON.stringify(expected)}\nactual=${JSON.stringify(actual)}`,
    );
  }
}
