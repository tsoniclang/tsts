import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative } from "node:path";

export async function copyPublishedPackage({
  sourceRoot,
  targetRoot,
  expectedName,
}) {
  const artifact = inspectPublishedPackage(sourceRoot, expectedName);
  const hash = createHash("sha256");
  for (const path of artifact.files) {
    const source = join(sourceRoot, path);
    const target = join(targetRoot, path);
    const bytes = await readFile(source);
    hash.update(String(Buffer.byteLength(path, "utf8")));
    hash.update(":");
    hash.update(path);
    hash.update(String(bytes.byteLength));
    hash.update(":");
    hash.update(bytes);
    await mkdir(dirname(target), { recursive: true });
    await copyFile(source, target);
  }
  return Object.freeze({
    name: artifact.name,
    version: artifact.version,
    files: artifact.files,
    digest: hash.digest("hex"),
  });
}

export function inspectPublishedPackage(sourceRoot, expectedName) {
  const packed = spawnSync(
    "npm",
    ["pack", "--dry-run", "--json", "--ignore-scripts"],
    {
      cwd: sourceRoot,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
    },
  );
  if (packed.error !== undefined) {
    throw packed.error;
  }
  if (packed.signal !== null) {
    throw new Error(`npm pack for '${expectedName}' terminated by ${packed.signal}`);
  }
  if (packed.status !== 0) {
    throw new Error(
      `npm pack for '${expectedName}' failed (${String(packed.status)})\n${packed.stderr}`,
    );
  }
  const records = JSON.parse(packed.stdout);
  if (!Array.isArray(records) || records.length !== 1) {
    throw new Error(`npm pack for '${expectedName}' returned an invalid package record`);
  }
  const record = records[0];
  if (!isRecord(record) || record["name"] !== expectedName) {
    throw new Error(
      `Package at '${sourceRoot}' is '${String(record?.["name"])}', expected '${expectedName}'`,
    );
  }
  const version = record["version"];
  const packedFiles = record["files"];
  if (
    typeof version !== "string" ||
    version.length === 0 ||
    !Array.isArray(packedFiles)
  ) {
    throw new Error(`Published package record for '${expectedName}' is incomplete`);
  }
  const files = packedFiles.map((file) => {
    if (!isRecord(file)) {
      throw new Error(`Published file record for '${expectedName}' is invalid`);
    }
    return validateRelativePath(file["path"], expectedName);
  });
  const sorted = [...files].sort();
  if (
    files.length === 0 ||
    new Set(files).size !== files.length ||
    !files.includes("package.json")
  ) {
    throw new Error(`Published file set for '${expectedName}' is not canonical`);
  }
  return Object.freeze({ name: expectedName, version, files: Object.freeze(sorted) });
}

function validateRelativePath(value, packageName) {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    isAbsolute(value) ||
    value.includes("\\") ||
    relative(".", value).startsWith("..") ||
    value.split("/").some((part) => part.length === 0 || part === "." || part === "..")
  ) {
    throw new Error(
      `Published path '${String(value)}' for '${packageName}' is invalid`,
    );
  }
  return value;
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
