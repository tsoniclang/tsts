import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmod, copyFile, lstat, mkdir, readFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative } from "node:path";

import { compareCodeUnits } from "./canonical-order.mjs";

export async function copyPublishedPackage({
  sourceRoot,
  targetRoot,
  expectedName,
  npmExecutable,
  environment,
  mode = 0o444,
}) {
  const artifact = inspectPublishedPackage(
    sourceRoot,
    expectedName,
    npmExecutable,
    environment,
  );
  const digest = await copyExactFiles({
    sourceRoot,
    targetRoot,
    files: artifact.files,
    mode,
  });
  return Object.freeze({ ...artifact, digest });
}

export async function copyExactFiles({
  sourceRoot,
  targetRoot,
  files,
  mode = 0o644,
}) {
  const hash = createHash("sha256");
  for (const path of files) {
    const source = join(sourceRoot, path);
    const info = await lstat(source);
    if (!info.isFile()) {
      throw new Error(`Package member '${path}' is not a regular file`);
    }
    if (info.nlink !== 1) {
      throw new Error(`Package member '${path}' is a hard link`);
    }
    const bytes = await readFile(source);
    updateFileHash(hash, path, bytes);
    const target = join(targetRoot, path);
    await mkdir(dirname(target), { recursive: true });
    await copyFile(source, target);
    await chmod(target, mode);
  }
  return hash.digest("hex");
}

export async function digestExactFiles(root, files) {
  const hash = createHash("sha256");
  for (const path of files) {
    const target = join(root, path);
    const info = await lstat(target);
    if (!info.isFile()) {
      throw new Error(`Package member '${path}' is not a regular file`);
    }
    if (info.nlink !== 1) {
      throw new Error(`Package member '${path}' is a hard link`);
    }
    updateFileHash(hash, path, await readFile(target));
  }
  return hash.digest("hex");
}

export function inspectPublishedPackage(
  sourceRoot,
  expectedName,
  npmExecutable,
  environment,
) {
  if (
    typeof npmExecutable !== "string" || npmExecutable.length === 0
  ) {
    throw new Error("An exact npm executable is required to inspect a package");
  }
  if (
    typeof environment !== "object" || environment === null || Array.isArray(environment) ||
    typeof environment.PATH !== "string"
  ) {
    throw new Error("Package inspection requires an explicit closed environment");
  }
  const packed = spawnSync(
    npmExecutable,
    ["pack", "--dry-run", "--json", "--ignore-scripts"],
    {
      cwd: sourceRoot,
      encoding: "utf8",
      env: environment,
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
  if (typeof version !== "string" || version.length === 0 || !Array.isArray(packedFiles)) {
    throw new Error(`Published package record for '${expectedName}' is incomplete`);
  }
  const files = packedFiles.map((file) => {
    if (!isRecord(file)) {
      throw new Error(`Published file record for '${expectedName}' is invalid`);
    }
    const path = validateRelativePath(file["path"], expectedName);
    if (path.split("/").includes("node_modules")) {
      throw new Error(`Published package '${expectedName}' contains nested node_modules`);
    }
    return path;
  });
  const sorted = [...files].sort(compareCodeUnits);
  if (
    files.length === 0 ||
    new Set(files).size !== files.length ||
    !files.includes("package.json")
  ) {
    throw new Error(`Published file set for '${expectedName}' is not canonical`);
  }
  return Object.freeze({
    name: expectedName,
    version,
    files: Object.freeze(sorted),
  });
}

export function validateRelativePath(value, subject) {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    isAbsolute(value) ||
    value.includes("\\") ||
    relative(".", value).startsWith("..") ||
    value.split("/").some((part) => part.length === 0 || part === "." || part === "..")
  ) {
    throw new Error(`Published path '${String(value)}' for '${subject}' is invalid`);
  }
  return value;
}

function updateFileHash(hash, path, bytes) {
  hash.update(String(Buffer.byteLength(path, "utf8")));
  hash.update(":");
  hash.update(path);
  hash.update(String(bytes.byteLength));
  hash.update(":");
  hash.update(bytes);
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
