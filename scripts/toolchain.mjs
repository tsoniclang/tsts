import {
  chmod,
  lstat,
  mkdir,
  readFile,
  readdir,
  rename,
  writeFile,
} from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";

import { compareCodeUnits } from "./canonical-order.mjs";
import { copyExactFiles } from "./package-artifact.mjs";
import { createToolchainCandidate } from "./toolchain-builder.mjs";
import {
  goModuleCachePath,
  goRootPath,
  nodeRuntimePath,
  selectedBinaries,
  toolchainSelectorName,
  verifyToolchainRoot,
} from "./toolchain-contract.mjs";
import {
  exactToolchainEnvironment,
  prepareToolchainState,
  replaceProcessEnvironment,
} from "./toolchain-environment.mjs";
import { componentByKey, generatedGoRuntime } from "./toolchain-registry.mjs";

const openedHandles = new WeakSet();

export async function buildToolchain(repositoryArgument, options = {}) {
  const repositoryRoot = resolve(repositoryArgument);
  if (
    typeof options.goExecutable !== "string" || options.goExecutable.length === 0 ||
    typeof options.goModuleCache !== "string" || options.goModuleCache.length === 0 ||
    typeof options.nodeExecutable !== "string" || options.nodeExecutable.length === 0 ||
    typeof options.npmCli !== "string" || options.npmCli.length === 0 ||
    typeof options.hostUtilityPath !== "string" || options.hostUtilityPath.length === 0
  ) {
    throw new Error(
      "Explicit Go, Go module cache, Node, npm, and host-platform bootstrap selections are required",
    );
  }
  const candidate = await createToolchainCandidate(
    repositoryRoot,
    resolve(options.goExecutable),
    resolve(options.goModuleCache),
    resolve(options.nodeExecutable),
    resolve(options.npmCli),
    resolve(options.hostUtilityPath),
  );
  const finalRoot = join(repositoryRoot, ".temp", "toolchains", candidate.digest);
  await publishImmutableRoot(repositoryRoot, candidate, finalRoot);
  await writeSelector(repositoryRoot, candidate.digest, candidate.runIdentity);
  return openToolchain(repositoryRoot, {
    digest: candidate.digest,
    root: finalRoot,
  });
}

export async function openToolchain(repositoryArgument, options) {
  const repositoryRoot = resolve(repositoryArgument);
  if (!isRecord(options) || !isDigest(options.digest)) {
    throw new Error("An exact toolchain digest is required");
  }
  const expectedRoot = join(repositoryRoot, ".temp", "toolchains", options.digest);
  const root = resolve(options.root ?? expectedRoot);
  if (root !== expectedRoot || basename(root) !== options.digest) {
    throw new Error("Toolchain root does not match its content digest location");
  }
  if (!(await lstat(root)).isDirectory()) {
    throw new Error("Toolchain root is not a directory");
  }
  const verified = await verifyToolchainRoot(root, options.digest);
  const stateRoot = join(repositoryRoot, ".temp", "toolchain-state", options.digest);
  await prepareToolchainState(stateRoot);
  const toolCacheRoot = join(stateRoot, "go-tool-cache");
  const packages = Object.fromEntries(verified.manifest.packages.map((record) => {
    const selection = componentByKey.get(record.key);
    return [record.key, Object.freeze({
      ...record,
      root: join(root, record.root),
      entry: selection.entry === undefined
        ? undefined
        : pathToFileURL(join(root, record.root, selection.entry)).href,
    })];
  }));
  const binaryPaths = Object.fromEntries(
    selectedBinaries.map(({ key, path }) => [key, join(root, path)]),
  );
  const handle = Object.freeze({
    digest: options.digest,
    root,
    packages: Object.freeze(packages),
    binaries: Object.freeze({
      ...binaryPaths,
      go: join(root, verified.manifest.goRoot.root, verified.manifest.goRoot.executable),
      node: join(
        root,
        verified.manifest.nodeRuntime.root,
        verified.manifest.nodeRuntime.executable,
      ),
      npm: join(
        root,
        verified.manifest.nodeRuntime.root,
        verified.manifest.nodeRuntime.npmExecutable,
      ),
    }),
    goRoot: join(root, goRootPath),
    goModuleCache: join(root, goModuleCachePath),
    nodeRoot: join(root, nodeRuntimePath),
    distributionRoot: join(root, verified.manifest.distribution.root),
    sourceRoot: join(root, verified.manifest.source.root),
    stateRoot,
    toolCacheRoot,
    manifest: verified.manifest,
  });
  openedHandles.add(handle);
  return handle;
}

export async function openSelectedToolchain(repositoryArgument) {
  const repositoryRoot = resolve(repositoryArgument);
  const selectorPath = join(repositoryRoot, ".temp", toolchainSelectorName);
  const text = await readFile(selectorPath, "utf8");
  const selector = JSON.parse(text);
  if (
    !isRecord(selector) ||
    !isDeepStrictEqual(
      Object.keys(selector).sort(compareCodeUnits),
      ["digest", "schemaVersion"],
    ) ||
    selector.schemaVersion !== 1 ||
    !isDigest(selector.digest) ||
    text !== `${JSON.stringify({ digest: selector.digest, schemaVersion: 1 }, undefined, 2)}\n`
  ) {
    throw new Error("Toolchain selector is invalid");
  }
  return openToolchain(repositoryRoot, {
    digest: selector.digest,
    root: join(repositoryRoot, ".temp", "toolchains", selector.digest),
  });
}

export async function openToolchainArguments(repositoryRoot, arguments_) {
  if (arguments_.length !== 2) {
    throw new Error("toolchain digest and immutable root are required");
  }
  return openToolchain(repositoryRoot, {
    digest: arguments_[0],
    root: arguments_[1],
  });
}

export async function installToolchainPackage(handle, key, outputRoot) {
  assertHandle(handle);
  const component = componentByKey.get(key);
  const selected = handle.packages[key];
  if (component?.kind !== "package" || selected === undefined) {
    throw new Error(`Toolchain package component '${key}' is not selected`);
  }
  const target = join(resolve(outputRoot), component.target);
  await requireAbsent(target, `Toolchain package destination '${component.target}'`);
  const digest = await copyExactFiles({
    sourceRoot: selected.root,
    targetRoot: target,
    files: selected.files,
    mode: 0o644,
  });
  if (digest !== selected.digest) {
    throw new Error(`Installed toolchain package '${selected.name}' digest differs`);
  }
  return target;
}

export async function installGeneratedGoRuntime(sourceRoot, outputRoot) {
  const files = await listRegularFiles(resolve(sourceRoot), "generated Go runtime");
  if (files.some((path) => path.split("/").includes("node_modules"))) {
    throw new Error("Generated Go runtime contains nested node_modules");
  }
  const target = join(resolve(outputRoot), generatedGoRuntime.target);
  await requireAbsent(target, "Generated Go runtime destination");
  await copyExactFiles({ sourceRoot: resolve(sourceRoot), targetRoot: target, files });
  return target;
}

export async function createDistributionWorkspace(handle, destinationArgument) {
  assertHandle(handle);
  const destination = resolve(destinationArgument);
  await requireAbsent(destination, "Compiler distribution workspace");
  await copyExactFiles({
    sourceRoot: handle.distributionRoot,
    targetRoot: destination,
    files: handle.manifest.distribution.files,
    mode: 0o444,
  });
  await mkdir(join(destination, ".temp"), { recursive: true, mode: 0o755 });
  await makeDirectoriesReadOnly(destination, new Set([".temp"]));
  return destination;
}

export function toolchainEnvironment(handle) {
  assertHandle(handle);
  return exactToolchainEnvironment({
    goRoot: handle.goRoot,
    nodeRoot: handle.nodeRoot,
    goModuleCache: handle.goModuleCache,
    stateRoot: handle.stateRoot,
    profile: handle.manifest.profile,
  });
}

export function activateToolchainEnvironment(handle) {
  const environment = toolchainEnvironment(handle);
  replaceProcessEnvironment(environment);
  return environment;
}

export function typeScriptAstPrinterConfig(handle, workingDirectoryArgument) {
  assertHandle(handle);
  const workingDirectory = resolve(workingDirectoryArgument);
  return Object.freeze({
    executable: handle.binaries.tsgoAstPrinter,
    arguments: Object.freeze([
      "-module", handle.distributionRoot,
      "-go", handle.binaries.go,
      "-tsgo", handle.binaries.tsgo,
      "-tool-cache", handle.toolCacheRoot,
      "-cwd", workingDirectory,
    ]),
  });
}

export function formatToolchainHandle(handle, distributionWorkspace = "") {
  assertHandle(handle);
  const values = [
    handle.digest,
    handle.root,
    handle.binaries.gotots,
    handle.binaries.tsgoAstPrinter,
    handle.binaries.tsgo,
    handle.binaries.go,
    handle.goRoot,
    handle.goModuleCache,
    handle.binaries.node,
    handle.binaries.npm,
    handle.nodeRoot,
    handle.stateRoot,
    handle.toolCacheRoot,
    handle.distributionRoot,
    handle.sourceRoot,
    distributionWorkspace,
  ];
  if (values.some((value) => value.includes("\t") || value.includes("\n"))) {
    throw new Error("Toolchain handle contains an unsafe path");
  }
  return values.join("\t");
}

async function publishImmutableRoot(repositoryRoot, candidate, finalRoot) {
  await mkdir(dirname(finalRoot), { recursive: true });
  try {
    await lstat(finalRoot);
  } catch (error) {
    if (error?.code === "ENOENT") {
      await chmod(candidate.stagedRoot, 0o755);
      await rename(candidate.stagedRoot, finalRoot);
      await chmod(finalRoot, 0o555);
      return;
    }
    throw error;
  }
  await openToolchain(repositoryRoot, {
    digest: candidate.digest,
    root: finalRoot,
  });
  const preserved = join(
    repositoryRoot,
    ".temp",
    "preserved",
    `duplicate-toolchain-${candidate.runIdentity}`,
  );
  await mkdir(dirname(preserved), { recursive: true });
  await chmod(candidate.stagedRoot, 0o755);
  await rename(candidate.stagedRoot, preserved);
  await chmod(preserved, 0o555);
}

async function writeSelector(repositoryRoot, digest, runIdentity) {
  const temporary = join(repositoryRoot, ".temp", `${toolchainSelectorName}.${runIdentity}`);
  const target = join(repositoryRoot, ".temp", toolchainSelectorName);
  await writeFile(
    temporary,
    `${JSON.stringify({ digest, schemaVersion: 1 }, undefined, 2)}\n`,
    { encoding: "utf8", mode: 0o644 },
  );
  await rename(temporary, target);
}

async function listRegularFiles(root, subject, directory = "") {
  const result = [];
  for (const entry of await readdir(join(root, directory), { withFileTypes: true })) {
    const path = directory.length === 0 ? entry.name : `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      result.push(...await listRegularFiles(root, subject, path));
    } else if (entry.isFile()) {
      if ((await lstat(join(root, path))).nlink !== 1) {
        throw new Error(`${subject} member '${path}' is a hard link`);
      }
      result.push(path);
    } else {
      throw new Error(`${subject} member '${path}' is not a regular file`);
    }
  }
  return result.sort(compareCodeUnits);
}

async function makeDirectoriesReadOnly(root, writable) {
  async function visit(directory, prefix) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue;
      }
      const path = prefix.length === 0 ? entry.name : `${prefix}/${entry.name}`;
      await visit(join(directory, entry.name), path);
      await chmod(join(directory, entry.name), writable.has(path) ? 0o755 : 0o555);
    }
  }
  await visit(root, "");
  await chmod(root, 0o555);
}

async function requireAbsent(path, subject) {
  try {
    await lstat(path);
  } catch (error) {
    if (error?.code === "ENOENT") {
      return;
    }
    throw error;
  }
  throw new Error(`${subject} already exists`);
}

function assertHandle(handle) {
  if (!openedHandles.has(handle)) {
    throw new Error("An opened immutable toolchain handle is required");
  }
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isDigest(value) {
  return typeof value === "string" && /^[0-9a-f]{64}$/u.test(value);
}
