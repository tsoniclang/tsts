import { createHash } from "node:crypto";
import { COPYFILE_FICLONE } from "node:constants";
import {
  chmod,
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
} from "node:fs/promises";
import { isAbsolute, join, relative, sep } from "node:path";
import { isDeepStrictEqual } from "node:util";

import { compareCodeUnits, compareRecordPaths } from "./canonical-order.mjs";

export async function describeNormalizedTree(
  root,
  subject,
  { requireSingleLink = false } = {},
) {
  const selectedRoot = await realpath(root);
  const directories = [];
  const members = [];

  async function visit(physicalDirectory, prefix, ancestors) {
    const resolvedDirectory = await requireContained(
      selectedRoot,
      physicalDirectory,
      prefix || ".",
      subject,
    );
    if (ancestors.has(resolvedDirectory)) {
      throw new Error(`${subject} directory '${prefix || "."}' forms a symlink cycle`);
    }
    const nextAncestors = new Set(ancestors).add(resolvedDirectory);
    const entries = await readdir(resolvedDirectory, { withFileTypes: true });
    entries.sort((left, right) => compareCodeUnits(left.name, right.name));
    for (const entry of entries) {
      const path = prefix.length === 0 ? entry.name : `${prefix}/${entry.name}`;
      const apparent = join(root, path);
      const info = await lstat(apparent);
      const selected = info.isSymbolicLink()
        ? await requireContained(selectedRoot, apparent, path, subject)
        : apparent;
      const selectedInfo = info.isSymbolicLink() ? await lstat(selected) : info;
      if (selectedInfo.isDirectory()) {
        directories.push(path);
        await visit(selected, path, nextAncestors);
        continue;
      }
      if (!selectedInfo.isFile()) {
        throw new Error(`${subject} member '${path}' is not an effective regular file`);
      }
      if (requireSingleLink && selectedInfo.nlink !== 1) {
        throw new Error(`${subject} member '${path}' is a hard link`);
      }
      const bytes = await readFile(selected);
      members.push({
        path,
        mode: (selectedInfo.mode & 0o111) === 0 ? 0o444 : 0o555,
        size: bytes.byteLength,
        digest: createHash("sha256").update(bytes).digest("hex"),
      });
    }
  }

  await visit(selectedRoot, "", new Set());
  directories.sort(compareCodeUnits);
  members.sort(compareRecordPaths);
  return freezeDescription(directories, members);
}

export async function copyNormalizedTree(sourceRoot, targetRoot, subject) {
  const source = await describeNormalizedTree(sourceRoot, subject);
  await mkdir(targetRoot, { recursive: true, mode: 0o755 });
  for (const directory of source.directories) {
    await mkdir(join(targetRoot, directory), { recursive: true, mode: 0o755 });
  }
  for (const member of source.members) {
    const target = join(targetRoot, member.path);
    await copyFile(join(sourceRoot, member.path), target, COPYFILE_FICLONE);
    await chmod(target, member.mode === 0o555 ? 0o755 : 0o644);
  }
  const copied = await describeNormalizedTree(targetRoot, subject, {
    requireSingleLink: true,
  });
  if (!isDeepStrictEqual(copied, source)) {
    throw new Error(`${subject} changed while its normalized tree was copied`);
  }
  return copied;
}

export function describeNormalizedRecords(directories, members) {
  return freezeDescription(directories, members);
}

async function requireContained(root, path, member, subject) {
  const selected = await realpath(path);
  const relativeTarget = relative(root, selected);
  if (
    isAbsolute(relativeTarget) || relativeTarget === ".." ||
    relativeTarget.startsWith(`..${sep}`)
  ) {
    throw new Error(`${subject} symlink '${member}' escapes its selected root`);
  }
  return selected;
}

function freezeDescription(directories, members) {
  const frozenDirectories = Object.freeze([...directories]);
  const frozenMembers = Object.freeze(members.map((record) => Object.freeze({ ...record })));
  const digest = createHash("sha256").update(JSON.stringify({
    directories: frozenDirectories,
    members: frozenMembers,
  })).digest("hex");
  return Object.freeze({
    directories: frozenDirectories,
    members: frozenMembers,
    executableFiles: Object.freeze(
      frozenMembers.filter((record) => record.mode === 0o555).map((record) => record.path),
    ),
    digest,
  });
}
