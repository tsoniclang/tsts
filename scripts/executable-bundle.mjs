import { spawnSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { lstat, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { isDeepStrictEqual } from "node:util";

import { compareCodeUnits } from "./canonical-order.mjs";
import { replaceDirectory } from "./directory-transaction.mjs";
import { removeSuccessfulScratchTree } from "./scratch-lifecycle.mjs";
import { prettyCanonical } from "./toolchain-files.mjs";

export const executableBundleManifestName = "tsts-executable-manifest.json";

export async function bundleExecutable({
  repositoryRoot: repositoryArgument,
  targetRoot: targetArgument,
  toolchain,
  targetProfile,
}) {
  const repositoryRoot = resolve(repositoryArgument);
  const targetRoot = resolve(targetArgument);
  if (targetProfile?.assembly?.modulePackaging !== "single-esm") {
    throw new Error("Executable bundling requires the selected single-esm profile");
  }
  if (targetProfile.assembly.minification !== "full") {
    throw new Error("Executable bundling requires the selected full-minification profile");
  }
  const bundler = selectedBundler(toolchain);
  const outputRoot = join(targetRoot, "out");
  const entry = join(outputRoot, "runner.js");
  await requireUniqueFile(entry, "Executable entry");

  const runIdentity = `${new Date().toISOString().replaceAll(/[:.]/gu, "-")}-${process.pid}-${randomUUID()}`;
  const runRoot = join(repositoryRoot, ".temp", "executable-bundles", runIdentity);
  const stagedRoot = join(runRoot, "product");
  const preservedRoot = join(runRoot, "unbundled");
  const output = join(stagedRoot, "tsts.mjs");
  const metafile = join(runRoot, "esbuild-metafile.json");
  await mkdir(stagedRoot, { recursive: true });

  const version = executeBundler(bundler.path, ["--version"], outputRoot).trim();
  if (version !== "0.28.0") {
    throw new Error(`Selected esbuild version '${version}' is not 0.28.0`);
  }
  executeBundler(bundler.path, [
    "runner.js",
    "--bundle",
    "--platform=node",
    "--format=esm",
    "--target=es2022",
    "--charset=utf8",
    "--legal-comments=none",
    "--log-level=warning",
    "--minify",
    "--tree-shaking=true",
    "--external:node:*",
    `--outfile=${output}`,
    `--metafile=${metafile}`,
  ], outputRoot);

  const manifest = await describeBundle({
    outputRoot,
    output,
    metafile,
    targetRoot,
    targetProfile,
    toolchain,
    bundler,
    version,
  });
  await writeFile(
    join(stagedRoot, executableBundleManifestName),
    prettyCanonical(manifest),
    "utf8",
  );
  await verifyExecutableBundle(stagedRoot, manifest);
  const preserved = await replaceDirectory(outputRoot, stagedRoot, preservedRoot);
  if (preserved === undefined) {
    throw new Error("Executable bundling lost its emitted input transaction");
  }
  await removeSuccessfulScratchTree(repositoryRoot, runRoot);
  return Object.freeze(manifest);
}

export async function verifyExecutableBundle(rootArgument, expected) {
  const root = resolve(rootArgument);
  const manifestPath = join(root, executableBundleManifestName);
  const text = await readFile(manifestPath, "utf8");
  const manifest = JSON.parse(text);
  validateManifest(manifest);
  if (text !== prettyCanonical(manifest) || !isDeepStrictEqual(manifest, expected)) {
    throw new Error("Executable bundle manifest is not canonical or exact");
  }
  const entries = [
    await describeFile(join(root, "tsts.mjs"), "tsts.mjs"),
    await describeFile(manifestPath, executableBundleManifestName),
  ];
  const physical = readdir(root, {
    withFileTypes: true,
  });
  const selected = await physical;
  if (
    selected.some((entry) => !entry.isFile()) ||
    !isDeepStrictEqual(
      selected.map((entry) => entry.name).sort(compareCodeUnits),
      ["tsts.mjs", executableBundleManifestName].sort(compareCodeUnits),
    )
  ) {
    throw new Error("Executable bundle physical membership is not exact");
  }
  if (!isDeepStrictEqual(entries[0], manifest.output)) {
    throw new Error("Executable bundle output differs from its manifest");
  }
  return Object.freeze(manifest);
}

async function describeBundle({
  outputRoot,
  output,
  metafile,
  targetRoot,
  targetProfile,
  toolchain,
  bundler,
  version,
}) {
  const metadata = JSON.parse(await readFile(metafile, "utf8"));
  if (!isRecord(metadata.inputs) || !isRecord(metadata.outputs)) {
    throw new Error("esbuild metafile has no exact input/output graph");
  }
  const inputs = [];
  for (const path of Object.keys(metadata.inputs).sort(compareCodeUnits)) {
    const absolute = requireContained(outputRoot, resolve(outputRoot, path), "bundle input");
    inputs.push(await describeFile(absolute, relativeSlash(outputRoot, absolute)));
  }
  inputs.sort((left, right) => compareCodeUnits(left.path, right.path));
  if (!inputs.some((input) => input.path === "runner.js")) {
    throw new Error("Executable bundle input graph does not contain its entry");
  }
  const outputEntry = Object.entries(metadata.outputs).find(([path]) =>
    resolve(outputRoot, path) === output
  );
  if (outputEntry === undefined || Object.keys(metadata.outputs).length !== 1) {
    throw new Error("esbuild emitted an unexpected output set");
  }
  if (!isRecord(outputEntry[1]) || outputEntry[1].entryPoint !== "runner.js") {
    throw new Error("esbuild output does not own the exact executable entry");
  }
  const externalImports = [];
  for (const record of outputEntry[1].imports ?? []) {
    if (!record.external) {
      continue;
    }
    if (typeof record.path !== "string" || !record.path.startsWith("node:")) {
      throw new Error(`Executable bundle retained unsupported external '${String(record.path)}'`);
    }
    externalImports.push(record.path);
  }
  const targetManifestPath = join(targetRoot, "tsts-target-manifest.json");
  return Object.freeze({
    schemaVersion: 1,
    targetSourceManifestDigest: digest(await readFile(targetManifestPath)),
    targetProfileDigest: targetProfile.digest,
    toolchainDigest: toolchain.digest,
    bundler: Object.freeze({
      key: "esbuild",
      version,
      digest: bundler.digest,
    }),
    entry: "runner.js",
    inputs: Object.freeze(inputs),
    externalImports: Object.freeze([...new Set(externalImports)].sort(compareCodeUnits)),
    output: await describeFile(output, "tsts.mjs"),
  });
}

function selectedBundler(toolchain) {
  const path = toolchain?.binaries?.esbuild;
  const record = toolchain?.manifest?.binaries?.find((entry) => entry.key === "esbuild");
  if (
    typeof path !== "string" || path.length === 0 ||
    !isRecord(record) || !isDigest(record.digest)
  ) {
    throw new Error("Exact toolchain has no certified esbuild binary");
  }
  return Object.freeze({ path, digest: record.digest });
}

function executeBundler(command, arguments_, cwd) {
  const result = spawnSync(command, arguments_, {
    cwd,
    encoding: "utf8",
    env: process.env,
    maxBuffer: 32 * 1024 * 1024,
    timeout: 5 * 60 * 1000,
  });
  if (result.error !== undefined) {
    throw result.error;
  }
  if (result.signal !== null || result.status !== 0) {
    throw new Error(
      `esbuild failed: status=${String(result.status)} signal=${String(result.signal)}\n${result.stdout}${result.stderr}`,
    );
  }
  if (result.stderr.length !== 0) {
    throw new Error(`esbuild emitted an unexpected warning\n${result.stderr}`);
  }
  return result.stdout;
}

function validateManifest(manifest) {
  const fields = [
    "bundler",
    "entry",
    "externalImports",
    "inputs",
    "output",
    "schemaVersion",
    "targetProfileDigest",
    "targetSourceManifestDigest",
    "toolchainDigest",
  ];
  if (
    !isRecord(manifest) ||
    !isDeepStrictEqual(Object.keys(manifest).sort(compareCodeUnits), fields) ||
    manifest.schemaVersion !== 1 || manifest.entry !== "runner.js" ||
    !isDigest(manifest.targetProfileDigest) ||
    !isDigest(manifest.targetSourceManifestDigest) ||
    !isDigest(manifest.toolchainDigest)
  ) {
    throw new Error("Executable bundle manifest identity is invalid");
  }
  if (
    !isRecord(manifest.bundler) ||
    !isDeepStrictEqual(
      Object.keys(manifest.bundler).sort(compareCodeUnits),
      ["digest", "key", "version"],
    ) ||
    manifest.bundler.key !== "esbuild" || manifest.bundler.version !== "0.28.0" ||
    !isDigest(manifest.bundler.digest)
  ) {
    throw new Error("Executable bundle bundler identity is invalid");
  }
  validateMembers(manifest.inputs, "Executable bundle inputs", false);
  validateMembers([manifest.output], "Executable bundle output", true);
  if (
    !Array.isArray(manifest.externalImports) ||
    !manifest.externalImports.every((path) =>
      typeof path === "string" && path.startsWith("node:")
    ) ||
    !isDeepStrictEqual(
      manifest.externalImports,
      [...new Set(manifest.externalImports)].sort(compareCodeUnits),
    )
  ) {
    throw new Error("Executable bundle external imports are invalid");
  }
}

function validateMembers(members, subject, output) {
  if (!Array.isArray(members) || members.length === 0) {
    throw new Error(`${subject} are empty`);
  }
  for (const member of members) {
    if (
      !isRecord(member) ||
      !isDeepStrictEqual(
        Object.keys(member).sort(compareCodeUnits),
        ["digest", "path", "size"],
      ) ||
      typeof member.path !== "string" || member.path.length === 0 ||
      !Number.isSafeInteger(member.size) || member.size < 0 ||
      !isDigest(member.digest)
    ) {
      throw new Error(`${subject} contain an invalid member`);
    }
  }
  const paths = members.map((member) => member.path);
  if (!isDeepStrictEqual(paths, [...new Set(paths)].sort(compareCodeUnits))) {
    throw new Error(`${subject} are not unique and sorted`);
  }
  if (output && (members.length !== 1 || members[0].path !== "tsts.mjs")) {
    throw new Error("Executable bundle output path is invalid");
  }
}

async function describeFile(path, identity) {
  await requireUniqueFile(path, `Executable member '${identity}'`);
  const bytes = await readFile(path);
  return Object.freeze({
    path: identity,
    size: bytes.byteLength,
    digest: digest(bytes),
  });
}

async function requireUniqueFile(path, subject) {
  const selected = await lstat(path);
  if (!selected.isFile() || selected.nlink !== 1) {
    throw new Error(`${subject} is not a unique regular file`);
  }
}

function requireContained(root, path, subject) {
  const selected = relative(root, path);
  if (
    selected.length === 0 || isAbsolute(selected) || selected === ".." ||
    selected.startsWith(`..${sep}`)
  ) {
    throw new Error(`${subject} escapes the emitted output root`);
  }
  return path;
}

function relativeSlash(root, path) {
  return relative(root, path).split(sep).join("/");
}

function digest(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function isDigest(value) {
  return typeof value === "string" && /^[0-9a-f]{64}$/u.test(value);
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
