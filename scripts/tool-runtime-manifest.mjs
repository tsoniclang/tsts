import { spawnSync } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { isAbsolute, join, relative, resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";

import {
  copyPublishedPackage,
  digestPackageFiles,
  digestPublishedPackage,
} from "./package-artifact.mjs";

const manifestName = "tool-runtime-manifest.json";
const rootPackageText = `${JSON.stringify({
  private: true,
  type: "module",
}, undefined, 2)}\n`;
const submoduleSelections = Object.freeze([
  "tools/gotots",
  "tools/tsonic",
  "tools/tsonic-typescript",
  "tools/tsts-legacy",
  "tools/typescript-runtime",
  "vendor/typescript-go",
]);
const packageSelections = Object.freeze([
  Object.freeze({
    source: "tools/tsonic/packages/host",
    target: "node_modules/@tsonic/host",
    name: "@tsonic/host",
  }),
  Object.freeze({
    source: "tools/tsonic/packages/source-core",
    target: "node_modules/@tsonic/source-core",
    name: "@tsonic/source-core",
  }),
  Object.freeze({
    source: "tools/tsonic/packages/target-api",
    target: "node_modules/@tsonic/target-api",
    name: "@tsonic/target-api",
  }),
  Object.freeze({
    source: "tools/tsonic-typescript",
    target: "node_modules/@tsonic/target-typescript",
    name: "@tsonic/target-typescript",
  }),
  Object.freeze({
    source: "tools/tsts-legacy/packages/tsts",
    target: "node_modules/@tsonic/tsts",
    name: "@tsonic/tsts",
  }),
  Object.freeze({
    source: "tools/typescript-runtime",
    target: "node_modules/@tsonic/typescript-runtime",
    name: "@tsonic/typescript-runtime",
  }),
]);

export async function sealToolRuntime(repositoryArgument, runtimeArgument) {
  const repositoryRoot = resolve(repositoryArgument);
  const runtimeRoot = resolve(
    runtimeArgument ?? join(repositoryRoot, ".temp", "tool-runtime"),
  );
  await mkdir(runtimeRoot, { recursive: true });
  const existing = await listPhysicalFiles(runtimeRoot);
  if (existing.length !== 0) {
    throw new Error("Tool runtime output must be empty before it is sealed");
  }

  const submodules = await verifyToolRuntimeSelection(repositoryRoot);
  const packages = [];
  await writeFile(join(runtimeRoot, "package.json"), rootPackageText, "utf8");
  for (const selection of packageSelections) {
    const artifact = await copyPublishedPackage({
      sourceRoot: join(repositoryRoot, selection.source),
      targetRoot: join(runtimeRoot, selection.target),
      expectedName: selection.name,
    });
    packages.push(Object.freeze({
      source: selection.source,
      target: selection.target,
      ...artifact,
    }));
  }
  const manifest = Object.freeze({
    schemaVersion: 2,
    submodules,
    packages: Object.freeze(packages),
  });
  await writeFile(
    join(runtimeRoot, manifestName),
    `${JSON.stringify(manifest, undefined, 2)}\n`,
    "utf8",
  );
  await verifyToolRuntime(repositoryRoot, runtimeRoot);
  return manifest;
}

export async function verifyToolRuntime(repositoryArgument, runtimeArgument) {
  const repositoryRoot = resolve(repositoryArgument);
  const runtimeRoot = resolve(
    runtimeArgument ?? join(repositoryRoot, ".temp", "tool-runtime"),
  );
  const manifest = parseManifest(
    await readFile(join(runtimeRoot, manifestName), "utf8"),
  );
  const selectedSubmodules = await verifyToolRuntimeSelection(repositoryRoot);
  if (!isDeepStrictEqual(manifest.submodules, selectedSubmodules)) {
    throw new Error("Selected submodule identities differ from the sealed tool runtime");
  }

  for (const [index, selection] of packageSelections.entries()) {
    const sealed = manifest.packages[index];
    const sourceArtifact = await digestPublishedPackage(
      join(repositoryRoot, selection.source),
      selection.name,
    );
    const sourceRecord = {
      source: selection.source,
      target: selection.target,
      ...sourceArtifact,
    };
    if (!isDeepStrictEqual(sealed, sourceRecord)) {
      throw new Error(
        `Tool runtime source package '${selection.name}' differs from its sealed content`,
      );
    }

    const assembledRoot = join(runtimeRoot, selection.target);
    const assembledFiles = await listPhysicalFiles(assembledRoot);
    if (!isDeepStrictEqual(assembledFiles, sealed.files)) {
      throw new Error(
        `Tool runtime assembled package '${selection.name}' membership differs ` +
          "from its sealed content",
      );
    }
    const assembledDigest = await digestPackageFiles(assembledRoot, sealed.files);
    if (assembledDigest !== sealed.digest) {
      throw new Error(
        `Tool runtime assembled package '${selection.name}' differs from its sealed content`,
      );
    }
  }

  if (await readFile(join(runtimeRoot, "package.json"), "utf8") !== rootPackageText) {
    throw new Error("Tool runtime root package differs from its sealed content");
  }
  const expectedFiles = ["package.json", manifestName];
  for (const record of manifest.packages) {
    expectedFiles.push(...record.files.map((path) => `${record.target}/${path}`));
  }
  expectedFiles.sort();
  const physicalFiles = await listPhysicalFiles(runtimeRoot);
  if (!isDeepStrictEqual(physicalFiles, expectedFiles)) {
    throw new Error("Tool runtime physical membership differs from its manifest");
  }
  return manifest;
}

export function verifyToolRuntimeSelection(repositoryArgument) {
  const repositoryRoot = resolve(repositoryArgument);
  const output = runGit(
    repositoryRoot,
    ["ls-files", "--stage", "--", ...submoduleSelections],
    "read selected submodule gitlinks",
  );
  const records = new Map();
  for (const line of output.split("\n").filter((value) => value.length !== 0)) {
    const match = /^160000 ([0-9a-f]{40}|[0-9a-f]{64}) 0\t([^\t]+)$/u.exec(line);
    if (match === null || records.has(match[2])) {
      throw new Error(`Selected submodule record '${line}' is invalid`);
    }
    records.set(match[2], match[1]);
  }
  if (
    records.size !== submoduleSelections.length ||
    submoduleSelections.some((path) => !records.has(path))
  ) {
    throw new Error("Selected submodule gitlinks are incomplete");
  }

  return Object.freeze(submoduleSelections.map((path) => {
    const checkoutRoot = join(repositoryRoot, path);
    const selectedGitlink = records.get(path);
    const actualRoot = resolve(runGit(
      checkoutRoot,
      ["rev-parse", "--show-toplevel"],
      `locate submodule '${path}'`,
    ));
    if (actualRoot !== resolve(checkoutRoot)) {
      throw new Error(`Selected submodule '${path}' is not initialized`);
    }
    const actualGitlink = runGit(
      checkoutRoot,
      ["rev-parse", "--verify", "HEAD^{commit}"],
      `read submodule '${path}' revision`,
    );
    if (actualGitlink !== selectedGitlink) {
      throw new Error(
        `Selected submodule '${path}' is at '${actualGitlink}', expected '${selectedGitlink}'`,
      );
    }
    const status = runGit(
      checkoutRoot,
      ["status", "--porcelain"],
      `inspect submodule '${path}'`,
    );
    if (status.length !== 0) {
      throw new Error(`Selected submodule '${path}' contains uncommitted changes`);
    }
    return Object.freeze({ path, gitlink: selectedGitlink });
  }));
}

function parseManifest(text) {
  const manifest = JSON.parse(text);
  assertRecord(manifest, "Tool runtime manifest");
  assertFields(
    manifest,
    ["packages", "schemaVersion", "submodules"],
    "Tool runtime manifest",
  );
  if (manifest.schemaVersion !== 2) {
    throw new Error("Tool runtime manifest schemaVersion must be 2");
  }
  if (
    !Array.isArray(manifest.submodules) ||
    manifest.submodules.length !== submoduleSelections.length
  ) {
    throw new Error("Tool runtime manifest submodules are incomplete");
  }
  for (const [index, path] of submoduleSelections.entries()) {
    const record = manifest.submodules[index];
    assertRecord(record, `Tool runtime submodule '${path}'`);
    assertFields(record, ["gitlink", "path"], `Tool runtime submodule '${path}'`);
    if (
      record.path !== path ||
      typeof record.gitlink !== "string" ||
      !/^(?:[0-9a-f]{40}|[0-9a-f]{64})$/u.test(record.gitlink)
    ) {
      throw new Error(`Tool runtime submodule '${path}' identity is invalid`);
    }
  }
  if (
    !Array.isArray(manifest.packages) ||
    manifest.packages.length !== packageSelections.length
  ) {
    throw new Error("Tool runtime manifest packages are incomplete");
  }
  for (const [index, selection] of packageSelections.entries()) {
    const record = manifest.packages[index];
    assertRecord(record, `Tool runtime package '${selection.name}'`);
    assertFields(
      record,
      ["digest", "files", "name", "source", "target", "version"],
      `Tool runtime package '${selection.name}'`,
    );
    if (
      record.source !== selection.source ||
      record.target !== selection.target ||
      record.name !== selection.name
    ) {
      throw new Error(`Tool runtime package '${selection.name}' selection is invalid`);
    }
    if (typeof record.version !== "string" || record.version.length === 0) {
      throw new Error(`Tool runtime package '${selection.name}' version is invalid`);
    }
    if (
      !Array.isArray(record.files) ||
      record.files.length === 0 ||
      !record.files.every((path) => typeof path === "string")
    ) {
      throw new Error(`Tool runtime package '${selection.name}' files are invalid`);
    }
    const files = record.files.map((path) => validateRelativePath(path, selection.name));
    if (
      new Set(files).size !== files.length ||
      !files.includes("package.json") ||
      !isDeepStrictEqual(files, [...files].sort())
    ) {
      throw new Error(`Tool runtime package '${selection.name}' files are not canonical`);
    }
    if (typeof record.digest !== "string" || !/^[0-9a-f]{64}$/u.test(record.digest)) {
      throw new Error(`Tool runtime package '${selection.name}' digest is invalid`);
    }
  }
  return manifest;
}

async function listPhysicalFiles(root, directory = "") {
  const paths = [];
  for (const entry of await readdir(join(root, directory), { withFileTypes: true })) {
    const path = directory.length === 0 ? entry.name : `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      paths.push(...await listPhysicalFiles(root, path));
    } else if (entry.isFile()) {
      paths.push(path);
    } else {
      throw new Error(`Tool runtime path '${path}' is not a regular file`);
    }
  }
  return paths.sort();
}

function validateRelativePath(value, packageName) {
  if (
    value.length === 0 ||
    isAbsolute(value) ||
    value.includes("\\") ||
    relative(".", value).startsWith("..") ||
    value.split("/").some((part) => part.length === 0 || part === "." || part === "..")
  ) {
    throw new Error(
      `Tool runtime path '${String(value)}' for '${packageName}' is invalid`,
    );
  }
  return value;
}

function assertRecord(value, subject) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${subject} must be an object`);
  }
}

function assertFields(record, expected, subject) {
  const actual = Object.keys(record).sort();
  if (!isDeepStrictEqual(actual, expected)) {
    throw new Error(`${subject} fields are invalid`);
  }
}

function runGit(repositoryRoot, arguments_, subject) {
  const result = spawnSync("git", ["-C", repositoryRoot, ...arguments_], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (result.error !== undefined) {
    throw result.error;
  }
  if (result.signal !== null || result.status !== 0) {
    throw new Error(
      `Failed to ${subject}: status=${String(result.status)} ` +
        `signal=${String(result.signal)}\n${result.stdout}${result.stderr}`,
    );
  }
  return result.stdout.trim();
}
