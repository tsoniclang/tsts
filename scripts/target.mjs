import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  rename,
  writeFile,
} from "node:fs/promises";
import { basename, dirname, isAbsolute, join, relative, resolve } from "node:path";

import { compareCodeUnits } from "./canonical-order.mjs";
import {
  canonicalTargetSourcePath,
  createTargetSourceLayout,
  targetRunnerPath,
} from "./target-source-layout.mjs";
import { sealTargetManifest } from "./target-manifest.mjs";
import {
  installGeneratedGoRuntime,
  installToolchainPackage,
  openToolchainArguments,
  activateToolchainEnvironment,
  typeScriptAstPrinterConfig,
} from "./toolchain.mjs";
import { readTypeScriptTargetProfile } from "./typescript-target-profile.mjs";

const [
  repositoryArgument,
  canonicalArgument,
  targetArgument,
  runnerArgument,
  ...toolchainArguments
] = process.argv.slice(2);
if (
  repositoryArgument === undefined ||
  canonicalArgument === undefined ||
  targetArgument === undefined ||
  runnerArgument === undefined
) {
  throw new Error("repository root, canonical root, target root, and runner source are required");
}

const repositoryRoot = resolve(repositoryArgument);
const canonicalRoot = resolve(canonicalArgument);
const targetRoot = resolve(targetArgument);
const runnerSource = resolve(runnerArgument);
const runIdentity = `${new Date().toISOString().replaceAll(/[:.]/gu, "-")}-${process.pid}`;
const runRoot = join(repositoryRoot, ".temp", "target-runs", runIdentity);
const sourceWorkspace = join(runRoot, "source");
const stagedTarget = join(runRoot, "target");
const toolchain = await openToolchainArguments(repositoryRoot, toolchainArguments);
activateToolchainEnvironment(toolchain);
const { compileProject } = await importPackage("host");
const { createTargetRegistry } = await importPackage("target-api");
const { createTypeScriptTargetPack } = await importPackage("target-typescript");
const targetProfile = await readTypeScriptTargetProfile(
  join(repositoryRoot, "typescript-target.json"),
);

const canonical = await readCanonicalManifest(canonicalRoot);
const canonicalSources = canonical.files
  .filter((path) => path.endsWith(".ts"))
  .sort(compareCodeUnits);
const sourceLayout = createTargetSourceLayout(canonicalSources);
await copyCanonicalProject(canonicalRoot, sourceWorkspace, canonical.files);
await copyFile(runnerSource, join(sourceWorkspace, targetRunnerPath));
await installGoPackages(toolchain, sourceWorkspace);
await installGeneratedGoRuntime(join(sourceWorkspace, "runtime"), sourceWorkspace);

const project = {
  entryPoint: targetRunnerPath,
  rootFiles: sourceLayout.rootFiles,
  rootDir: ".",
  outDir: targetRoot,
  targets: [{
    id: "typescript",
    options: {
      printer: typeScriptAstPrinterConfig(toolchain, sourceWorkspace),
      optimizations: targetProfile.optimizations,
    },
  }],
};
const result = compileProject({
  project,
  projectFilePath: join(sourceWorkspace, "tsonic.json"),
  rootFiles: canonicalSources,
  registry: createTargetRegistry([createTypeScriptTargetPack()]),
});
const errors = result.diagnostics.filter((diagnostic) => diagnostic.category === "error");
if (errors.length !== 0) {
  throw new Error(errors.map((diagnostic) =>
    `${diagnostic.code}: ${diagnostic.message}`
  ).join("\n"));
}
if (result.targets.length !== 1) {
  throw new Error(`TypeScript target count ${result.targets.length} is not one`);
}

const artifacts = result.targets[0].compileResult.artifacts.map((artifact) =>
  artifact.kind === "source"
    ? {
        ...artifact,
        path: canonicalTargetSourcePath(artifact.path, sourceLayout.canonicalSet),
      }
    : artifact
);
const sourceArtifacts = artifacts
  .filter((artifact) => artifact.kind === "source")
  .map((artifact) => artifact.path)
  .sort(compareCodeUnits);
assertEqualPaths(
  "canonical TypeScript and target source artifacts",
  sourceLayout.expectedArtifacts,
  sourceArtifacts,
);

await mkdir(stagedTarget, { recursive: true });
const installedPaths = new Set();
for (const artifact of artifacts) {
  const path = validateRelativePath(artifact.path);
  if (installedPaths.has(path)) {
    throw new Error(`Target artifact '${path}' is duplicated`);
  }
  installedPaths.add(path);
  await writeOwnedFile(stagedTarget, path, artifact.text);
}
for (const path of canonical.files) {
  if (path.endsWith(".ts") || path === "package.json" || path === "gotots-manifest.json") {
    continue;
  }
  if (installedPaths.has(path)) {
    throw new Error(`Canonical pass-through '${path}' collides with a target artifact`);
  }
  installedPaths.add(path);
  await copyOwnedFile(canonicalRoot, stagedTarget, path);
}
for (const [source, path] of [
  [join(repositoryRoot, "assembly", "tsconfig.json"), "tsconfig.json"],
  [join(repositoryRoot, "assembly", "tsconfig.emit.json"), "tsconfig.emit.json"],
]) {
  if (installedPaths.has(path)) {
    throw new Error(`Product assembly artifact '${path}' collides with target output`);
  }
  installedPaths.add(path);
  await copyFile(source, join(stagedTarget, path));
}
await installGoPackages(toolchain, stagedTarget);
await installGeneratedGoRuntime(join(stagedTarget, "runtime"), stagedTarget);
await installTypeScriptRuntime(toolchain, stagedTarget);

const physicalPaths = await listPhysicalFiles(stagedTarget);
const expectedPaths = [...installedPaths, ...physicalPaths.filter((path) =>
  path.startsWith("node_modules/")
)].sort(compareCodeUnits);
assertEqualPaths("target source assembly", [...new Set(expectedPaths)], physicalPaths);
const sealedTarget = await sealTargetManifest(
  stagedTarget,
  canonical.semanticDigest,
  targetProfile.digest,
  toolchain.digest,
);
await replaceDirectory(targetRoot, stagedTarget, join(repositoryRoot, ".temp", "preserved"));

console.log(
  `target_files=${sealedTarget.files.length} profile=${targetProfile.digest} ` +
    `toolchain=${toolchain.digest} output=${targetRoot}`,
);

async function readCanonicalManifest(root) {
  const document = parseRecord(
    await readFile(join(root, "gotots-manifest.json"), "utf8"),
    "GoToTS manifest",
  );
  if (document["schemaVersion"] !== 1 || typeof document["semanticDigest"] !== "string") {
    throw new Error("GoToTS manifest identity is invalid");
  }
  const files = document["files"];
  if (!Array.isArray(files) || !files.every((path) => typeof path === "string")) {
    throw new Error("GoToTS manifest files are invalid");
  }
  const normalized = files.map(validateRelativePath);
  const sorted = [...normalized].sort(compareCodeUnits);
  assertEqualPaths("GoToTS manifest ordering", normalized, sorted);
  if (new Set(normalized).size !== normalized.length) {
    throw new Error("GoToTS manifest files are duplicated");
  }
  const physical = await listPhysicalFiles(root);
  assertEqualPaths("GoToTS manifest and physical output", normalized, physical);
  return {
    semanticDigest: document["semanticDigest"],
    files: normalized,
  };
}

async function copyCanonicalProject(source, target, paths) {
  await mkdir(target, { recursive: true });
  for (const path of paths) {
    await copyOwnedFile(source, target, path);
  }
}

async function installGoPackages(handle, output) {
  await installToolchainPackage(handle, "gostdlib", output);
  await installToolchainPackage(handle, "externals", output);
}

async function installTypeScriptRuntime(handle, output) {
  const project = parseRecord(await readFile(join(output, "package.json"), "utf8"), "target package");
  const dependencies = project["dependencies"];
  if (!isRecord(dependencies)) {
    throw new Error("Target package dependencies are invalid");
  }
  const selectedVersion = dependencies["@tsonic/typescript-runtime"];
  const runtime = parseRecord(
    await readFile(join(handle.packages.typeScriptRuntime.root, "package.json"), "utf8"),
    "runtime package",
  );
  if (selectedVersion !== runtime["version"]) {
    throw new Error(
      `Selected TypeScript runtime '${String(selectedVersion)}' does not match the sealed package '${String(runtime["version"])}'`,
    );
  }
  await installToolchainPackage(handle, "typeScriptRuntime", output);
}

async function importPackage(name) {
  const key = name === "target-typescript" ? "targetTypeScript" : name.replace(
    /-([a-z])/gu,
    (_, character) => character.toUpperCase(),
  );
  const entry = toolchain.packages[key]?.entry;
  if (entry === undefined) {
    throw new Error(`Toolchain package entry '${name}' is absent`);
  }
  return import(entry);
}

async function copyOwnedFile(sourceRoot, targetRoot, path) {
  const target = join(targetRoot, path);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(join(sourceRoot, path), target);
}

async function writeOwnedFile(root, path, text) {
  const target = join(root, validateRelativePath(path));
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

async function replaceDirectory(target, staged, preservedRoot) {
  try {
    await lstat(target);
  } catch (error) {
    if (error?.code === "ENOENT") {
      await mkdir(dirname(target), { recursive: true });
      await rename(staged, target);
      return;
    }
    throw error;
  }
  await mkdir(preservedRoot, { recursive: true });
  const preserved = join(preservedRoot, `${basename(target)}-${runIdentity}`);
  await rename(target, preserved);
  try {
    await rename(staged, target);
  } catch (error) {
    await rename(preserved, target);
    throw error;
  }
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
      throw new Error(`Target assembly member '${path}' is not a regular file`);
    }
  }
  return paths.sort(compareCodeUnits);
}

function validateRelativePath(path) {
  if (
    typeof path !== "string" ||
    path.length === 0 ||
    isAbsolute(path) ||
    path.includes("\\") ||
    relative(".", path).startsWith("..") ||
    path.split("/").some((part) => part.length === 0 || part === "." || part === "..")
  ) {
    throw new Error(`Artifact path '${String(path)}' is invalid`);
  }
  return path;
}

function parseRecord(text, subject) {
  const value = JSON.parse(text);
  if (!isRecord(value)) {
    throw new Error(`${subject} must be an object`);
  }
  return value;
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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
