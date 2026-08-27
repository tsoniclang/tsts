import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  chmod,
  copyFile,
  lstat,
  mkdir,
  readFile,
  realpath,
  writeFile,
} from "node:fs/promises";
import { COPYFILE_FICLONE } from "node:constants";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { isDeepStrictEqual } from "node:util";

import { compareCodeUnits } from "./canonical-order.mjs";
import { copyNormalizedTree, describeNormalizedTree } from "./normalized-tree.mjs";
import { generatedProductDirectory } from "./product-layout.mjs";
import {
  copyNormalizedDistribution,
  describeNormalizedDistribution,
} from "./runtime-distribution.mjs";

export const selectedSubmodules = Object.freeze([
  "tools/gotots",
  "tools/tsonic",
  "tools/tsonic-typescript",
  "tools/tsts-legacy",
  "tools/typescript-runtime",
  "vendor/typescript-go",
]);
export const nodeNpmExecutablePath = "bin/npm";

export async function verifyRepositoryAuthority(repositoryArgument, environment) {
  const authorityEnvironment = requireEnvironment(environment, "repository authority");
  const repositoryRoot = resolve(repositoryArgument);
  const status = runGit(
    repositoryRoot,
    ["status", "--porcelain", "--untracked-files=all", "--ignore-submodules=none"],
    "inspect superproject authority",
    authorityEnvironment,
  );
  if (status.length !== 0) {
    throw new Error(`The superproject authority is not clean\n${status}`);
  }
  const committedTree = runCommand(
    "git",
    ["-C", repositoryRoot, "ls-tree", "-r", "-z", "--full-tree", "HEAD"],
    authorityEnvironment,
    "Failed to read committed superproject tree",
  );
  const authorityEntries = committedTree
    .split("\0")
    .filter((entry) => entry.length !== 0)
    .filter((entry) => {
      const separator = entry.indexOf("\t");
      if (separator < 0) {
        throw new Error(`Committed superproject tree entry '${entry}' is invalid`);
      }
      const path = entry.slice(separator + 1);
      return path !== generatedProductDirectory &&
        !path.startsWith(`${generatedProductDirectory}/`);
    });
  const superprojectAuthorityDigest = createHash("sha256")
    .update(authorityEntries.map((entry) => `${entry}\0`).join(""))
    .digest("hex");
  const output = runGit(
    repositoryRoot,
    ["ls-tree", "-z", "HEAD", "--", ...selectedSubmodules],
    "read committed submodule gitlinks",
    authorityEnvironment,
  );
  const records = new Map();
  for (const entry of output.split("\0").filter((value) => value.length !== 0)) {
    const match = /^160000 commit ([0-9a-f]{40}|[0-9a-f]{64})\t([^\t]+)$/u.exec(entry);
    if (match === null || records.has(match[2])) {
      throw new Error(`Committed submodule record '${entry}' is invalid`);
    }
    records.set(match[2], match[1]);
  }
  if (
    records.size !== selectedSubmodules.length ||
    selectedSubmodules.some((path) => !records.has(path))
  ) {
    throw new Error("Committed submodule gitlinks are incomplete");
  }
  const submodules = [];
  for (const path of selectedSubmodules) {
    const checkoutRoot = join(repositoryRoot, path);
    const actualRoot = resolve(runGit(
      checkoutRoot,
      ["rev-parse", "--show-toplevel"],
      `locate submodule '${path}'`,
      authorityEnvironment,
    ));
    if (actualRoot !== resolve(checkoutRoot)) {
      throw new Error(`Selected submodule '${path}' is not initialized`);
    }
    const actual = runGit(
      checkoutRoot,
      ["rev-parse", "--verify", "HEAD^{commit}"],
      `read submodule '${path}' revision`,
      authorityEnvironment,
    );
    const expected = records.get(path);
    if (actual !== expected) {
      throw new Error(
        `Selected submodule '${path}' is at '${actual}', expected committed gitlink '${expected}'`,
      );
    }
    const submoduleStatus = runGit(
      checkoutRoot,
      ["status", "--porcelain", "--untracked-files=all"],
      `inspect submodule '${path}'`,
      authorityEnvironment,
    );
    if (submoduleStatus.length !== 0) {
      throw new Error(`Selected submodule '${path}' is not clean\n${submoduleStatus}`);
    }
    submodules.push(Object.freeze({ path, gitlink: expected }));
  }
  return Object.freeze({
    superprojectAuthorityDigest,
    submodules: Object.freeze(submodules),
  });
}

export async function inspectGoBuilder(goArgument, environment) {
  if (typeof goArgument !== "string" || goArgument.length === 0) {
    throw new Error("An explicit Go builder selection is required");
  }
  const executable = await realpath(resolve(goArgument));
  const executableInfo = await lstat(executable);
  if (!executableInfo.isFile()) {
    throw new Error(`Go builder '${executable}' is not a regular file`);
  }
  const selectedEnvironment = {
    ...requireEnvironment(environment, "Go builder inspection"),
    GOTOOLCHAIN: "local",
  };
  const version = runCommand(
    executable,
    ["version"],
    selectedEnvironment,
    "inspect Go builder version",
  ).trim();
  const document = JSON.parse(runCommand(
    executable,
    ["env", "-json", "GOVERSION", "GOROOT", "GOTOOLDIR", "GOHOSTOS", "GOHOSTARCH"],
    selectedEnvironment,
    "inspect Go builder environment",
  ));
  assertRecord(document, "Go builder environment");
  assertFields(
    document,
    ["GOHOSTARCH", "GOHOSTOS", "GOROOT", "GOTOOLDIR", "GOVERSION"],
    "Go builder environment",
  );
  for (const key of Object.keys(document)) {
    if (typeof document[key] !== "string" || document[key].length === 0) {
      throw new Error(`Go builder environment '${key}' is invalid`);
    }
  }
  if (!isAbsolute(document.GOROOT) || !isAbsolute(document.GOTOOLDIR)) {
    throw new Error("Go builder roots must be absolute");
  }
  const root = await realpath(document.GOROOT);
  const expectedExecutable = await realpath(join(root, "bin", "go"));
  if (executable !== expectedExecutable) {
    throw new Error("The explicit Go builder is not the selected Go root's bin/go");
  }
  const toolDirectory = await realpath(document.GOTOOLDIR);
  if (toolDirectory !== join(root, "pkg", "tool", `${document.GOHOSTOS}_${document.GOHOSTARCH}`)) {
    throw new Error("Go builder tool directory is outside its selected root");
  }
  const fingerprint = Object.freeze({
    version,
    goVersion: document.GOVERSION,
    hostOS: document.GOHOSTOS,
    hostArch: document.GOHOSTARCH,
    executableDigest: await digestFile(executable),
    rootDigest: (await describeNormalizedTree(root, "Go builder root")).digest,
  });
  return Object.freeze({ executable, root, fingerprint });
}

export async function stageGoRoot(selected, targetRoot, environment) {
  const stagingEnvironment = requireEnvironment(environment, "Go root staging");
  const copiedTree = await copyNormalizedTree(selected.root, targetRoot, "Go builder root");
  const executable = join(targetRoot, "bin", "go");
  const copied = await inspectGoBuilder(executable, {
    ...stagingEnvironment,
    GOROOT: targetRoot,
  });
  if (!isDeepStrictEqual(copied.fingerprint, selected.fingerprint)) {
    throw new Error("Copied Go root differs from the explicit bootstrap Go authority");
  }
  return Object.freeze({
    root: targetRoot,
    executable,
    executableFiles: copiedTree.executableFiles,
  });
}

export async function inspectNodeBootstrap(
  nodeArgument,
  npmCliArgument,
  environment,
) {
  if (
    typeof nodeArgument !== "string" || nodeArgument.length === 0 ||
    typeof npmCliArgument !== "string" || npmCliArgument.length === 0
  ) {
    throw new Error("Explicit Node and npm bootstrap selections are required");
  }
  const executable = await realpath(resolve(nodeArgument));
  const npmCli = await realpath(resolve(npmCliArgument));
  const inspectionEnvironment = requireEnvironment(environment, "Node/npm inspection");
  for (const [path, subject] of [[executable, "Node executable"], [npmCli, "npm CLI"]]) {
    if (!(await lstat(path)).isFile()) {
      throw new Error(`${subject} '${path}' is not a regular file`);
    }
  }
  const npmRoot = await locateNpmRoot(npmCli);
  const nodeVersion = runCommand(
    executable,
    ["--version"],
    inspectionEnvironment,
    "inspect Node bootstrap version",
  ).trim();
  const npmVersion = runCommand(
    executable,
    [npmCli, "--version"],
    inspectionEnvironment,
    "inspect npm bootstrap version",
  ).trim();
  const fingerprint = Object.freeze({
    nodeVersion,
    npmVersion,
    executableDigest: await digestFile(executable),
    npmDigest: (await describeNormalizedDistribution(
      npmRoot,
      "npm bootstrap distribution",
    )).digest,
    npmCli: relative(npmRoot, npmCli).split(sep).join("/"),
  });
  return Object.freeze({ executable, npmCli, npmRoot, fingerprint });
}

export async function stageNodeRuntime(selected, targetRoot, environment) {
  const stagingEnvironment = requireEnvironment(environment, "Node/npm staging");
  await mkdir(join(targetRoot, "bin"), { recursive: true });
  await copyFile(selected.executable, join(targetRoot, "bin", "node"), COPYFILE_FICLONE);
  await chmod(join(targetRoot, "bin", "node"), 0o755);
  const npm = await copyNormalizedDistribution(
    selected.npmRoot,
    join(targetRoot, "npm"),
    "npm bootstrap distribution",
  );
  if (npm.digest !== selected.fingerprint.npmDigest) {
    throw new Error("Artifact-owned npm distribution differs from its bootstrap authority");
  }
  const executableFiles = [
    "bin/node",
    nodeNpmExecutablePath,
    ...npm.executableFiles.map((path) => `npm/${path}`),
  ].sort(compareCodeUnits);
  const executable = join(targetRoot, "bin", "node");
  const npmCli = join(targetRoot, "npm", selected.fingerprint.npmCli);
  const npmExecutable = join(targetRoot, nodeNpmExecutablePath);
  await writeFile(
    npmExecutable,
    `#!/usr/bin/env node\nimport ${JSON.stringify(`../npm/${selected.fingerprint.npmCli}`)};\n`,
    { encoding: "utf8", mode: 0o755 },
  );
  await chmod(npmExecutable, 0o755);
  const nodeVersion = runCommand(
    executable,
    ["--version"],
    stagingEnvironment,
    "inspect artifact-owned Node version",
  ).trim();
  const npmVersion = runCommand(
    executable,
    [npmCli, "--version"],
    stagingEnvironment,
    "inspect artifact-owned npm version",
  ).trim();
  if (
    nodeVersion !== selected.fingerprint.nodeVersion ||
    npmVersion !== selected.fingerprint.npmVersion ||
    await digestFile(executable) !== selected.fingerprint.executableDigest
  ) {
    throw new Error("Artifact-owned Node/npm differs from its bootstrap authority");
  }
  return Object.freeze({
    root: targetRoot,
    executable,
    npmCli,
    npmExecutable,
    executableFiles: Object.freeze(executableFiles),
  });
}

async function locateNpmRoot(npmCli) {
  let directory = dirname(npmCli);
  while (dirname(directory) !== directory) {
    try {
      const document = JSON.parse(await readFile(join(directory, "package.json"), "utf8"));
      const declared = typeof document?.bin === "string" ? document.bin : document?.bin?.npm;
      if (
        document?.name === "npm" && typeof declared === "string" &&
        await realpath(join(directory, declared)) === npmCli
      ) {
        return directory;
      }
    } catch (error) {
      if (error?.code !== "ENOENT") {
        throw error;
      }
    }
    directory = dirname(directory);
  }
  throw new Error("The explicit npm CLI is not owned by an npm package distribution");
}

async function digestFile(path) {
  return createHash("sha256").update(await readFile(path)).digest("hex");
}

function runCommand(command, arguments_, environment, subject) {
  const result = spawnSync(command, arguments_, {
    encoding: "utf8",
    env: environment,
    maxBuffer: 32 * 1024 * 1024,
  });
  if (result.error !== undefined) {
    throw result.error;
  }
  if (result.signal !== null || result.status !== 0) {
    throw new Error(
      `${subject} failed: status=${String(result.status)} signal=${String(result.signal)}\n` +
        `${result.stdout}${result.stderr}`,
    );
  }
  return result.stdout;
}

function requireEnvironment(environment, subject) {
  if (
    typeof environment !== "object" || environment === null || Array.isArray(environment) ||
    typeof environment.PATH !== "string"
  ) {
    throw new Error(`${subject} requires an explicit closed environment`);
  }
  return environment;
}

function runGit(root, arguments_, subject, environment) {
  return runCommand("git", ["-C", root, ...arguments_], environment, `Failed to ${subject}`).trim();
}

function assertRecord(value, subject) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${subject} must be an object`);
  }
}

function assertFields(record, expected, subject) {
  if (!isDeepStrictEqual(
    Object.keys(record).sort(compareCodeUnits),
    [...expected].sort(compareCodeUnits),
  )) {
    throw new Error(`${subject} fields are invalid`);
  }
}
