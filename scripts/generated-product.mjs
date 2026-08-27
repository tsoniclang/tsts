import { createHash, randomUUID } from "node:crypto";
import {
  lstat,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";

import { replaceDirectory } from "./directory-transaction.mjs";
import { describeNormalizedTree } from "./normalized-tree.mjs";
import { validateRelativePath } from "./package-artifact.mjs";
import { removeSuccessfulScratchTree } from "./scratch-lifecycle.mjs";
import {
  targetManifestName,
  verifyTargetManifest,
  verifyTargetSourceManifest,
} from "./target-manifest.mjs";

export const generatedProductDirectory = "generated";
export const generatedProductManifest = "manifest.json";

const generatedProductReadme = `# Generated TSTS Compiler

This directory is generated from the repository's pinned TS-Go, GoToTS, target,
profiles, and certified product implementations. Do not edit it by hand.

- \`source/\` contains the final executable TypeScript source.
- \`manifest.json\` binds that tree to the exact semantic, target-profile, and
  toolchain digests.

Refresh this directory only with \`npm run generate\`.
`;

export async function publishGeneratedProduct(
  repositoryArgument,
  targetArgument,
  publishedArgument,
) {
  const repositoryRoot = resolve(repositoryArgument);
  const targetRoot = resolve(targetArgument);
  const publishedRoot = resolve(publishedArgument);
  const target = await verifyTargetSourceManifest(targetRoot);

  const identity = `${Date.now()}-${process.pid}-${randomUUID()}`;
  const runRoot = join(repositoryRoot, ".temp", "generated-product-runs", identity);
  const stagedRoot = join(runRoot, "product");
  await mkdir(stagedRoot, { recursive: true });

  await copyManifestMembers(targetRoot, join(stagedRoot, "source"), target.members);
  await copyManifestFile(
    join(targetRoot, targetManifestName),
    join(stagedRoot, "source", targetManifestName),
  );
  const sourceTarget = await verifyTargetManifest(
    join(stagedRoot, "source"),
    target.canonicalSemanticDigest,
    target.targetProfileDigest,
  );
  if (sourceTarget.toolchainDigest !== target.toolchainDigest) {
    throw new Error("Published TypeScript source changed its toolchain identity");
  }
  const source = await describeNormalizedTree(
    join(stagedRoot, "source"),
    "Published TypeScript source",
    { requireSingleLink: true },
  );

  await writeFile(join(stagedRoot, "README.md"), generatedProductReadme, "utf8");
  const manifest = createProductManifest(target, source);
  await writeFile(
    join(stagedRoot, generatedProductManifest),
    encodeProductManifest(manifest),
    "utf8",
  );
  await verifyPublishedProduct(stagedRoot);

  const preservedRoot = join(
    repositoryRoot,
    ".temp",
    "preserved",
    `generated-${identity}`,
  );
  const preserved = await replaceDirectory(publishedRoot, stagedRoot, preservedRoot);
  if (preserved !== undefined) {
    await removeSuccessfulScratchTree(repositoryRoot, preserved);
  }
  await removeSuccessfulScratchTree(repositoryRoot, runRoot);
  return manifest;
}

export async function verifyPublishedProduct(publishedArgument) {
  const publishedRoot = resolve(publishedArgument);
  await verifyRootMembership(publishedRoot);
  if (await readFile(join(publishedRoot, "README.md"), "utf8") !== generatedProductReadme) {
    throw new Error("Generated product README differs from its canonical content");
  }
  const manifestText = await readFile(
    join(publishedRoot, generatedProductManifest),
    "utf8",
  );
  const manifest = parseProductManifest(manifestText);
  if (manifestText !== encodeProductManifest(manifest)) {
    throw new Error("Generated product manifest encoding is not canonical");
  }

  const sourceRoot = join(publishedRoot, "source");
  const sourceTarget = await verifyTargetManifest(
    sourceRoot,
    manifest.canonicalSemanticDigest,
    manifest.targetProfileDigest,
  );
  if (sourceTarget.toolchainDigest !== manifest.toolchainDigest) {
    throw new Error("Generated source toolchain digest differs from the product manifest");
  }
  const source = await describeNormalizedTree(
    sourceRoot,
    "Committed TypeScript source",
    { requireSingleLink: true },
  );
  assertTreeSummary("TypeScript source", source, manifest.source);
  requireMember(source, "runner.ts", "TypeScript source entrypoint");
  return Object.freeze({ manifest, source });
}

export async function verifyGeneratedProductMatches(
  targetArgument,
  publishedArgument,
) {
  const targetRoot = resolve(targetArgument);
  const published = await verifyPublishedProduct(publishedArgument);
  const target = await verifyTargetSourceManifest(targetRoot);
  for (const field of [
    "canonicalSemanticDigest",
    "targetProfileDigest",
    "toolchainDigest",
  ]) {
    if (target[field] !== published.manifest[field]) {
      throw new Error(`Current target ${field} differs from the committed product`);
    }
  }
  const currentTargetManifest = await readFile(join(targetRoot, targetManifestName));
  const publishedTargetManifest = await readFile(
    join(resolve(publishedArgument), "source", targetManifestName),
  );
  if (!currentTargetManifest.equals(publishedTargetManifest)) {
    throw new Error("Current target manifest differs from the committed product");
  }
  return published;
}

async function copyManifestMembers(sourceRoot, targetRoot, members) {
  for (const member of members) {
    const relativePath = validateRelativePath(member.path, "TypeScript target member");
    const bytes = await readCheckedMember(join(sourceRoot, relativePath), member);
    const target = join(targetRoot, relativePath);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, bytes, { mode: 0o644 });
  }
}

async function readCheckedMember(path, member) {
  const info = await lstat(path);
  if (!info.isFile() || info.nlink !== 1) {
    throw new Error(`TypeScript target member '${member.path}' is not an owned regular file`);
  }
  const bytes = await readFile(path);
  const digest = createHash("sha256").update(bytes).digest("hex");
  if (bytes.byteLength !== member.size || digest !== member.digest) {
    throw new Error(`TypeScript target member '${member.path}' differs from its manifest`);
  }
  return bytes;
}

async function copyManifestFile(source, target) {
  const info = await lstat(source);
  if (!info.isFile() || info.nlink !== 1) {
    throw new Error("TypeScript target manifest is not an owned regular file");
  }
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, await readFile(source), { mode: 0o644 });
}

function createProductManifest(target, source) {
  return Object.freeze({
    schemaVersion: 1,
    product: "@tsoniclang/tsts",
    canonicalSemanticDigest: target.canonicalSemanticDigest,
    targetProfileDigest: target.targetProfileDigest,
    toolchainDigest: target.toolchainDigest,
    source: treeSummary(source),
    entrypoint: "source/runner.ts",
  });
}

function parseProductManifest(text) {
  const manifest = JSON.parse(text);
  requireExactKeys(
    manifest,
    [
      "schemaVersion",
      "product",
      "canonicalSemanticDigest",
      "targetProfileDigest",
      "toolchainDigest",
      "source",
      "entrypoint",
    ],
    "Generated product manifest",
  );
  if (
    manifest.schemaVersion !== 1 ||
    manifest.product !== "@tsoniclang/tsts" ||
    manifest.entrypoint !== "source/runner.ts"
  ) {
    throw new Error("Generated product manifest identity is invalid");
  }
  for (const field of [
    "canonicalSemanticDigest",
    "targetProfileDigest",
    "toolchainDigest",
  ]) {
    requireDigest(manifest[field], `Generated product ${field}`);
  }
  validateTreeSummary(manifest.source, "TypeScript source");
  return manifest;
}

function encodeProductManifest(manifest) {
  return `${JSON.stringify(manifest, undefined, 2)}\n`;
}

function treeSummary(description) {
  return Object.freeze({
    digest: description.digest,
    files: description.members.length,
    bytes: description.members.reduce((total, member) => total + member.size, 0),
  });
}

function validateTreeSummary(summary, subject) {
  requireExactKeys(summary, ["digest", "files", "bytes"], `${subject} summary`);
  requireDigest(summary.digest, `${subject} tree`);
  if (
    !Number.isSafeInteger(summary.files) || summary.files < 1 ||
    !Number.isSafeInteger(summary.bytes) || summary.bytes < 1
  ) {
    throw new Error(`${subject} summary counts are invalid`);
  }
}

function assertTreeSummary(subject, actual, expected) {
  if (!isDeepStrictEqual(treeSummary(actual), expected)) {
    throw new Error(`${subject} tree differs from the generated product manifest`);
  }
}

function requireMember(description, path, subject) {
  if (!description.members.some((member) => member.path === path)) {
    throw new Error(`${subject} '${path}' is absent`);
  }
}

async function verifyRootMembership(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const actual = entries
    .map((entry) => `${entry.isDirectory() ? "directory" : "file"}:${entry.name}`)
    .sort();
  const expected = [
    "directory:source",
    "file:README.md",
    `file:${generatedProductManifest}`,
  ];
  if (!isDeepStrictEqual(actual, expected)) {
    throw new Error("Generated product root membership is invalid");
  }
}

function requireExactKeys(value, expected, subject) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${subject} must be an object`);
  }
  const actual = Object.keys(value).sort();
  const selected = [...expected].sort();
  if (!isDeepStrictEqual(actual, selected)) {
    throw new Error(`${subject} fields are invalid`);
  }
}

function requireDigest(value, subject) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/u.test(value)) {
    throw new Error(`${subject} digest is invalid`);
  }
}
