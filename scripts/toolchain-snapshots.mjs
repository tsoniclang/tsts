import { spawnSync } from "node:child_process";
import { COPYFILE_FICLONE } from "node:constants";
import { copyFile, lstat, mkdir, readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";

import { compareCodeUnits } from "./canonical-order.mjs";
import { verifyOfflineSourceClosure } from "./go-module-cache.mjs";
import { parseJsonSequence } from "./json-sequence.mjs";
import {
  copyPublishedPackage,
  digestExactFiles,
  validateRelativePath,
} from "./package-artifact.mjs";
import {
  distributionPath,
  sourceSnapshotPath,
} from "./toolchain-contract.mjs";
import { exactGoBuildEnvironment } from "./toolchain-environment.mjs";
import {
  componentByKey,
  distributionPackageComponents,
} from "./toolchain-registry.mjs";

export async function assembleCompilerDistribution({
  repositoryRoot,
  stagedRoot,
  packages,
  node,
  packageEnvironment,
  authorityEnvironment,
}) {
  const sourceRoot = join(repositoryRoot, "tools", "gotots");
  const targetRoot = join(stagedRoot, distributionPath);
  const trackedFiles = committedRegularFiles(
    sourceRoot,
    ["go.mod", "go.sum", "gostdlib", "externals"],
    false,
    authorityEnvironment,
  );
  await copyTrackedFiles(sourceRoot, targetRoot, trackedFiles);
  for (const key of ["gostdlib", "externals"]) {
    const selected = packages.find((record) => record.key === key);
    await mergeExactFiles(join(stagedRoot, selected.root), join(targetRoot, key), selected.files);
  }
  const dependencies = [];
  for (const component of distributionPackageComponents) {
    const relativeRoot = relative(targetRoot, join(stagedRoot, component.target))
      .split("\\").join("/");
    const artifact = await copyPublishedPackage({
      sourceRoot: join(repositoryRoot, component.source),
      targetRoot: join(stagedRoot, component.target),
      expectedName: component.name,
      nodeExecutable: node.executable,
      npmCli: node.npmCli,
      environment: packageEnvironment,
    });
    dependencies.push({
      key: component.key,
      name: component.name,
      version: artifact.version,
      root: relativeRoot,
      files: artifact.files,
      digest: artifact.digest,
    });
  }
  for (const [index, component] of distributionPackageComponents.entries()) {
    const document = JSON.parse(await readFile(
      join(stagedRoot, component.target, "package.json"),
      "utf8",
    ));
    const declared = { ...(document.peerDependencies ?? {}), ...(document.dependencies ?? {}) };
    dependencies[index].dependencies = Object.freeze(component.dependencies.map((key) => {
      const owner = componentByKey.get(key);
      const selected = dependencies.find((record) => record.key === key);
      if (typeof declared[owner.name] !== "string" || selected === undefined) {
        throw new Error(
          `Distribution package '${component.name}' dependency '${owner.name}' is unresolved`,
        );
      }
      return Object.freeze({
        key,
        name: owner.name,
        requirement: declared[owner.name],
        version: selected.version,
      });
    }));
    Object.freeze(dependencies[index]);
  }
  const files = await listRegularFiles(targetRoot, "compiler distribution");
  return Object.freeze({
    root: distributionPath,
    trackedFiles: Object.freeze(trackedFiles),
    files: Object.freeze(files),
    digest: await digestExactFiles(targetRoot, files),
    dependencies: Object.freeze(dependencies),
  });
}

export async function assembleTypeScriptGoSource({
  repositoryRoot,
  stagedRoot,
  goExecutable,
  profile,
  buildEnvironment,
  authorityEnvironment,
  goModules,
}) {
  const sourceRoot = join(repositoryRoot, "vendor", "typescript-go");
  const targetRoot = join(stagedRoot, sourceSnapshotPath);
  const files = selectGoSourceFiles(
    sourceRoot,
    goExecutable,
    profile,
    buildEnvironment,
    authorityEnvironment,
  );
  await copyTrackedFiles(sourceRoot, targetRoot, files);
  await verifyOfflineSourceClosure({
    sourceRoot: targetRoot,
    goExecutable,
    profile,
    environment: buildEnvironment,
    expectedModules: goModules.modules,
  });
  return Object.freeze({
    root: sourceSnapshotPath,
    files: Object.freeze(files),
    digest: await digestExactFiles(targetRoot, files),
  });
}

function selectGoSourceFiles(
  sourceRoot,
  goExecutable,
  profile,
  buildEnvironment,
  authorityEnvironment,
) {
  const output = runCapture(
    goExecutable,
    ["list", "-deps", ...tagArguments(profile), "-json", "./cmd/tsgo"],
    sourceRoot,
    exactGoBuildEnvironment(buildEnvironment, profile),
    "select TypeScript-Go source closure",
  );
  const tracked = new Set(committedRegularFiles(sourceRoot, [], true, authorityEnvironment));
  const files = new Set(["go.mod", "go.sum"]);
  const fields = [
    "GoFiles", "CgoFiles", "CFiles", "CXXFiles", "MFiles", "HFiles", "FFiles",
    "SFiles", "SwigFiles", "SwigCXXFiles", "SysoFiles", "EmbedFiles",
  ];
  for (const selected of parseJsonSequence(output, "TypeScript-Go source closure")) {
    if (!isRecord(selected) || typeof selected.Dir !== "string") {
      throw new Error("Go source closure contains an invalid package");
    }
    const directory = resolve(selected.Dir);
    if (directory !== sourceRoot && !directory.startsWith(`${sourceRoot}/`)) {
      continue;
    }
    for (const field of fields) {
      if (!Array.isArray(selected[field])) continue;
      for (const name of selected[field]) {
        const path = relative(sourceRoot, join(directory, name)).split("\\").join("/");
        validateRelativePath(path, "TypeScript-Go source closure");
        files.add(path);
      }
    }
  }
  const selected = [...files].sort(compareCodeUnits);
  const untracked = selected.find((path) => !tracked.has(path));
  if (untracked !== undefined) {
    throw new Error(`TypeScript-Go source closure '${untracked}' is not committed`);
  }
  return selected;
}

function committedRegularFiles(repositoryRoot, paths, allowGitlinks, environment) {
  const result = runCapture(
    "git",
    ["-C", repositoryRoot, "ls-tree", "-r", "-z", "HEAD", "--", ...paths],
    repositoryRoot,
    environment,
    "read committed file membership",
  );
  const files = [];
  for (const entry of result.split("\0").filter((value) => value.length !== 0)) {
    const match = /^(100644|100755) blob [0-9a-f]+\t([^\t]+)$/u.exec(entry);
    if (match === null) {
      if (allowGitlinks && /^160000 commit [0-9a-f]+\t[^\t]+$/u.test(entry)) continue;
      throw new Error(`Committed member '${entry}' is not a regular file`);
    }
    files.push(validateRelativePath(match[2], "committed snapshot"));
  }
  return files.sort(compareCodeUnits);
}

async function copyTrackedFiles(sourceRoot, targetRoot, files) {
  for (const path of files) {
    const source = join(sourceRoot, path);
    const info = await lstat(source);
    if (!info.isFile() || info.nlink !== 1) {
      throw new Error(`Committed snapshot member '${path}' is not an unaliased regular file`);
    }
    const target = join(targetRoot, path);
    await mkdir(dirname(target), { recursive: true });
    await copyFile(source, target, COPYFILE_FICLONE);
  }
}

async function mergeExactFiles(sourceRoot, targetRoot, files) {
  for (const path of files) {
    const source = join(sourceRoot, path);
    const target = join(targetRoot, path);
    try {
      const existing = await readFile(target);
      if (!existing.equals(await readFile(source))) {
        throw new Error(`Distribution package member '${path}' conflicts with tracked content`);
      }
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
      await mkdir(dirname(target), { recursive: true });
      await copyFile(source, target, COPYFILE_FICLONE);
    }
  }
}

async function listRegularFiles(root, subject, directory = "") {
  const result = [];
  const entries = await readdir(join(root, directory), { withFileTypes: true });
  entries.sort((left, right) => compareCodeUnits(left.name, right.name));
  for (const entry of entries) {
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

function runCapture(command, arguments_, cwd, environment, subject) {
  const result = spawnSync(command, arguments_, {
    cwd,
    encoding: "utf8",
    env: environment,
    maxBuffer: 128 * 1024 * 1024,
  });
  if (result.error !== undefined) throw result.error;
  if (result.signal !== null || result.status !== 0) {
    throw new Error(`${subject} failed: status=${String(result.status)} signal=${String(result.signal)}\n${result.stdout}${result.stderr}`);
  }
  return result.stdout;
}

function tagArguments(profile) {
  return profile.tags.length === 0 ? [] : [`-tags=${profile.tags.join(",")}`];
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
