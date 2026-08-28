import { spawnSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  realpath,
  rename,
  writeFile,
} from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";

import { copyPublishedPackage } from "./package-artifact.mjs";
import { compareCodeUnits } from "./canonical-order.mjs";
import { stageGoModuleCache } from "./go-module-cache.mjs";
import { createGoToolBuildModule } from "./go-tool-build.mjs";
import {
  inspectGoBuilder,
  inspectNodeBootstrap,
  stageGoRoot,
  stageNodeRuntime,
  verifyRepositoryAuthority,
} from "./toolchain-authority.mjs";
import {
  goModuleCachePath,
  goRootPath,
  nodeRuntimePath,
  rootPackageText,
  sealToolchainManifest,
  selectedBinaries,
  selectedPackages,
} from "./toolchain-contract.mjs";
import {
  exactAuthorityEnvironment,
  exactBootstrapEnvironment,
  exactGoBuildEnvironment,
  exactToolchainEnvironment,
  prepareToolchainState,
  validateHostUtilities,
} from "./toolchain-environment.mjs";
import {
  componentByKey,
  generatedGoRuntime,
} from "./toolchain-registry.mjs";
import {
  assembleCompilerDistribution,
  assembleTypeScriptGoSource,
} from "./toolchain-snapshots.mjs";

const installRoots = Object.freeze([
  ".",
  "tools/gotots/gostdlib",
  "tools/typescript-runtime",
  "tools/tsts-legacy",
  "tools/tsonic",
  "tools/tsonic-typescript",
]);

export async function createToolchainCandidate(
  repositoryRoot,
  goExecutable,
  goModuleCache,
  nodeExecutable,
  npmCli,
  hostUtilityPath,
) {
  const selectedHostUtilityPath = await validateHostUtilities(
    hostUtilityPath,
    [
      "awk", "bash", "date", "env", "flock", "git", "mkdir", "mv", "sh",
      "systemd-run", "time", "timeout",
    ],
  );
  const selectedModuleCache = await realpath(resolve(goModuleCache));
  const runIdentity = `${new Date().toISOString().replaceAll(/[:.]/gu, "-")}-${process.pid}-${randomUUID()}`;
  const runRoot = join(repositoryRoot, ".temp", "toolchain-builds", runIdentity);
  const stagedRoot = join(runRoot, "root");
  const stateRoot = join(runRoot, "state");
  await mkdir(stagedRoot, { recursive: true });
  await prepareToolchainState(stateRoot);
  const authorityEnvironment = exactAuthorityEnvironment(selectedHostUtilityPath, stateRoot);
  const bootstrapEnvironment = exactBootstrapEnvironment({
    goExecutable,
    nodeExecutable,
    hostUtilityPath: selectedHostUtilityPath,
    stateRoot,
  });
  await verifyAuthorityDocuments(repositoryRoot);
  const selection = await verifyRepositoryAuthority(repositoryRoot, authorityEnvironment);
  const bootstrapGo = await inspectGoBuilder(goExecutable, bootstrapEnvironment);
  const bootstrapNode = await inspectNodeBootstrap(nodeExecutable, npmCli, bootstrapEnvironment);
  const profile = await readBuildProfile(repositoryRoot);
  await preservePackageOutputs(repositoryRoot, runRoot);
  await writeFile(join(stagedRoot, "package.json"), rootPackageText, "utf8");
  const go = await stageGoRoot(
    bootstrapGo,
    join(stagedRoot, goRootPath),
    bootstrapEnvironment,
  );
  const node = await stageNodeRuntime(
    bootstrapNode,
    join(stagedRoot, nodeRuntimePath),
    bootstrapEnvironment,
  );
  const bootstrapModuleEnvironment = exactToolchainEnvironment({
    goRoot: go.root,
    nodeRoot: node.root,
    goModuleCache: selectedModuleCache,
    stateRoot,
    profile,
    hostUtilityPath: selectedHostUtilityPath,
  });
  const buildEnvironment = exactToolchainEnvironment({
    goRoot: go.root,
    nodeRoot: node.root,
    goModuleCache: join(stagedRoot, goModuleCachePath),
    stateRoot,
    profile,
    hostUtilityPath: selectedHostUtilityPath,
  });
  const goModules = await stageGoModuleCache({
    repositoryRoot,
    bootstrapRoot: selectedModuleCache,
    targetRoot: join(stagedRoot, goModuleCachePath),
    goExecutable: go.executable,
    profile,
    bootstrapEnvironment: bootstrapModuleEnvironment,
    stagedEnvironment: buildEnvironment,
  });
  const tsgoAuthority = await buildGoComponents(
    repositoryRoot,
    stagedRoot,
    stateRoot,
    go.executable,
    bootstrapGo.fingerprint.goVersion,
    profile,
    buildEnvironment,
    selection,
    goModules,
  );
  await buildJavaScriptPackages(
    repositoryRoot,
    join(stagedRoot, componentByKey.get("tsgo").target),
    node,
    buildEnvironment,
  );
  await stageEsbuild(repositoryRoot, stagedRoot, buildEnvironment);
  const afterBuild = await verifyRepositoryAuthority(repositoryRoot, authorityEnvironment);
  if (!isDeepStrictEqual(afterBuild, selection)) {
    throw new Error("Committed authority changed while the toolchain was built");
  }
  const packages = await assemblePackages(
    repositoryRoot,
    stagedRoot,
    node,
    buildEnvironment,
  );
  const distribution = await assembleCompilerDistribution({
    repositoryRoot,
    stagedRoot,
    packages,
    node,
    packageEnvironment: buildEnvironment,
    authorityEnvironment,
  });
  const source = await assembleTypeScriptGoSource({
    repositoryRoot,
    stagedRoot,
    goExecutable: go.executable,
    profile,
    buildEnvironment,
    authorityEnvironment,
    goModules,
  });
  const afterBuildGo = await inspectGoBuilder(go.executable, buildEnvironment);
  if (!isDeepStrictEqual(afterBuildGo.fingerprint, bootstrapGo.fingerprint)) {
    throw new Error("Artifact-owned Go root changed while the toolchain was built");
  }
  const afterBuildNode = await inspectNodeBootstrap(
    bootstrapNode.executable,
    bootstrapNode.npmCli,
    bootstrapEnvironment,
  );
  if (!isDeepStrictEqual(afterBuildNode.fingerprint, bootstrapNode.fingerprint)) {
    throw new Error("Bootstrap Node/npm changed while the toolchain was built");
  }
  const manifest = await sealToolchainManifest(stagedRoot, {
    selection,
    profile: profile.identity,
    goBootstrap: bootstrapGo.fingerprint,
    goRoot: go,
    goModules,
    nodeBootstrap: bootstrapNode.fingerprint,
    nodeRuntime: node,
    packages,
    binaries: await describeBinaries(stagedRoot),
    distribution,
    source,
    tsgoAuthority,
  });
  return Object.freeze({
    digest: manifest.digest,
    runRoot,
    runIdentity,
    stagedRoot,
  });
}

async function preservePackageOutputs(repositoryRoot, runRoot) {
  for (const selected of selectedPackages) {
    const output = join(repositoryRoot, selected.source, "dist");
    try {
      await lstat(output);
    } catch (error) {
      if (error?.code === "ENOENT") {
        continue;
      }
      throw error;
    }
    const preserved = join(runRoot, "prior-builds", selected.source, "dist");
    await mkdir(dirname(preserved), { recursive: true });
    await rename(output, preserved);
  }
}

async function buildGoComponents(
  repositoryRoot,
  stagedRoot,
  stateRoot,
  goExecutable,
  goVersion,
  profile,
  environment,
  selection,
  goModules,
) {
  const moduleRoot = join(repositoryRoot, "tools", "gotots");
  const buildEnvironment = exactGoBuildEnvironment(environment, profile);
  for (const [key, target] of [
    ["gotots", "./cmd/gotots"],
    ["tsgoAstPrinter", "./cmd/tsgo-ast-printer"],
  ]) {
    const output = join(stagedRoot, componentByKey.get(key).target);
    await mkdir(dirname(output), { recursive: true });
    run(
      goExecutable,
      ["build", "-trimpath", "-buildvcs=false", ...tagArguments(profile), "-o", output, target],
      moduleRoot,
      buildEnvironment,
      `build ${key}`,
    );
  }
  const vendorGitlink = selection.submodules.find((record) =>
    record.path === "vendor/typescript-go"
  ).gitlink;
  const pinned = await joinGoToTsTsgoPin(
    goExecutable,
    moduleRoot,
    vendorGitlink,
    buildEnvironment,
  );
  const output = join(stagedRoot, componentByKey.get("tsgo").target);
  const buildModuleRoot = await createGoToolBuildModule({
    root: join(stateRoot, "tsgo-build"),
    goVersion,
    modulePath: "github.com/microsoft/typescript-go",
    moduleVersion: pinned.version,
    moduleSum: pinned.sum,
    modules: goModules.modules,
  });
  run(
    goExecutable,
    [
      "build", "-trimpath", "-buildvcs=false", ...tagArguments(profile),
      "-o", output, "github.com/microsoft/typescript-go/cmd/tsgo",
    ],
    buildModuleRoot,
    buildEnvironment,
    "build pinned TypeScript-Go compiler",
  );
  const buildInfo = inspectTsgoBuildInfo(goExecutable, output, buildEnvironment);
  if (
    buildInfo.package !== "github.com/microsoft/typescript-go/cmd/tsgo" ||
    buildInfo.module !== "github.com/microsoft/typescript-go" ||
    buildInfo.version !== pinned.version || buildInfo.sum !== pinned.sum
  ) {
    throw new Error("TypeScript-Go executable build info differs from its sealed module authority");
  }
  return Object.freeze({
    package: buildInfo.package,
    module: buildInfo.module,
    version: buildInfo.version,
    sum: buildInfo.sum,
    sourceRevision: pinned.revision,
  });
}

async function joinGoToTsTsgoPin(goExecutable, moduleRoot, vendorGitlink, environment) {
  const schema = JSON.parse(await readFile(
    join(moduleRoot, "schema", "tsgo", "manifest.json"),
    "utf8",
  ));
  const module = JSON.parse(runCapture(
    goExecutable,
    ["mod", "edit", "-json"],
    moduleRoot,
    environment,
    "inspect GoToTS module authority",
  ));
  const requirements = Array.isArray(module?.Require)
    ? module.Require.filter((entry) => entry?.Path === "github.com/microsoft/typescript-go")
    : [];
  const tools = Array.isArray(module?.Tool)
    ? module.Tool.filter((entry) =>
      entry?.Path === "github.com/microsoft/typescript-go/cmd/tsgo"
    )
    : [];
  if (
    schema?.schemaVersion !== 1 ||
    schema?.module !== "github.com/microsoft/typescript-go" ||
    schema?.toolPackage !== "github.com/microsoft/typescript-go/cmd/tsgo" ||
    typeof schema?.toolVersion !== "string" ||
    typeof schema?.toolSum !== "string" || !/^h1:[A-Za-z0-9+/]{43}=$/u.test(schema.toolSum) ||
    schema?.revision !== vendorGitlink ||
    requirements.length !== 1 || requirements[0].Version !== schema.toolVersion ||
    tools.length !== 1 ||
    (Array.isArray(module?.Replace) && module.Replace.some((entry) =>
      entry?.Old?.Path === schema.module
    ))
  ) {
    throw new Error("GoToTS TS-Go schema pin differs from the committed vendor gitlink");
  }
  return Object.freeze({
    version: schema.toolVersion,
    sum: schema.toolSum,
    revision: schema.revision,
  });
}

function inspectTsgoBuildInfo(goExecutable, binary, environment) {
  const output = runCapture(
    goExecutable,
    ["version", "-m", binary],
    dirname(binary),
    environment,
    "inspect TypeScript-Go executable build info",
  );
  const values = new Map();
  for (const line of output.split("\n")) {
    const fields = line.split("\t");
    if (fields[1] === "path") {
      values.set("package", fields[2]);
    } else if (fields[1] === "mod") {
      values.set("module", fields[2]);
      values.set("version", fields[3]);
      values.set("sum", fields[4]);
    } else if (fields[1] === "build") {
      const separator = fields[2]?.indexOf("=") ?? -1;
      if (separator !== -1) {
        values.set(fields[2].slice(0, separator), fields[2].slice(separator + 1));
      }
    }
  }
  return {
    package: values.get("package"),
    module: values.get("module"),
    version: values.get("version"),
    sum: values.get("sum"),
  };
}

async function buildJavaScriptPackages(repositoryRoot, tsgo, node, environment) {
  for (const path of installRoots) {
    runNpm(
      node,
      ["--prefix", join(repositoryRoot, path), "ci"],
      repositoryRoot,
      environment,
      `install ${path}`,
    );
  }
  for (const config of [
    "tools/gotots/gostdlib/test/runtime-package/tsconfig.json",
    "tools/gotots/gostdlib/tsconfig.json",
    "tools/gotots/externals/tsconfig.json",
    "tools/tsonic/packages/source-core/tsconfig.json",
    "tools/tsonic/packages/target-api/tsconfig.json",
    "tools/tsonic/packages/host/tsconfig.json",
  ]) {
    run(
      tsgo,
      ["-p", join(repositoryRoot, config), "--pretty", "false"],
      repositoryRoot,
      environment,
      `build ${config}`,
    );
  }
  for (const path of [
    "tools/typescript-runtime",
    "tools/tsts-legacy",
    "tools/tsonic-typescript",
  ]) {
    runNpm(
      node,
      ["--prefix", join(repositoryRoot, path), "run", "build"],
      repositoryRoot,
      environment,
      `build ${path}`,
    );
  }
}

async function stageEsbuild(repositoryRoot, stagedRoot, environment) {
  const source = join(repositoryRoot, "node_modules", "esbuild", "bin", "esbuild");
  const selected = await lstat(source);
  if (!selected.isFile() || (selected.mode & 0o111) === 0) {
    throw new Error("Installed esbuild is not an executable file");
  }
  const version = runCapture(
    source,
    ["--version"],
    repositoryRoot,
    environment,
    "inspect esbuild executable",
  ).trim();
  if (version !== "0.28.0") {
    throw new Error(`Installed esbuild version '${version}' is not 0.28.0`);
  }
  const target = join(stagedRoot, componentByKey.get("esbuild").target);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
}

async function assemblePackages(repositoryRoot, stagedRoot, node, environment) {
  const records = [];
  for (const selected of selectedPackages) {
    const artifact = await copyPublishedPackage({
      sourceRoot: join(repositoryRoot, selected.source),
      targetRoot: join(stagedRoot, selected.target),
      expectedName: selected.name,
      npmExecutable: node.npmExecutable,
      environment,
    });
    records.push({
      key: selected.key,
      name: artifact.name,
      version: artifact.version,
      root: selected.target,
      files: artifact.files,
      digest: artifact.digest,
    });
  }
  for (const [index, selected] of selectedPackages.entries()) {
    records[index].dependencies = await readPackageDependencies(
      join(stagedRoot, selected.target, "package.json"),
      selected,
      records,
    );
    Object.freeze(records[index]);
  }
  return Object.freeze(records);
}

async function describeBinaries(stagedRoot) {
  const records = [];
  for (const selected of selectedBinaries) {
    records.push(Object.freeze({
      key: selected.key,
      path: selected.path,
      digest: createHash("sha256")
        .update(await readFile(join(stagedRoot, selected.path)))
        .digest("hex"),
    }));
  }
  return Object.freeze(records);
}

async function readPackageDependencies(path, selected, packages) {
  const document = JSON.parse(await readFile(path, "utf8"));
  const declared = { ...(document.peerDependencies ?? {}), ...(document.dependencies ?? {}) };
  const internalNames = new Set(
    [...selectedPackages.map((entry) => entry.name), generatedGoRuntime.name],
  );
  const unexpected = Object.keys(declared).find((name) =>
    internalNames.has(name) && !selected.dependencies.some((key) => componentByKey.get(key).name === name)
  );
  if (unexpected !== undefined) {
    throw new Error(`Package '${selected.name}' has unowned internal dependency '${unexpected}'`);
  }
  return Object.freeze(selected.dependencies.map((key) => {
    const owner = componentByKey.get(key);
    const version = owner.kind === "generated-package"
      ? owner.version
      : packages.find((record) => record.key === key)?.version;
    if (declared[owner.name] !== version) {
      throw new Error(
        `Package '${selected.name}' dependency '${owner.name}' is '${String(declared[owner.name])}', expected '${version}'`,
      );
    }
    return Object.freeze({ key, name: owner.name, version });
  }));
}

async function verifyAuthorityDocuments(repositoryRoot) {
  const agents = await readFile(join(repositoryRoot, "AGENTS.md"));
  const claude = await readFile(join(repositoryRoot, "CLAUDE.md"));
  if (!agents.equals(claude)) {
    throw new Error("AGENTS.md and CLAUDE.md differ");
  }
}

async function readBuildProfile(repositoryRoot) {
  const document = JSON.parse(await readFile(join(repositoryRoot, "gotots.json"), "utf8"));
  const selected = document?.go;
  if (
    !isRecord(selected) || typeof selected.goos !== "string" ||
    typeof selected.goarch !== "string" || typeof selected.cgo !== "boolean" ||
    !Array.isArray(selected.tags) || !selected.tags.every((tag) => typeof tag === "string")
  ) {
    throw new Error("gotots.json Go build profile is invalid");
  }
  const identity = Object.freeze({
    goos: selected.goos,
    goarch: selected.goarch,
    cgo: selected.cgo,
    tags: Object.freeze([...new Set(selected.tags)].sort(compareCodeUnits)),
  });
  return Object.freeze({ ...identity, identity });
}

function tagArguments(profile) {
  return profile.tags.length === 0 ? [] : [`-tags=${profile.tags.join(",")}`];
}

function run(command, arguments_, cwd, environment, subject) {
  const output = runCapture(command, arguments_, cwd, environment, subject);
  if (output.length !== 0) {
    process.stderr.write(output.endsWith("\n") ? output : `${output}\n`);
  }
}

function runNpm(node, arguments_, cwd, environment, subject) {
  run(node.npmExecutable, arguments_, cwd, environment, subject);
}

function runCapture(command, arguments_, cwd, environment, subject) {
  const result = spawnSync(command, arguments_, {
    cwd,
    encoding: "utf8",
    env: environment,
    maxBuffer: 64 * 1024 * 1024,
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
  if (result.stderr.length !== 0) {
    process.stderr.write(result.stderr);
  }
  return result.stdout;
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
