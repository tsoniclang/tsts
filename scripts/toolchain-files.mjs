import { createHash } from "node:crypto";
import { chmod, lstat, readFile, readdir } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { isDeepStrictEqual } from "node:util";

import { compareCodeUnits, compareRecordPaths } from "./canonical-order.mjs";
import { validateRelativePath } from "./package-artifact.mjs";

export async function normalizeToolchainModes(root, executablePaths, selectedBinaries) {
  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => compareCodeUnits(left.name, right.name));
    for (const entry of entries) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(path);
        await chmod(path, 0o555);
      } else if (entry.isFile()) {
        const relativePath = relative(root, path).split("\\").join("/");
        if ((await lstat(path)).nlink !== 1) {
          throw new Error(`Toolchain member '${relativePath}' is a hard link`);
        }
        const executable = executablePaths.has(relativePath) ||
          selectedBinaries.some((record) => record.path === relativePath);
        await chmod(path, executable ? 0o555 : 0o444);
      } else {
        throw new Error(`Toolchain path '${relative(root, path)}' is not a regular file`);
      }
    }
  }
  await visit(root);
}

export async function scanToolchain(root, manifestName) {
  const directories = [];
  const members = [];
  async function visit(directory, prefix) {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => compareCodeUnits(left.name, right.name));
    for (const entry of entries) {
      const path = prefix.length === 0 ? entry.name : `${prefix}/${entry.name}`;
      const absolute = join(root, path);
      if (entry.isDirectory()) {
        directories.push({ path, mode: (await lstat(absolute)).mode & 0o777 });
        await visit(absolute, path);
      } else if (entry.isFile()) {
        if (path === manifestName) continue;
        const info = await lstat(absolute);
        if (info.nlink !== 1) {
          throw new Error(`Toolchain member '${path}' is a hard link`);
        }
        members.push({
          path,
          mode: info.mode & 0o777,
          size: info.size,
          digest: digestBytes(await readFile(absolute)),
        });
      } else {
        throw new Error(`Toolchain path '${path}' is not a regular file`);
      }
    }
  }
  await visit(root, "");
  directories.sort(compareRecordPaths);
  members.sort(compareRecordPaths);
  return { directories, members };
}

export function validatePhysicalRecords(
  directories,
  members,
  { runtimeRoots, selectedBinaries },
) {
  if (!Array.isArray(directories) || !Array.isArray(members)) {
    throw new Error("Toolchain physical records are invalid");
  }
  for (const record of directories) {
    assertRecord(record, "Toolchain directory");
    assertFields(record, ["mode", "path"], "Toolchain directory");
    validateRelativePath(record.path, "toolchain directory");
    if (record.mode !== 0o555) {
      throw new Error(`Toolchain directory '${record.path}' mode is invalid`);
    }
  }
  for (const record of members) {
    assertRecord(record, "Toolchain member");
    assertFields(record, ["digest", "mode", "path", "size"], "Toolchain member");
    validateRelativePath(record.path, "toolchain member");
    const selectedBinary = selectedBinaries.some(({ path }) => path === record.path);
    const inRuntime = runtimeRoots.some((root) => record.path.startsWith(`${root}/`));
    const validMode = inRuntime
      ? record.mode === 0o444 || record.mode === 0o555
      : record.mode === (selectedBinary ? 0o555 : 0o444);
    if (
      !isDigest(record.digest) || !Number.isSafeInteger(record.size) || record.size < 0 ||
      !validMode
    ) {
      throw new Error(`Toolchain member '${record.path}' record is invalid`);
    }
  }
  for (const records of [directories, members]) {
    const paths = records.map((record) => record.path);
    if (!isDeepStrictEqual(paths, [...new Set(paths)].sort(compareCodeUnits))) {
      throw new Error("Toolchain physical records are not unique and sorted");
    }
  }
}

export function validateFileList(files, subject) {
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error(`${subject} files are incomplete`);
  }
  const selected = files.map((path) => validateRelativePath(path, subject));
  if (!isDeepStrictEqual(selected, [...new Set(selected)].sort(compareCodeUnits))) {
    throw new Error(`${subject} files are not unique and sorted`);
  }
}

export function directoriesFor(paths) {
  const result = new Set();
  for (const path of paths) {
    let directory = dirname(path).split("\\").join("/");
    while (directory !== ".") {
      result.add(directory);
      directory = dirname(directory).split("\\").join("/");
    }
  }
  return [...result].sort(compareCodeUnits);
}

export function addOwned(owned, paths) {
  for (const path of paths) {
    if (owned.has(path)) {
      throw new Error(`Toolchain member '${path}' has multiple owners`);
    }
    owned.add(path);
  }
}

export function digestCanonical(value) {
  return createHash("sha256").update(JSON.stringify(normalizeJson(value))).digest("hex");
}

export function prettyCanonical(value) {
  return `${JSON.stringify(normalizeJson(value), undefined, 2)}\n`;
}

export function assertRecord(value, subject) {
  if (!isRecord(value)) {
    throw new Error(`${subject} must be an object`);
  }
}

export function assertFields(record, expected, subject) {
  if (!isDeepStrictEqual(
    Object.keys(record).sort(compareCodeUnits),
    [...expected].sort(compareCodeUnits),
  )) {
    throw new Error(`${subject} fields are invalid`);
  }
}

export function isDigest(value) {
  return typeof value === "string" && /^[0-9a-f]{64}$/u.test(value);
}

export function isCommit(value) {
  return typeof value === "string" && /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/u.test(value);
}

export function deepFreeze(value) {
  if (!isRecord(value) && !Array.isArray(value)) return value;
  for (const entry of Object.values(value)) deepFreeze(entry);
  return Object.freeze(value);
}

function normalizeJson(value) {
  if (Array.isArray(value)) return value.map(normalizeJson);
  if (!isRecord(value)) return value;
  return Object.fromEntries(
    Object.keys(value).sort(compareCodeUnits).map((key) => [key, normalizeJson(value[key])]),
  );
}

function digestBytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
