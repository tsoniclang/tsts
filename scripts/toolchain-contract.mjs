import {
  chmod,
  lstat,
  readFile,
  writeFile,
} from "node:fs/promises";
import { join } from "node:path";
import { isDeepStrictEqual } from "node:util";

import { compareCodeUnits } from "./canonical-order.mjs";
import { validateGoModuleCacheRecord } from "./go-module-cache.mjs";
import { digestExactFiles, validateRelativePath } from "./package-artifact.mjs";
import { digestNormalizedDistributionRecords } from "./runtime-distribution.mjs";
import { nodeNpmExecutablePath, selectedSubmodules } from "./toolchain-authority.mjs";
import {
  addOwned,
  assertFields,
  assertRecord,
  deepFreeze,
  digestCanonical,
  directoriesFor,
  isCommit,
  isDigest,
  normalizeToolchainModes,
  prettyCanonical,
  scanToolchain,
  validateFileList,
  validatePhysicalRecords,
} from "./toolchain-files.mjs";
import {
  binaryComponents,
  componentByKey,
  distributionPackageComponents,
  packageComponents,
} from "./toolchain-registry.mjs";

export const toolchainManifestName = "toolchain-manifest.json";
export const toolchainSelectorName = "toolchain-selector.json";
export const toolchainSchemaVersion = 5;

export const selectedPackages = packageComponents;
export const selectedBinaries = Object.freeze(
  binaryComponents.map(({ key, target }) => Object.freeze({ key, path: target })),
);

export const goRootPath = componentByKey.get("goRoot").target;
export const goModuleCacheRootPath = componentByKey.get("goModuleCache").target;
export const goModuleCachePath = `${goModuleCacheRootPath}/pkg/mod`;
export const nodeRuntimePath = componentByKey.get("nodeRuntime").target;
export const distributionPath = componentByKey.get("compilerDistribution").target;
export const sourceSnapshotPath = componentByKey.get("typescriptGoSource").target;
export const rootPackageText = `${JSON.stringify({ private: true, type: "module" }, undefined, 2)}\n`;

export async function sealToolchainManifest(root, metadata) {
  const runtimeExecutables = new Set([
    ...metadata.goRoot.executableFiles.map((path) => `${goRootPath}/${path}`),
    ...metadata.nodeRuntime.executableFiles.map((path) => `${nodeRuntimePath}/${path}`),
  ]);
  await normalizeToolchainModes(root, runtimeExecutables, selectedBinaries);
  const scanned = await scanToolchain(root, toolchainManifestName);
  const identity = {
    schemaVersion: toolchainSchemaVersion,
    selection: metadata.selection,
    profile: metadata.profile,
    goBootstrap: metadata.goBootstrap,
    goRoot: describeGoRoot(scanned.members),
    goModules: metadata.goModules,
    nodeBootstrap: metadata.nodeBootstrap,
    nodeRuntime: describeNodeRuntime(
      scanned.directories,
      scanned.members,
      metadata.nodeBootstrap,
    ),
    packages: metadata.packages,
    binaries: metadata.binaries,
    tsgoAuthority: metadata.tsgoAuthority,
    distribution: metadata.distribution,
    source: metadata.source,
    rootMode: 0o555,
    directories: scanned.directories,
    members: scanned.members,
  };
  await validateIdentity(root, identity);
  const digest = digestCanonical(identity);
  const manifest = { ...identity, digest };
  await writeFile(join(root, toolchainManifestName), prettyCanonical(manifest), "utf8");
  await chmod(join(root, toolchainManifestName), 0o444);
  await chmod(root, 0o555);
  return Object.freeze(manifest);
}

export async function verifyToolchainRoot(root, expectedDigest) {
  const manifestPath = join(root, toolchainManifestName);
  const manifestInfo = await lstat(manifestPath);
  if (
    !manifestInfo.isFile() || manifestInfo.nlink !== 1 ||
    (manifestInfo.mode & 0o777) !== 0o444
  ) {
    throw new Error("Toolchain manifest is not an immutable regular file");
  }
  const text = await readFile(manifestPath, "utf8");
  const manifest = JSON.parse(text);
  assertRecord(manifest, "Toolchain manifest");
  assertFields(
    manifest,
    [
      "binaries", "digest", "directories", "distribution", "goBootstrap", "goModules",
      "goRoot", "members", "nodeBootstrap", "nodeRuntime", "packages", "profile",
      "rootMode", "schemaVersion", "selection", "source", "tsgoAuthority",
    ],
    "Toolchain manifest",
  );
  if (text !== prettyCanonical(manifest)) {
    throw new Error("Toolchain manifest is not canonical");
  }
  const { digest, ...identity } = manifest;
  if (!isDigest(digest) || digest !== expectedDigest || digest !== digestCanonical(identity)) {
    throw new Error("Toolchain manifest digest differs from its identity");
  }
  if (((await lstat(root)).mode & 0o777) !== identity.rootMode) {
    throw new Error("Toolchain root mode differs from its manifest");
  }
  await validateIdentity(root, identity);
  const scanned = await scanToolchain(root, toolchainManifestName);
  if (
    !isDeepStrictEqual(scanned.directories, identity.directories) ||
    !isDeepStrictEqual(scanned.members, identity.members)
  ) {
    throw new Error("Toolchain physical membership or content differs from its manifest");
  }
  return Object.freeze({ manifest: deepFreeze(manifest) });
}

async function validateIdentity(root, identity) {
  assertFields(
    identity,
    [
      "binaries", "directories", "distribution", "goBootstrap", "goModules", "goRoot",
      "members", "nodeBootstrap", "nodeRuntime", "packages", "profile", "rootMode",
      "schemaVersion", "selection", "source", "tsgoAuthority",
    ],
    "Toolchain identity",
  );
  if (identity.schemaVersion !== toolchainSchemaVersion || identity.rootMode !== 0o555) {
    throw new Error("Toolchain identity schema or root mode is invalid");
  }
  validateSelection(identity.selection);
  validateProfile(identity.profile);
  validateGoFingerprint(identity.goBootstrap);
  validateGoRoot(identity.goRoot, identity.members, identity.goBootstrap);
  validateGoModuleCacheRecord(identity.goModules);
  if (
    identity.goModules.root !== goModuleCachePath ||
    await digestExactFiles(join(root, goModuleCachePath), identity.goModules.files) !==
      identity.goModules.digest
  ) {
    throw new Error("Toolchain Go module cache content differs");
  }
  for (const module of identity.goModules.modules) {
    const files = [
      ...module.sourceFiles.map((path) => `${module.sourceRoot}/${path}`),
      ...Object.values(module.metadata),
    ].sort(compareCodeUnits);
    if (await digestExactFiles(join(root, goModuleCachePath), files) !== module.digest) {
      throw new Error(`Toolchain Go module '${module.path}@${module.version}' content differs`);
    }
  }
  validateNodeFingerprint(identity.nodeBootstrap);
  validateNodeRuntime(
    identity.nodeRuntime,
    identity.directories,
    identity.members,
    identity.nodeBootstrap,
  );
  validateTsgoAuthority(identity.tsgoAuthority, identity.selection);
  if (!Array.isArray(identity.packages) || identity.packages.length !== selectedPackages.length) {
    throw new Error("Toolchain package selection is incomplete");
  }
  const owned = new Set(["package.json"]);
  for (const [index, selection] of selectedPackages.entries()) {
    const record = identity.packages[index];
    assertRecord(record, `Toolchain package '${selection.name}'`);
    assertFields(
      record,
      ["dependencies", "digest", "files", "key", "name", "root", "version"],
      `Toolchain package '${selection.name}'`,
    );
    if (record.key !== selection.key || record.name !== selection.name || record.root !== selection.target) {
      throw new Error(`Toolchain package '${selection.name}' selection is invalid`);
    }
    validateFileList(record.files, `Toolchain package '${selection.name}'`);
    if (record.files.some((path) => path.split("/").includes("node_modules"))) {
      throw new Error(`Toolchain package '${selection.name}' contains nested node_modules`);
    }
    if (selection.entry !== undefined && !record.files.includes(selection.entry)) {
      throw new Error(`Toolchain package '${selection.name}' entry is absent`);
    }
    if (!isDigest(record.digest) || typeof record.version !== "string" || record.version.length === 0) {
      throw new Error(`Toolchain package '${selection.name}' identity is invalid`);
    }
    validatePackageDependencies(identity.packages, selection, record);
    if (await digestExactFiles(join(root, record.root), record.files) !== record.digest) {
      throw new Error(`Toolchain package '${selection.name}' content digest differs`);
    }
    addOwned(owned, record.files.map((path) => `${record.root}/${path}`));
  }
  validateBinaries(identity.binaries, identity.members, owned);
  const distribution = identity.distribution;
  assertRecord(distribution, "Toolchain compiler distribution");
  assertFields(
    distribution,
    ["dependencies", "digest", "files", "root", "trackedFiles"],
    "Toolchain compiler distribution",
  );
  if (distribution.root !== distributionPath || !isDigest(distribution.digest)) {
    throw new Error("Toolchain compiler distribution identity is invalid");
  }
  validateFileList(distribution.files, "Toolchain compiler distribution");
  validateFileList(distribution.trackedFiles, "Toolchain tracked distribution");
  if (await digestExactFiles(join(root, distribution.root), distribution.files) !== distribution.digest) {
    throw new Error("Toolchain compiler distribution content digest differs");
  }
  const dependencyFiles = await validateDistributionDependencies(root, distribution);
  const dependencySet = new Set(dependencyFiles);
  addOwned(
    owned,
    distribution.files
      .filter((path) => !dependencySet.has(path))
      .map((path) => `${distribution.root}/${path}`),
  );
  addOwned(
    owned,
    identity.goModules.files.map((path) => `${identity.goModules.root}/${path}`),
  );
  addOwned(
    owned,
    dependencyFiles.map((path) => `${distribution.root}/${path}`),
  );
  const source = identity.source;
  assertRecord(source, "TypeScript-Go source snapshot");
  assertFields(source, ["digest", "files", "root"], "TypeScript-Go source snapshot");
  if (source.root !== sourceSnapshotPath || !isDigest(source.digest)) {
    throw new Error("TypeScript-Go source snapshot identity is invalid");
  }
  validateFileList(source.files, "TypeScript-Go source snapshot");
  if (await digestExactFiles(join(root, source.root), source.files) !== source.digest) {
    throw new Error("TypeScript-Go source snapshot content digest differs");
  }
  addOwned(owned, source.files.map((path) => `${source.root}/${path}`));
  addOwned(
    owned,
    identity.members
      .map((record) => record.path)
      .filter((path) => path.startsWith(`${goRootPath}/`)),
  );
  addOwned(
    owned,
    identity.members
      .map((record) => record.path)
      .filter((path) => path.startsWith(`${nodeRuntimePath}/`)),
  );
  validatePhysicalRecords(identity.directories, identity.members, {
    runtimeRoots: [identity.goRoot.root, identity.nodeRuntime.root],
    selectedBinaries,
  });
  const memberPaths = identity.members.map((record) => record.path);
  if (!isDeepStrictEqual([...owned].sort(compareCodeUnits), memberPaths)) {
    throw new Error("Toolchain member ownership differs from its manifest");
  }
  const expectedDirectories = [...new Set([
    ...directoriesFor(memberPaths),
    ...identity.directories
      .map((record) => record.path)
      .filter((path) => [goRootPath, goModuleCacheRootPath, nodeRuntimePath].some((root) =>
        path === root || path.startsWith(`${root}/`)
      )),
  ])].sort(compareCodeUnits);
  if (!isDeepStrictEqual(expectedDirectories, identity.directories.map((record) => record.path))) {
    throw new Error("Toolchain directory ownership differs from its manifest");
  }
  if (await readFile(join(root, "package.json"), "utf8") !== rootPackageText) {
    throw new Error("Toolchain root package content differs");
  }
}

async function validateDistributionDependencies(root, distribution) {
  if (
    !Array.isArray(distribution.dependencies) ||
    distribution.dependencies.length !== distributionPackageComponents.length
  ) {
    throw new Error("Toolchain compiler distribution dependencies are incomplete");
  }
  const ownedFiles = [];
  for (const [index, component] of distributionPackageComponents.entries()) {
    const record = distribution.dependencies[index];
    assertRecord(record, `Distribution package '${component.name}'`);
    assertFields(
      record,
      ["dependencies", "digest", "files", "key", "name", "root", "version"],
      `Distribution package '${component.name}'`,
    );
    const expectedRoot = component.target.slice(`${distributionPath}/`.length);
    if (
      record.key !== component.key || record.name !== component.name ||
      record.root !== expectedRoot || typeof record.version !== "string" ||
      record.version.length === 0 || !isDigest(record.digest)
    ) {
      throw new Error(`Distribution package '${component.name}' identity is invalid`);
    }
    validateFileList(record.files, `Distribution package '${component.name}'`);
    if (record.files.some((path) => path.split("/").includes("node_modules"))) {
      throw new Error(`Distribution package '${component.name}' contains nested node_modules`);
    }
    if (
      await digestExactFiles(join(root, distribution.root, record.root), record.files) !==
      record.digest
    ) {
      throw new Error(`Distribution package '${component.name}' content digest differs`);
    }
    for (const path of record.files) {
      const ownedPath = `${record.root}/${path}`;
      if (!distribution.files.includes(ownedPath)) {
        throw new Error(`Distribution package member '${ownedPath}' is absent from its snapshot`);
      }
      ownedFiles.push(ownedPath);
    }
    const keys = record.dependencies.map((dependency) => dependency?.key);
    if (!isDeepStrictEqual(keys, component.dependencies)) {
      throw new Error(`Distribution package '${component.name}' dependency graph differs`);
    }
    for (const dependency of record.dependencies) {
      assertRecord(dependency, `Distribution package '${component.name}' dependency`);
      assertFields(
        dependency,
        ["key", "name", "requirement", "version"],
        `Distribution package '${component.name}' dependency`,
      );
      const owner = componentByKey.get(dependency.key);
      const selected = distribution.dependencies.find((candidate) =>
        candidate.key === dependency.key
      );
      if (
        dependency.name !== owner.name || dependency.version !== selected?.version ||
        typeof dependency.requirement !== "string" || dependency.requirement.length === 0
      ) {
        throw new Error(`Distribution package '${component.name}' dependency is invalid`);
      }
    }
  }
  if (new Set(ownedFiles).size !== ownedFiles.length) {
    throw new Error("Toolchain compiler distribution has duplicate path owners");
  }
  return Object.freeze(ownedFiles.sort(compareCodeUnits));
}

function validatePackageDependencies(packages, selection, record) {
  if (!Array.isArray(record.dependencies)) {
    throw new Error(`Toolchain package '${selection.name}' dependencies are invalid`);
  }
  const keys = record.dependencies.map((dependency) => dependency?.key);
  if (!isDeepStrictEqual(keys, selection.dependencies)) {
    throw new Error(`Toolchain package '${selection.name}' dependency selection differs`);
  }
  for (const dependency of record.dependencies) {
    assertRecord(dependency, `Toolchain package '${selection.name}' dependency`);
    assertFields(
      dependency,
      ["key", "name", "version"],
      `Toolchain package '${selection.name}' dependency`,
    );
    const owner = componentByKey.get(dependency.key);
    const packageRecord = packages.find((candidate) => candidate.key === dependency.key);
    const version = owner.kind === "generated-package" ? owner.version : packageRecord?.version;
    if (dependency.name !== owner.name || dependency.version !== version) {
      throw new Error(`Toolchain package '${selection.name}' dependency identity differs`);
    }
  }
}

function validateSelection(selection) {
  assertRecord(selection, "Toolchain selection");
  assertFields(
    selection,
    ["submodules", "superprojectAuthorityDigest"],
    "Toolchain selection",
  );
  if (!isDigest(selection.superprojectAuthorityDigest) || !Array.isArray(selection.submodules)) {
    throw new Error("Toolchain committed selection is invalid");
  }
  if (selection.submodules.length !== selectedSubmodules.length) {
    throw new Error("Toolchain submodule selection is incomplete");
  }
  for (const [index, path] of selectedSubmodules.entries()) {
    const record = selection.submodules[index];
    assertRecord(record, `Toolchain submodule '${path}'`);
    assertFields(record, ["gitlink", "path"], `Toolchain submodule '${path}'`);
    if (record.path !== path || !isCommit(record.gitlink)) {
      throw new Error(`Toolchain submodule '${path}' identity is invalid`);
    }
  }
}

function validateProfile(profile) {
  assertRecord(profile, "Toolchain Go profile");
  assertFields(profile, ["cgo", "goarch", "goos", "tags"], "Toolchain Go profile");
  if (
    typeof profile.goos !== "string" || profile.goos.length === 0 ||
    typeof profile.goarch !== "string" || profile.goarch.length === 0 ||
    typeof profile.cgo !== "boolean" || !Array.isArray(profile.tags) ||
    !profile.tags.every((tag) => typeof tag === "string" && tag.length !== 0) ||
    !isDeepStrictEqual(profile.tags, [...new Set(profile.tags)].sort(compareCodeUnits))
  ) {
    throw new Error("Toolchain Go profile is invalid");
  }
}

function validateGoFingerprint(fingerprint) {
  assertRecord(fingerprint, "Toolchain bootstrap Go fingerprint");
  assertFields(
    fingerprint,
    ["executableDigest", "goVersion", "hostArch", "hostOS", "rootDigest", "version"],
    "Toolchain bootstrap Go fingerprint",
  );
  if (
    !isDigest(fingerprint.executableDigest) || !isDigest(fingerprint.rootDigest) ||
    [fingerprint.version, fingerprint.goVersion, fingerprint.hostArch, fingerprint.hostOS]
      .some((value) => typeof value !== "string" || value.length === 0)
  ) {
    throw new Error("Toolchain bootstrap Go fingerprint is invalid");
  }
}

function describeGoRoot(members) {
  const selected = goRootMembers(members);
  return Object.freeze({
    root: goRootPath,
    executable: "bin/go",
    fileCount: selected.length,
    digest: digestCanonical(selected),
  });
}

function validateGoRoot(goRoot, members, bootstrap) {
  assertRecord(goRoot, "Toolchain Go root");
  assertFields(
    goRoot,
    ["digest", "executable", "fileCount", "root"],
    "Toolchain Go root",
  );
  const described = describeGoRoot(members);
  if (
    goRoot.root !== described.root || goRoot.executable !== described.executable ||
    goRoot.fileCount !== described.fileCount || goRoot.digest !== described.digest ||
    !Number.isSafeInteger(goRoot.fileCount) || goRoot.fileCount <= 0 ||
    !isDigest(goRoot.digest)
  ) {
    throw new Error("Toolchain Go root identity is invalid");
  }
  const executable = members.find((record) =>
    record.path === `${goRoot.root}/${goRoot.executable}`
  );
  if (executable?.mode !== 0o555 || executable.digest !== bootstrap.executableDigest) {
    throw new Error("Toolchain Go executable differs from its bootstrap provenance");
  }
}

function goRootMembers(members) {
  const prefix = `${goRootPath}/`;
  return members
    .filter((record) => record.path.startsWith(prefix))
    .map((record) => Object.freeze({
      path: record.path.slice(prefix.length),
      mode: record.mode,
      size: record.size,
      digest: record.digest,
    }));
}

function describeNodeRuntime(directories, members, bootstrap) {
  const selected = runtimeMembers(members, nodeRuntimePath);
  const npm = digestNormalizedDistributionRecords(
    directories,
    members,
    `${nodeRuntimePath}/npm`,
  );
  return Object.freeze({
    root: nodeRuntimePath,
    executable: "bin/node",
    npmCli: `npm/${bootstrap.npmCli}`,
    npmExecutable: nodeNpmExecutablePath,
    npmDigest: npm.digest,
    fileCount: selected.length,
    digest: digestCanonical(selected),
  });
}

function validateNodeFingerprint(fingerprint) {
  assertRecord(fingerprint, "Toolchain bootstrap Node/npm fingerprint");
  assertFields(
    fingerprint,
    ["executableDigest", "nodeVersion", "npmCli", "npmDigest", "npmVersion"],
    "Toolchain bootstrap Node/npm fingerprint",
  );
  if (
    !isDigest(fingerprint.executableDigest) || !isDigest(fingerprint.npmDigest) ||
    [fingerprint.nodeVersion, fingerprint.npmVersion, fingerprint.npmCli]
      .some((value) => typeof value !== "string" || value.length === 0)
  ) {
    throw new Error("Toolchain bootstrap Node/npm fingerprint is invalid");
  }
  validateRelativePath(fingerprint.npmCli, "bootstrap npm CLI");
}

function validateNodeRuntime(runtime, directories, members, bootstrap) {
  assertRecord(runtime, "Toolchain Node/npm runtime");
  assertFields(
    runtime,
    ["digest", "executable", "fileCount", "npmCli", "npmDigest", "npmExecutable", "root"],
    "Toolchain Node/npm runtime",
  );
  const described = describeNodeRuntime(directories, members, bootstrap);
  if (
    !isDeepStrictEqual(runtime, described) ||
    !Number.isSafeInteger(runtime.fileCount) || runtime.fileCount <= 0 ||
    !isDigest(runtime.digest) || runtime.npmDigest !== bootstrap.npmDigest
  ) {
    throw new Error("Toolchain Node/npm runtime identity is invalid");
  }
  const byPath = new Map(members.map((record) => [record.path, record]));
  const executable = byPath.get(`${runtime.root}/${runtime.executable}`);
  const npmCli = byPath.get(`${runtime.root}/${runtime.npmCli}`);
  const npmExecutable = byPath.get(`${runtime.root}/${runtime.npmExecutable}`);
  if (
    executable?.mode !== 0o555 ||
    executable.digest !== bootstrap.executableDigest ||
    npmCli === undefined || npmExecutable?.mode !== 0o555
  ) {
    throw new Error("Toolchain Node/npm runtime differs from its bootstrap provenance");
  }
}

function runtimeMembers(members, root) {
  const prefix = `${root}/`;
  return members
    .filter((record) => record.path.startsWith(prefix))
    .map((record) => Object.freeze({
      path: record.path.slice(prefix.length),
      mode: record.mode,
      size: record.size,
      digest: record.digest,
    }));
}

function validateTsgoAuthority(authority, selection) {
  assertRecord(authority, "TypeScript-Go executable authority");
  assertFields(
    authority,
    ["module", "package", "sourceRevision", "sum", "version"],
    "TypeScript-Go executable authority",
  );
  const selected = selection.submodules.find((record) =>
    record.path === "vendor/typescript-go"
  )?.gitlink;
  if (
    authority.package !== "github.com/microsoft/typescript-go/cmd/tsgo" ||
    authority.module !== "github.com/microsoft/typescript-go" ||
    authority.sourceRevision !== selected ||
    typeof authority.version !== "string" ||
    !authority.version.endsWith(`-${selected.slice(0, 12)}`) ||
    typeof authority.sum !== "string" || !/^h1:[A-Za-z0-9+/]{43}=$/u.test(authority.sum)
  ) {
    throw new Error("TypeScript-Go executable authority is invalid");
  }
}

function validateBinaries(binaries, members, owned) {
  if (!Array.isArray(binaries) || binaries.length !== selectedBinaries.length) {
    throw new Error("Toolchain binary selection is incomplete");
  }
  const byPath = new Map(members.map((record) => [record.path, record]));
  for (const [index, selection] of selectedBinaries.entries()) {
    const record = binaries[index];
    assertRecord(record, `Toolchain binary '${selection.key}'`);
    assertFields(record, ["digest", "key", "path"], `Toolchain binary '${selection.key}'`);
    if (
      record.key !== selection.key || record.path !== selection.path ||
      !isDigest(record.digest) || byPath.get(record.path)?.digest !== record.digest
    ) {
      throw new Error(`Toolchain binary '${selection.key}' identity is invalid`);
    }
    addOwned(owned, [record.path]);
  }
}
