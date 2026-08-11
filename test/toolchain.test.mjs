import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  chmod,
  link,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  symlink,
  writeFile,
} from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import test from "node:test";

import { compareCodeUnits } from "../scripts/canonical-order.mjs";
import { stageGoModuleCache } from "../scripts/go-module-cache.mjs";
import { sealTargetManifest, verifyTargetManifest } from "../scripts/target-manifest.mjs";
import {
  exactAuthorityEnvironment,
  exactToolchainEnvironment,
  prepareToolchainState,
} from "../scripts/toolchain-environment.mjs";
import { assembleTypeScriptGoSource } from "../scripts/toolchain-snapshots.mjs";
import {
  buildToolchain,
  installToolchainPackage,
  openSelectedToolchain,
  openToolchain,
  toolchainEnvironment,
} from "../scripts/toolchain.mjs";
import {
  advanceSelection,
  buildOptions,
  createToolchainFixture,
  runGit,
  selectGitlink,
} from "./support/toolchain-fixture.mjs";

const digestA = "a".repeat(64);
const digestB = "b".repeat(64);

test("canonical build is deterministic, fresh, closed, and fully owned", async () => {
  const fixture = await createToolchainFixture("deterministic-");
  const staleDist = join(fixture.repositoryRoot, "tools", "tsonic-typescript", "dist");
  await mkdir(staleDist, { recursive: true });
  await writeFile(join(staleDist, "index.js"), "export const identity = 'stale';\n", "utf8");

  const ambient = saveEnvironment([
    "PATH", "GOMODCACHE", "GOPROXY", "GOSUMDB", "GOENV", "GOFLAGS",
    "NODE_OPTIONS", "NODE_PATH", "NPM_CONFIG_PREFIX",
  ]);
  Object.assign(process.env, {
    PATH: fixture.poisonPath,
    GOMODCACHE: "/poison/modules",
    GOPROXY: "https://poison.invalid",
    GOSUMDB: "poison.invalid",
    GOENV: "/poison/goenv",
    GOFLAGS: "-mod=mod",
    NODE_OPTIONS: "--require=/poison.js",
    NODE_PATH: "/poison/node_modules",
    NPM_CONFIG_PREFIX: "/poison/npm",
  });
  let first;
  try {
    first = await buildToolchain(fixture.repositoryRoot, buildOptions(fixture));
  } finally {
    restoreEnvironment(ambient);
  }
  const firstManifest = await readFile(join(first.root, "toolchain-manifest.json"), "utf8");
  assert.equal(first.manifest.schemaVersion, 3);
  assert.equal(Object.hasOwn(first.manifest, "hostPlatform"), false);
  assert.deepEqual(
    first.manifest.goModules.modules.map(({ path, version }) => `${path}@${version}`),
    [
      "example.com/dependency@v1.2.3",
      `github.com/microsoft/typescript-go@${first.manifest.tsgoAuthority.version}`,
    ],
  );
  assert.deepEqual(
    first.manifest.goModules.queries.map(({ key }) => key),
    ["gotots-tools", "typescript-go-product", "typescript-go-tool"],
  );
  assert.match(
    await readFile(join(first.packages.targetTypeScript.root, "dist", "index.js"), "utf8"),
    /@tsonic\/target-typescript:A/u,
  );
  assert.equal(
    await readFile(join(first.distributionRoot, "gostdlib", "dist", "index.js"), "utf8"),
    await readFile(join(first.packages.gostdlib.root, "dist", "index.js"), "utf8"),
  );
  for (const path of [
    join(first.goRoot, "version-link"),
    join(first.goRoot, "source-link"),
    join(first.nodeRoot, "npm", "bin", "npm-alias.mjs"),
  ]) {
    assert.equal((await lstat(path)).isSymbolicLink(), false, path);
  }
  assert.equal(
    first.manifest.tsgoAuthority.sourceRevision,
    first.manifest.selection.submodules.find(({ path }) =>
      path === "vendor/typescript-go"
    ).gitlink,
  );
  assert.equal(first.manifest.tsgoAuthority.module, "github.com/microsoft/typescript-go");

  const originalLocaleCompare = String.prototype.localeCompare;
  String.prototype.localeCompare = () => { throw new Error("locale ordering is forbidden"); };
  let second;
  try {
    second = await buildToolchain(fixture.repositoryRoot, buildOptions(fixture));
  } finally {
    String.prototype.localeCompare = originalLocaleCompare;
  }
  assert.equal(second.digest, first.digest);
  assert.equal(await readFile(join(second.root, "toolchain-manifest.json"), "utf8"), firstManifest);

  await writeFile(
    join(fixture.repositoryRoot, "tools", "typescript-runtime", "dist", "index.js"),
    "export const identity = 'live mutation';\n",
    "utf8",
  );
  await writeFile(
    join(fixture.repositoryRoot, "vendor", "typescript-go", "cmd", "tsgo", "main.go"),
    "package main\n\nfunc main() { panic(\"live mutation\") }\n",
    "utf8",
  );
  const installed = join(fixture.repositoryRoot, ".temp", "installed-runtime");
  await installToolchainPackage(first, "typeScriptRuntime", installed);
  assert.match(
    await readFile(
      join(installed, "node_modules", "@tsonic", "typescript-runtime", "dist", "index.js"),
      "utf8",
    ),
    /:A/u,
  );
  assert.match(await readFile(join(first.sourceRoot, "cmd", "tsgo", "main.go"), "utf8"), /func main\(\) \{\}/u);
});

test("historical open needs no bootstrap and rejects every sealed mutation class", async () => {
  const fixture = await createToolchainFixture("lifecycle-");
  const handle = await buildToolchain(fixture.repositoryRoot, buildOptions(fixture));
  for (const [source, preserved] of [
    [fixture.goRoot, "bootstrap-go"],
    [dirname(dirname(fixture.bootstrapNode)), "bootstrap-node"],
    [fixture.npmRoot, "bootstrap-npm"],
    [resolve(fixture.goModuleCache, "../.."), "bootstrap-gopath"],
  ]) {
    await rename(source, join(fixture.repositoryRoot, ".temp", `preserved-${preserved}`));
  }
  const reopened = await openExact(fixture, handle);
  assert.equal(reopened.digest, handle.digest);
  assert.match(run(reopened.binaries.go, ["version"], toolchainEnvironment(reopened)), /go1\.26\.4/u);
  assert.match(
    run(
      reopened.binaries.go,
      ["list", "-deps", "-json", "./cmd/tsgo"],
      toolchainEnvironment(reopened),
      reopened.sourceRoot,
    ),
    /example\.com\/dependency/u,
  );
  assert.match(run(reopened.binaries.node, ["--version"], toolchainEnvironment(reopened)), /^v/u);
  assert.equal(
    run(reopened.binaries.node, [reopened.binaries.npm, "--version"], toolchainEnvironment(reopened)).trim(),
    "10.0.0",
  );

  const module = reopened.manifest.goModules.modules[0];
  for (const path of [
    join(reopened.packages.host.root, "dist", "index.js"),
    reopened.binaries.gotots,
    reopened.binaries.tsgoAstPrinter,
    reopened.binaries.tsgo,
    reopened.binaries.go,
    reopened.binaries.node,
    reopened.binaries.npm,
    join(reopened.goRoot, "src", "identity.txt"),
    join(reopened.goModuleCache, module.sourceRoot, module.sourceFiles[0]),
    join(reopened.goModuleCache, module.metadata.zip),
    join(reopened.sourceRoot, "cmd", "tsgo", "main.go"),
    join(reopened.distributionRoot, "gostdlib", "node_modules", "@types", "node", "index.d.ts"),
  ]) {
    await mutateAndRestore(path, async () => {
      await assert.rejects(openExact(fixture, reopened), /membership|content|digest|differs/u);
    });
  }

  const moduleParent = dirname(join(reopened.goModuleCache, module.sourceRoot, module.sourceFiles[0]));
  await withWritable(moduleParent, async () => {
    const extra = join(moduleParent, "unowned.go");
    await writeFile(extra, "package dependency\n", "utf8");
    await assert.rejects(openExact(fixture, reopened), /membership/u);
    await rename(extra, join(fixture.repositoryRoot, ".temp", "preserved-unowned-module.go"));
  });
  await moveAndRestore(
    join(reopened.goModuleCache, module.metadata.info),
    join(fixture.repositoryRoot, ".temp", "preserved-module-info"),
    async () => assert.rejects(openExact(fixture, reopened), /membership|ENOENT/u),
  );
  const npmBin = join(reopened.nodeRoot, "npm", "bin");
  await withWritable(npmBin, async () => {
    const extra = join(npmBin, "unowned.mjs");
    await writeFile(extra, "export {};\n", "utf8");
    await assert.rejects(openExact(fixture, reopened), /membership/u);
    await rename(extra, join(fixture.repositoryRoot, ".temp", "preserved-unowned-npm.mjs"));
  });
  await moveAndRestore(
    join(npmBin, "npm-alias.mjs"),
    join(fixture.repositoryRoot, ".temp", "preserved-npm-alias.mjs"),
    async () => assert.rejects(openExact(fixture, reopened), /membership|ENOENT/u),
  );
  await hardlinkAndRestore(
    join(reopened.packages.host.root, "dist", "index.js"),
    join(fixture.repositoryRoot, ".temp", "hardlink-evidence"),
    async () => assert.rejects(openExact(fixture, reopened), /hard link/u),
  );
});

test("construction rejects incomplete, escaping, colliding, and duplicate inputs", async () => {
  const missing = await createToolchainFixture("missing-");
  await assert.rejects(buildToolchain(missing.repositoryRoot, {}), /Explicit Go, Go module cache, Node, npm/u);

  const escapingGo = await createToolchainFixture("escaping-go-");
  const external = join(escapingGo.repositoryRoot, ".temp", "external-go-bytes");
  await writeFile(external, "external\n", "utf8");
  await symlink(external, join(escapingGo.goRoot, "escaping-link"));
  await assert.rejects(buildToolchain(escapingGo.repositoryRoot, buildOptions(escapingGo)), /symlink .* escapes/u);

  const escapingNpm = await createToolchainFixture("escaping-npm-");
  const externalNpm = join(escapingNpm.repositoryRoot, ".temp", "external-npm-bytes");
  await writeFile(externalNpm, "external\n", "utf8");
  await symlink(externalNpm, join(escapingNpm.npmRoot, "escaping-link"));
  await assert.rejects(buildToolchain(escapingNpm.repositoryRoot, buildOptions(escapingNpm)), /symlink .* escapes/u);

  for (const [prefix, control, pattern] of [
    ["wrong-sum-", { downloadSum: `h1:${"B".repeat(43)}=` }, /differs from selection/u],
    ["wrong-version-", { downloadVersion: "v9.9.9" }, /differs from selection/u],
    ["collision-", { collision: true }, /collides/u],
  ]) {
    const fixture = await createToolchainFixture(prefix);
    await writeFile(fixture.moduleControl, JSON.stringify(control), "utf8");
    await assert.rejects(buildToolchain(fixture.repositoryRoot, buildOptions(fixture)), pattern);
  }

  const nested = await createToolchainFixture("nested-");
  await writeFile(join(nested.npmRoot, "control.json"), JSON.stringify({ nested: true }), "utf8");
  await assert.rejects(buildToolchain(nested.repositoryRoot, buildOptions(nested)), /nested node_modules/u);
  assert.equal((await lstat(join(nested.repositoryRoot, ".temp", "toolchain-builds"))).isDirectory(), true);
});

test("selection uses clean committed HEAD and rejects index or untracked authority", async () => {
  const stale = await createToolchainFixture("stale-head-");
  await advanceSelection(stale, "tools/tsonic-typescript", "B", false);
  await assert.rejects(buildToolchain(stale.repositoryRoot, buildOptions(stale)), /superproject authority is not clean/u);

  const mismatch = await createToolchainFixture("stale-checkout-");
  const submodule = join(mismatch.repositoryRoot, "tools", "tsonic-typescript");
  await writeFile(join(submodule, "selection.txt"), "B\n", "utf8");
  runGit(submodule, ["add", "selection.txt"]);
  runGit(submodule, [
    "-c", "user.name=TSTS Tests", "-c", "user.email=tsts-tests@example.invalid",
    "commit", "--quiet", "-m", "unselected B",
  ]);
  await assert.rejects(
    buildToolchain(mismatch.repositoryRoot, buildOptions(mismatch)),
    /superproject authority is not clean|expected committed gitlink/u,
  );

  const indexOnly = await createToolchainFixture("index-only-");
  selectGitlink(indexOnly.repositoryRoot, "tools/tsonic-typescript", "1".repeat(40));
  await assert.rejects(buildToolchain(indexOnly.repositoryRoot, buildOptions(indexOnly)), /superproject authority is not clean/u);

  const untracked = await createToolchainFixture("untracked-");
  await writeFile(join(untracked.repositoryRoot, "untracked-config.json"), "{}\n", "utf8");
  await assert.rejects(buildToolchain(untracked.repositoryRoot, buildOptions(untracked)), /superproject authority is not clean/u);
});

test("selector replacement cannot change an opened or target-selected historical root", async () => {
  const fixture = await createToolchainFixture("selector-");
  const first = await buildToolchain(fixture.repositoryRoot, buildOptions(fixture));
  const opened = await openSelectedToolchain(fixture.repositoryRoot);
  const targetRoot = join(fixture.repositoryRoot, ".temp", "target");
  await mkdir(targetRoot, { recursive: true });
  await writeFile(join(targetRoot, "program.ts"), "export {};\n", "utf8");
  await sealTargetManifest(targetRoot, digestA, digestB, first.digest);

  await advanceSelection(fixture, "tools/tsonic-typescript", "B");
  const second = await buildToolchain(fixture.repositoryRoot, buildOptions(fixture));
  assert.notEqual(second.digest, first.digest);
  assert.match(await readFile(join(opened.packages.targetTypeScript.root, "dist", "index.js"), "utf8"), /:A/u);
  assert.equal((await openSelectedToolchain(fixture.repositoryRoot)).digest, second.digest);

  const target = await verifyTargetManifest(targetRoot, digestA, digestB);
  const historical = await openToolchain(fixture.repositoryRoot, {
    digest: target.toolchainDigest,
    root: join(fixture.repositoryRoot, ".temp", "toolchains", target.toolchainDigest),
  });
  assert.equal(historical.digest, first.digest);

  await mutateAndRestore(join(targetRoot, "program.ts"), async () => {
    await assert.rejects(verifyTargetManifest(targetRoot, digestA, digestB), /content, type, or membership/u);
  });
  await hardlinkAndRestore(
    join(targetRoot, "program.ts"),
    join(fixture.repositoryRoot, ".temp", "target-hardlink"),
    async () => assert.rejects(verifyTargetManifest(targetRoot, digestA, digestB), /hard link/u),
  );
  await replaceFileWithDirectory(join(targetRoot, "program.ts"), async () => {
    await assert.rejects(verifyTargetManifest(targetRoot, digestA, digestB), /content, type, or membership/u);
  });
});

test("product consumers have one immutable path and a closed environment", async () => {
  const environment = exactToolchainEnvironment({
    goRoot: "/artifact/go-root",
    nodeRoot: "/artifact/node-runtime",
    goModuleCache: "/artifact/go-module-cache/pkg/mod",
    stateRoot: "/state",
    profile: { goos: "linux", goarch: "amd64", cgo: false },
  });
  assert.equal(environment.PATH, "/artifact/node-runtime/bin:/artifact/go-root/bin");
  assert.equal(environment.GOMODCACHE, "/artifact/go-module-cache/pkg/mod");
  assert.equal(environment.GOPROXY, "off");
  assert.equal(environment.GOSUMDB, "off");
  assert.equal(environment.GOENV, "off");
  assert.equal(environment.HOME, "/state/home");
  assert.equal(environment.NODE_OPTIONS, "");
  assert.notEqual(environment.NPM_CONFIG_GLOBALCONFIG, environment.NPM_CONFIG_USERCONFIG);

  const repositoryRoot = resolve(".");
  for (const script of [
    "assemble.mjs", "target.mjs", "verify-target-manifest.mjs", "verify-typescript-target.mjs",
  ]) {
    assert.match(await readFile(join(repositoryRoot, "scripts", script), "utf8"), /\.\/toolchain\.mjs/u, script);
  }
  for (const script of [
    "build.sh", "check-scalar.sh", "replay.sh", "run-exact-toolchain.sh", "target.mjs",
    "verify-typescript-target.mjs", "assemble.mjs", "differential.mjs",
  ]) {
    const text = await readFile(join(repositoryRoot, "scripts", script), "utf8");
    assert.doesNotMatch(text, /\.temp\/tool-runtime|\.temp\/bin|go tool tsgo|hostPlatform/u, script);
    assert.doesNotMatch(text, /spawnSync\(\s*["'](?:node|npm|go|tsc)["']/u, script);
  }
});

const realGo = process.env.TSTS_GO_BUILDER;
const realModuleCache = process.env.TSTS_GO_MODULE_CACHE;
const realHostUtilities = process.env.TSTS_HOST_PLATFORM_PATH;
test("real external module closure rebuilds and loads offline", async () => {
  for (const [name, value] of Object.entries({
    TSTS_GO_BUILDER: realGo,
    TSTS_GO_MODULE_CACHE: realModuleCache,
    TSTS_HOST_PLATFORM_PATH: realHostUtilities,
  })) {
    assert.equal(typeof value, "string", `${name} must select exact integration evidence`);
    assert.notEqual(value.length, 0, `${name} must select exact integration evidence`);
  }
  const root = await mkdtemp(resolve(".temp", "real-go-closure-"));
  const stagedRoot = join(root, "root");
  const targetCache = join(stagedRoot, "go-module-cache", "pkg", "mod");
  const stateRoot = join(root, "state");
  await mkdir(stagedRoot, { recursive: true });
  await prepareToolchainState(stateRoot);
  const profile = { goos: "linux", goarch: "amd64", cgo: false, tags: ["noasm"] };
  const goRoot = resolve(realGo, "../..");
  const nodeRoot = resolve(process.execPath, "../..");
  const bootstrapEnvironment = exactToolchainEnvironment({
    goRoot,
    nodeRoot,
    goModuleCache: resolve(realModuleCache),
    stateRoot,
    profile,
    hostUtilityPath: "/usr/bin",
  });
  const stagedEnvironment = exactToolchainEnvironment({
    goRoot,
    nodeRoot,
    goModuleCache: targetCache,
    stateRoot,
    profile,
    hostUtilityPath: "/usr/bin",
  });
  const modules = await stageGoModuleCache({
    repositoryRoot: resolve("."),
    bootstrapRoot: resolve(realModuleCache),
    targetRoot: targetCache,
    goExecutable: resolve(realGo),
    profile,
    bootstrapEnvironment,
    stagedEnvironment,
  });
  assert.ok(modules.modules.some((module) => module.path === "github.com/zeebo/xxh3"));
  assert.ok(modules.modules.some((module) =>
    module.path === "github.com/microsoft/typescript-go" &&
    module.uses.includes("typescript-go-tool")
  ));
  await assembleTypeScriptGoSource({
    repositoryRoot: resolve("."),
    stagedRoot,
    goExecutable: resolve(realGo),
    profile,
    buildEnvironment: stagedEnvironment,
    authorityEnvironment: exactAuthorityEnvironment(resolve(realHostUtilities), stateRoot),
    goModules: modules,
  });
});

function openExact(fixture, handle) {
  return openToolchain(fixture.repositoryRoot, { digest: handle.digest, root: handle.root });
}

function run(command, arguments_, environment, cwd) {
  const result = spawnSync(command, arguments_, { cwd, encoding: "utf8", env: environment });
  if (result.error !== undefined) throw result.error;
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}

function saveEnvironment(keys) {
  return new Map(keys.map((key) => [key, process.env[key]]));
}

function restoreEnvironment(saved) {
  for (const [key, value] of saved) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

async function mutateAndRestore(path, action) {
  const before = await readFile(path);
  const mode = (await lstat(path)).mode & 0o777;
  await chmod(path, 0o755);
  await writeFile(path, Buffer.concat([before, Buffer.from("\nmutation\n")]));
  try { await action(); }
  finally { await writeFile(path, before); await chmod(path, mode); }
}

async function withWritable(path, action) {
  const mode = (await lstat(path)).mode & 0o777;
  await chmod(path, 0o755);
  try { await action(); } finally { await chmod(path, mode); }
}

async function moveAndRestore(path, preserved, action) {
  const parent = dirname(path);
  const mode = (await lstat(parent)).mode & 0o777;
  await chmod(parent, 0o755);
  await rename(path, preserved);
  try { await action(); }
  finally { await rename(preserved, path); await chmod(parent, mode); }
}

async function hardlinkAndRestore(path, evidenceRoot, action) {
  const bytes = await readFile(path);
  const mode = (await lstat(path)).mode & 0o777;
  const parent = dirname(path);
  const parentMode = (await lstat(parent)).mode & 0o777;
  await mkdir(evidenceRoot, { recursive: true });
  const original = join(evidenceRoot, "original");
  const alias = join(evidenceRoot, "alias");
  await chmod(parent, 0o755);
  await rename(path, original);
  await link(original, path);
  try { await action(); }
  finally {
    await rename(path, alias);
    await writeFile(path, bytes);
    await chmod(path, mode);
    await chmod(parent, parentMode);
  }
}

async function replaceFileWithDirectory(path, action) {
  const parent = dirname(path);
  const parentMode = (await lstat(parent)).mode & 0o777;
  const preserved = `${path}.preserved`;
  await chmod(parent, 0o755);
  await rename(path, preserved);
  await mkdir(path);
  try { await action(); }
  finally {
    await rename(path, `${path}.directory-evidence`);
    await rename(preserved, path);
    await chmod(parent, parentMode);
  }
}
