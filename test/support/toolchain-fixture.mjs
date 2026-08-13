import { spawnSync } from "node:child_process";
import { COPYFILE_FICLONE } from "node:constants";
import { createHash } from "node:crypto";
import {
  chmod,
  copyFile,
  mkdir,
  mkdtemp,
  symlink,
  writeFile,
} from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

import { removeSuccessfulScratchTree } from "../../scripts/scratch-lifecycle.mjs";

const scratchRoot = resolve(".temp", "toolchain-tests");
const dependencyPath = "example.com/dependency";
const dependencyVersion = "v1.2.3";
const dependencySum = `h1:${createHash("sha256").update("dependency zip").digest("base64")}`;
const dependencyGoModSum = `h1:${createHash("sha256").update("dependency go.mod").digest("base64")}`;
const tsgoPath = "github.com/microsoft/typescript-go";
const tsgoPackage = `${tsgoPath}/cmd/tsgo`;
const tsgoSum = `h1:${createHash("sha256").update("typescript-go zip").digest("base64")}`;
const tsgoGoModSum = `h1:${createHash("sha256").update("typescript-go go.mod").digest("base64")}`;

export const selectedSubmodules = Object.freeze([
  "tools/gotots",
  "tools/tsonic",
  "tools/tsonic-typescript",
  "tools/tsts-legacy",
  "tools/typescript-runtime",
  "vendor/typescript-go",
]);

const selectedPackages = [
  ["tools/gotots/gostdlib", "@gotots/gostdlib"],
  ["tools/gotots/externals", "@gotots/externals"],
  ["tools/tsonic/packages/host", "@tsonic/host"],
  ["tools/tsonic/packages/source-core", "@tsonic/source-core"],
  ["tools/tsonic/packages/target-api", "@tsonic/target-api"],
  ["tools/tsonic-typescript", "@tsonic/target-typescript"],
  ["tools/tsts-legacy/packages/tsts", "@tsonic/tsts"],
  ["tools/typescript-runtime", "@tsonic/typescript-runtime"],
];

const packageDependencies = new Map([
  ["@gotots/gostdlib", { peerDependencies: { "@gotots/runtime": "0.0.0" } }],
  ["@gotots/externals", { peerDependencies: { "@gotots/gostdlib": "0.0.0" } }],
  ["@tsonic/host", { dependencies: {
    "@tsonic/source-core": "0.0.0",
    "@tsonic/target-api": "0.0.0",
    "@tsonic/tsts": "0.0.0",
  } }],
  ["@tsonic/source-core", { dependencies: { "@tsonic/tsts": "0.0.0" } }],
  ["@tsonic/target-api", { dependencies: { "@tsonic/tsts": "0.0.0" } }],
  ["@tsonic/target-typescript", {
    dependencies: { "@tsonic/typescript-runtime": "0.0.1" },
    peerDependencies: { "@tsonic/target-api": "0.0.0", "@tsonic/tsts": "0.0.0" },
  }],
]);

export async function createToolchainFixture(prefix) {
  await mkdir(scratchRoot, { recursive: true });
  const repositoryRoot = await mkdtemp(join(scratchRoot, prefix));
  runGit(repositoryRoot, ["init", "--quiet"]);
  await writeFile(join(repositoryRoot, ".gitignore"), ".temp/\n", "utf8");
  await writeFile(join(repositoryRoot, "AGENTS.md"), "fixture authority\n", "utf8");
  await writeFile(join(repositoryRoot, "CLAUDE.md"), "fixture authority\n", "utf8");
  await writeFile(join(repositoryRoot, "gotots.json"), `${JSON.stringify({
    schemaVersion: 1,
    distribution: { root: "tools/gotots" },
    source: { root: "vendor/typescript-go", package: "./cmd/tsgo", mode: "main" },
    go: { goos: "linux", goarch: "amd64", cgo: false, tags: ["noasm"] },
    semantics: { integers: "number", evaluationOrder: "direct", concurrency: "cooperative" },
    providers: { standardLibrary: true, externals: true },
    implementations: { bundles: [] },
    output: { directory: ".temp/generated" },
  }, undefined, 2)}\n`, "utf8");

  for (const path of selectedSubmodules) await createSubmodule(repositoryRoot, path);
  for (const [path, name] of selectedPackages) await createPackage(join(repositoryRoot, path), name);
  await createDistributionInputs(repositoryRoot);

  const vendorRoot = join(repositoryRoot, "vendor", "typescript-go");
  runGit(vendorRoot, ["add", "."]);
  commit(vendorRoot, "fixture selection A");
  const vendorGitlink = runGit(vendorRoot, ["rev-parse", "HEAD"]);
  selectGitlink(repositoryRoot, "vendor/typescript-go", vendorGitlink);
  await createGoToTsPin(repositoryRoot, vendorGitlink);
  for (const path of selectedSubmodules.filter((entry) => entry !== "vendor/typescript-go")) {
    const root = join(repositoryRoot, path);
    runGit(root, ["add", "."]);
    commit(root, "fixture selection A");
    selectGitlink(repositoryRoot, path, runGit(root, ["rev-parse", "HEAD"]));
  }
  runGit(repositoryRoot, ["add", ".gitignore", "AGENTS.md", "CLAUDE.md", "gotots.json"]);
  commit(repositoryRoot, "fixture superproject A");

  const bootstrapNode = join(repositoryRoot, ".temp", "bootstrap-node", "bin", "node");
  await mkdir(dirname(bootstrapNode), { recursive: true });
  await copyFile(process.execPath, bootstrapNode, COPYFILE_FICLONE);
  await chmod(bootstrapNode, 0o755);
  const npmRoot = join(repositoryRoot, ".temp", "bootstrap-npm");
  const npmCli = join(npmRoot, "bin", "npm-cli.mjs");
  await mkdir(dirname(npmCli), { recursive: true });
  await writeFile(join(npmRoot, "package.json"), `${JSON.stringify({
    name: "npm",
    version: "10.0.0",
    type: "module",
    bin: { npm: "bin/npm-cli.mjs" },
  })}\n`, "utf8");
  await writeFile(npmCli, fakeNpmProgram, "utf8");
  await chmod(npmCli, 0o755);
  await symlink("npm-cli.mjs", join(npmRoot, "bin", "npm-alias.mjs"));

  const goRoot = join(repositoryRoot, ".temp", "bootstrap-go");
  const fakeGo = join(goRoot, "bin", "go");
  await mkdir(join(goRoot, "bin"), { recursive: true });
  await mkdir(join(goRoot, "pkg", "tool", "linux_amd64"), { recursive: true });
  await mkdir(join(goRoot, "src"), { recursive: true });
  await mkdir(join(goRoot, "libexec"), { recursive: true });
  await writeFile(join(goRoot, "VERSION"), "go1.26.4\n", "utf8");
  await writeFile(join(goRoot, "src", "identity.txt"), "fixture Go source\n", "utf8");
  await symlink("VERSION", join(goRoot, "version-link"));
  await symlink("src", join(goRoot, "source-link"));
  await writeFile(fakeGo, fakeGoLauncher, "utf8");
  await writeFile(
    join(goRoot, "libexec", "fake-go.mjs"),
    fakeGoProgram(vendorGitlink),
    "utf8",
  );
  await chmod(fakeGo, 0o755);

  const goModuleCache = join(repositoryRoot, ".temp", "bootstrap-gopath", "pkg", "mod");
  await createGoModuleCache(goModuleCache, vendorGitlink);
  const poisonPath = join(repositoryRoot, ".temp", "poison-path");
  await mkdir(poisonPath, { recursive: true });
  for (const name of ["go", "node", "npm", "tsc"]) {
    await writeFile(join(poisonPath, name), "#!/bin/sh\nexit 97\n", "utf8");
    await chmod(join(poisonPath, name), 0o755);
  }

  return Object.freeze({
    repositoryRoot,
    bootstrapNode,
    npmRoot,
    npmCli,
    fakeGo,
    goRoot,
    goModuleCache,
    moduleControl: join(goModuleCache, "fixture-control.json"),
    poisonPath,
    hostUtilityPath: "/usr/bin",
  });
}

export function buildOptions(fixture) {
  return {
    goExecutable: fixture.fakeGo,
    goModuleCache: fixture.goModuleCache,
    nodeExecutable: fixture.bootstrapNode,
    npmCli: fixture.npmCli,
    hostUtilityPath: fixture.hostUtilityPath,
  };
}

export async function removeToolchainFixtures(...fixtures) {
  for (const fixture of fixtures) {
    await removeSuccessfulScratchTree(resolve("."), fixture.repositoryRoot);
  }
}

export async function advanceSelection(fixture, path, identity, commitSuperproject = true) {
  const submoduleRoot = join(fixture.repositoryRoot, path);
  await writeFile(join(submoduleRoot, "selection.txt"), `${identity}\n`, "utf8");
  runGit(submoduleRoot, ["add", "selection.txt"]);
  commit(submoduleRoot, `fixture selection ${identity}`);
  const gitlink = runGit(submoduleRoot, ["rev-parse", "HEAD"]);
  selectGitlink(fixture.repositoryRoot, path, gitlink);
  if (commitSuperproject) commit(fixture.repositoryRoot, `fixture superproject ${identity}`);
  return gitlink;
}

export function selectGitlink(repositoryRoot, path, gitlink) {
  runGit(repositoryRoot, ["update-index", "--add", "--cacheinfo", "160000", gitlink, path]);
}

export function commit(repositoryRoot, message) {
  runGit(repositoryRoot, [
    "-c", "user.name=TSTS Tests",
    "-c", "user.email=tsts-tests@example.invalid",
    "commit", "--quiet", "-m", message,
  ]);
}

export function runGit(repositoryRoot, arguments_) {
  const result = spawnSync("git", ["-C", repositoryRoot, ...arguments_], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (result.error !== undefined) throw result.error;
  if (result.signal !== null || result.status !== 0) {
    throw new Error(`git ${arguments_.join(" ")} failed\n${result.stdout}${result.stderr}`);
  }
  return result.stdout.trim();
}

async function createSubmodule(repositoryRoot, path) {
  const root = join(repositoryRoot, path);
  await mkdir(root, { recursive: true });
  runGit(root, ["init", "--quiet"]);
  await writeFile(join(root, ".gitignore"), "dist/\nnode_modules/\n*.tsbuildinfo\n", "utf8");
  await writeFile(join(root, "selection.txt"), "A\n", "utf8");
}

async function createPackage(root, name) {
  await mkdir(root, { recursive: true });
  const provider = name.startsWith("@gotots/");
  await writeFile(join(root, "package.json"), `${JSON.stringify({
    name,
    version: name === "@tsonic/typescript-runtime" ? "0.0.1" : "0.0.0",
    type: "module",
    main: name === "@tsonic/tsts" ? "./dist/src/index.js" : "./dist/index.js",
    files: provider ? ["dist", "contract", "tsconfig.json", "README.md"] : ["dist"],
    ...(packageDependencies.get(name) ?? {}),
  }, undefined, 2)}\n`, "utf8");
  await writeFile(join(root, "tsconfig.json"), "{}\n", "utf8");
}

async function createDistributionInputs(repositoryRoot) {
  const gotots = join(repositoryRoot, "tools", "gotots");
  for (const provider of ["gostdlib", "externals"]) {
    const root = join(gotots, provider);
    await mkdir(join(root, "contract"), { recursive: true });
    await writeFile(join(root, "README.md"), `${provider} provider\n`, "utf8");
    await writeFile(join(root, "contract", "manifest.json"), "{}\n", "utf8");
  }
  const runtime = join(gotots, "gostdlib", "test", "runtime-package");
  await mkdir(runtime, { recursive: true });
  await writeFile(join(runtime, "package.json"), `${JSON.stringify({
    name: "@gotots/runtime",
    version: "0.0.0",
    private: true,
    type: "module",
    files: ["*.ts"],
  })}\n`, "utf8");
  await writeFile(join(runtime, "array.ts"), "export const array = 1;\n", "utf8");
  await writeFile(join(runtime, "tsconfig.json"), "{}\n", "utf8");
  const vendor = join(repositoryRoot, "vendor", "typescript-go");
  await mkdir(join(vendor, "cmd", "tsgo"), { recursive: true });
  await writeFile(join(vendor, "cmd", "tsgo", "main.go"), "package main\n\nfunc main() {}\n", "utf8");
  await writeFile(join(vendor, "go.mod"), moduleText("fixture.invalid/typescript-go"), "utf8");
  await writeFile(join(vendor, "go.sum"), sumText(), "utf8");
}

async function createGoToTsPin(repositoryRoot, vendorGitlink) {
  const root = join(repositoryRoot, "tools", "gotots");
  const version = tsgoVersion(vendorGitlink);
  await writeFile(
    join(root, "go.mod"),
    `${moduleText("fixture.invalid/gotots")}\nrequire (\n\tgithub.com/microsoft/typescript-go ${version} // indirect\n)\n\ntool github.com/microsoft/typescript-go/cmd/tsgo\n`,
    "utf8",
  );
  await writeFile(join(root, "go.sum"), sumText(), "utf8");
  const protocol = join(root, "internal", "target", "tsgo", "protocol_generated.go");
  await mkdir(dirname(protocol), { recursive: true });
  await writeFile(protocol, `package tsgo\n\nconst pinnedToolVersion = "${version}"\n`, "utf8");
  const schema = join(root, "schema", "tsgo", "manifest.json");
  await mkdir(dirname(schema), { recursive: true });
  await writeFile(schema, `${JSON.stringify({
    schemaVersion: 1,
    module: "github.com/microsoft/typescript-go",
    toolPackage: "github.com/microsoft/typescript-go/cmd/tsgo",
    toolVersion: version,
    toolSum: tsgoSum,
    revision: vendorGitlink,
  })}\n`, "utf8");
}

function tsgoVersion(vendorGitlink) {
  return `v0.0.0-20260811000000-${vendorGitlink.slice(0, 12)}`;
}

async function createGoModuleCache(root, vendorGitlink) {
  await createCachedModule(root, {
    path: dependencyPath,
    version: dependencyVersion,
    sum: dependencySum,
    goMod: moduleText(dependencyPath, false),
    files: { "dependency.go": "package dependency\n\nconst Value = 1\n" },
  });
  await createCachedModule(root, {
    path: tsgoPath,
    version: tsgoVersion(vendorGitlink),
    sum: tsgoSum,
    goMod: moduleText(tsgoPath),
    files: { "cmd/tsgo/main.go": "package main\n\nfunc main() {}\n" },
  });
}

async function createCachedModule(root, selected) {
  const source = join(root, `${selected.path}@${selected.version}`);
  const metadata = join(root, "cache", "download", selected.path, "@v");
  await mkdir(source, { recursive: true });
  await mkdir(metadata, { recursive: true });
  await writeFile(join(source, "go.mod"), selected.goMod, "utf8");
  for (const [path, content] of Object.entries(selected.files)) {
    await mkdir(dirname(join(source, path)), { recursive: true });
    await writeFile(join(source, path), content, "utf8");
  }
  await writeFile(
    join(metadata, `${selected.version}.info`),
    `${JSON.stringify({ Version: selected.version })}\n`,
    "utf8",
  );
  await writeFile(join(metadata, `${selected.version}.mod`), selected.goMod, "utf8");
  await writeFile(join(metadata, `${selected.version}.zip`), `${selected.path} fixture zip bytes\n`, "utf8");
  await writeFile(join(metadata, `${selected.version}.ziphash`), `${selected.sum}\n`, "utf8");
}

function moduleText(name, requireDependency = true) {
  const requirement = requireDependency
    ? `\nrequire ${dependencyPath} ${dependencyVersion}\n`
    : "";
  return `module ${name}\n\ngo 1.26.4\n${requirement}`;
}

function sumText() {
  return `${dependencyPath} ${dependencyVersion} ${dependencySum}\n${dependencyPath} ${dependencyVersion}/go.mod ${dependencyGoModSum}\n`;
}

function toolBuildSumText(vendorGitlink) {
  return [
    `${dependencyPath} ${dependencyVersion} ${dependencySum}`,
    `${dependencyPath} ${dependencyVersion}/go.mod ${dependencyGoModSum}`,
    `${tsgoPath} ${tsgoVersion(vendorGitlink)} ${tsgoSum}`,
    `${tsgoPath} ${tsgoVersion(vendorGitlink)}/go.mod ${tsgoGoModSum}`,
  ].sort().join("\n") + "\n";
}

const fakeGoLauncher = `#!/bin/sh
root="\${0%/bin/go}"
exec node "$root/libexec/fake-go.mjs" "$root" "$@"
`;

function fakeGoProgram(vendorGitlink) {
  return `import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
const [root, ...args] = process.argv.slice(2);
const cache = process.env.GOMODCACHE ?? join(root, "unused-module-cache");
const modulePath = ${JSON.stringify(dependencyPath)};
const version = ${JSON.stringify(dependencyVersion)};
const selectedSum = ${JSON.stringify(dependencySum)};
const selectedGoModSum = ${JSON.stringify(dependencyGoModSum)};
const toolModulePath = ${JSON.stringify(tsgoPath)};
const toolPackage = ${JSON.stringify(tsgoPackage)};
const toolVersion = ${JSON.stringify(tsgoVersion(vendorGitlink))};
const toolSum = ${JSON.stringify(tsgoSum)};
const toolGoModSum = ${JSON.stringify(tsgoGoModSum)};
const controlPath = join(cache, "fixture-control.json");
const control = existsSync(controlPath) ? JSON.parse(readFileSync(controlPath, "utf8")) : {};
const moduleRoot = join(cache, modulePath + "@" + version);
const metadataRoot = join(cache, "cache", "download", modulePath, "@v");
const toolModuleRoot = join(cache, toolModulePath + "@" + toolVersion);
const toolMetadataRoot = join(cache, "cache", "download", toolModulePath, "@v");
const moduleRecord = (sum = selectedSum) => ({
  Path: modulePath, Version: version, Dir: moduleRoot,
  GoMod: join(metadataRoot, version + ".mod"), Sum: sum, GoModSum: selectedGoModSum,
});
const toolModuleRecord = () => ({
  Path: toolModulePath, Version: toolVersion, Dir: toolModuleRoot,
  GoMod: join(toolMetadataRoot, toolVersion + ".mod"), Sum: toolSum, GoModSum: toolGoModSum,
});
if (args[0] === "version" && args[1] === "-m") {
  process.stdout.write(args[2] + ": go1.26.4\\n");
  process.stdout.write("\\tpath\\t" + toolPackage + "\\n");
  process.stdout.write("\\tmod\\t" + toolModulePath + "\\t" + toolVersion + "\\t" + toolSum + "\\n");
  process.exit(0);
}
if (args[0] === "version") {
  process.stdout.write("go version go1.26.4 linux/amd64\\n");
  process.exit(0);
}
if (args[0] === "env" && args[1] === "-json") {
  const values = { GOVERSION: "go1.26.4", GOROOT: root,
    GOTOOLDIR: join(root, "pkg", "tool", "linux_amd64"), GOHOSTOS: "linux", GOHOSTARCH: "amd64" };
  process.stdout.write(JSON.stringify(Object.fromEntries(args.slice(2).map((name) => [name, values[name]]))));
  process.exit(0);
}
if (args[0] === "mod" && args[1] === "download") {
  if (args.at(-1) === toolModulePath + "@" + toolVersion) {
    process.stdout.write(JSON.stringify({ ...toolModuleRecord(),
      Info: join(toolMetadataRoot, toolVersion + ".info"),
      Zip: join(toolMetadataRoot, toolVersion + ".zip") }));
    process.exit(0);
  }
  const downloadedSum = control.downloadSum ?? selectedSum;
  process.stdout.write(JSON.stringify({ Path: modulePath, Version: control.downloadVersion ?? version,
    Info: join(metadataRoot, version + ".info"), GoMod: join(metadataRoot, version + ".mod"),
    Zip: join(metadataRoot, version + ".zip"), Dir: moduleRoot,
    Sum: downloadedSum, GoModSum: selectedGoModSum }));
  process.exit(0);
}
if (args[0] === "mod" && args[1] === "edit" && args[2] === "-json") {
  process.stdout.write(JSON.stringify({
    Module: { Path: "fixture.invalid/gotots" },
    Go: "1.26.4",
    Require: [{
      Path: "github.com/microsoft/typescript-go",
      Version: ${JSON.stringify(tsgoVersion(vendorGitlink))},
      Indirect: true,
    }],
    Replace: null,
    Tool: [{ Path: "github.com/microsoft/typescript-go/cmd/tsgo" }],
  }));
  process.exit(0);
}
if (args[0] === "list") {
  if (args.includes(toolPackage)) {
    process.stdout.write(JSON.stringify({ ImportPath: toolPackage, Dir: join(toolModuleRoot, "cmd", "tsgo"), GoFiles: ["main.go"], Module: toolModuleRecord() }) + "\\n");
  } else {
    process.stdout.write(JSON.stringify({ ImportPath: "fixture.invalid/main/cmd/tsgo", Dir: join(process.cwd(), "cmd", "tsgo"), GoFiles: ["main.go"], Module: { Main: true, Dir: process.cwd() } }) + "\\n");
  }
  process.stdout.write(JSON.stringify({ ImportPath: modulePath, Dir: moduleRoot, GoFiles: ["dependency.go"], Module: moduleRecord() }) + "\\n");
  if (control.collision) process.stdout.write(JSON.stringify({ ImportPath: modulePath + "/collision", Dir: moduleRoot, GoFiles: ["dependency.go"], Module: moduleRecord("h1:BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=") }) + "\\n");
  process.exit(0);
}
if (args[0] === "build") {
  const output = args[args.indexOf("-o") + 1];
  const target = args.at(-1);
  mkdirSync(dirname(output), { recursive: true });
  if (target === toolPackage) {
    const expectedModule = "module tsts.invalid/tool-builder\\n\\ngo 1.26.4\\n\\nrequire " + toolModulePath + " " + toolVersion + "\\n";
    if (readFileSync(join(process.cwd(), "go.mod"), "utf8") !== expectedModule ||
        readFileSync(join(process.cwd(), "go.sum"), "utf8") !== ${JSON.stringify(toolBuildSumText(vendorGitlink))} ||
        args.some((value) => value.includes("@")) || process.env.GOPROXY !== "off" ||
        process.env.GOSUMDB !== "off" || process.env.GOFLAGS !== "-mod=readonly") {
      process.stderr.write("unsealed TypeScript-Go build invocation\\n");
      process.exit(3);
    }
  }
  const program = target === toolPackage ? ${JSON.stringify(fakeTsgoProgram)} : "process.exit(0);\\n";
  writeFileSync(output, "#!/usr/bin/env node\\n" + program);
  chmodSync(output, 0o755);
  process.exit(0);
}
process.stderr.write("unsupported fake go invocation: " + args.join(" ") + "\\n");
process.exit(2);
`;
}

const fakeTsgoProgram = `import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
const args = process.argv.slice(2);
const config = args[args.indexOf("-p") + 1];
let root = dirname(config);
while (root !== dirname(root)) {
  try {
    const manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    let selected = root;
    let identity = "generated";
    while (selected !== dirname(selected)) {
      try { identity = readFileSync(join(selected, "selection.txt"), "utf8").trim(); break; }
      catch { selected = dirname(selected); }
    }
    const dist = manifest.name === "@tsonic/tsts" ? join(root, "dist", "src") : join(root, "dist");
    mkdirSync(dist, { recursive: true });
    writeFileSync(join(dist, "index.js"), "export const identity = " + JSON.stringify(manifest.name + ":" + identity) + ";\\n");
    writeFileSync(join(dist, "index.d.ts"), "export declare const identity: string;\\n");
    process.exit(0);
  } catch { root = resolve(root, ".."); }
}
process.exit(0);
`;

const fakeNpmProgram = `import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
const args = process.argv.slice(2);
const npmRoot = resolve(dirname(new URL(import.meta.url).pathname), "..");
const controlPath = join(npmRoot, "control.json");
const control = existsSync(controlPath) ? JSON.parse(readFileSync(controlPath, "utf8")) : {};
if (args[0] === "--version") { process.stdout.write("10.0.0\\n"); process.exit(0); }
if (args[0] === "pack") {
  const manifest = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
  const files = ["package.json"];
  const add = (path) => {
    const absolute = join(process.cwd(), path);
    if (!existsSync(absolute)) return;
    for (const entry of readdirSync(absolute, { withFileTypes: true })) {
      const selected = path + "/" + entry.name;
      if (entry.isDirectory()) add(selected); else if (entry.isFile()) files.push(selected);
    }
  };
  for (const selected of manifest.files ?? []) {
    if (selected === "*.ts") {
      for (const name of readdirSync(process.cwd())) if (name.endsWith(".ts")) files.push(name);
    } else if (existsSync(join(process.cwd(), selected)) && !selected.includes(".")) add(selected);
    else if (existsSync(join(process.cwd(), selected))) files.push(selected);
  }
  if (control.nested) files.push("node_modules/duplicate/package.json");
  process.stdout.write(JSON.stringify([{ name: manifest.name, version: manifest.version,
    files: [...new Set(files)].map((path) => ({ path })) }]));
  process.exit(0);
}
const prefixIndex = args.indexOf("--prefix");
const prefix = prefixIndex === -1 ? process.cwd() : resolve(args[prefixIndex + 1]);
if (args.includes("ci")) {
  if (prefix.endsWith("/tools/gotots/gostdlib")) {
    const node = join(prefix, "node_modules", "@types", "node");
    const undici = join(prefix, "node_modules", "undici-types");
    mkdirSync(node, { recursive: true }); mkdirSync(undici, { recursive: true });
    writeFileSync(join(node, "package.json"), JSON.stringify({ name: "@types/node", version: "1.0.0", files: ["index.d.ts"], dependencies: { "undici-types": ">=1.0.0" } }));
    writeFileSync(join(node, "index.d.ts"), "export {};\\n");
    writeFileSync(join(undici, "package.json"), JSON.stringify({ name: "undici-types", version: "1.0.0", files: ["index.d.ts"] }));
    writeFileSync(join(undici, "index.d.ts"), "export {};\\n");
  }
  process.exit(0);
}
if (!args.includes("build")) process.exit(2);
const nested = spawnSync("npm", ["--version"], { encoding: "utf8", env: process.env });
if (nested.status !== 0 || nested.stdout.trim() !== "10.0.0") process.exit(3);
const roots = prefix.endsWith("/tools/tsts-legacy") ? [join(prefix, "packages/tsts")] : [prefix];
for (const root of roots) {
  const manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  let selected = root;
  while (selected !== dirname(selected)) {
    try {
      const identity = readFileSync(join(selected, "selection.txt"), "utf8").trim();
      const dist = manifest.name === "@tsonic/tsts" ? join(root, "dist", "src") : join(root, "dist");
      mkdirSync(dist, { recursive: true });
      writeFileSync(join(dist, "index.js"), "export const identity = " + JSON.stringify(manifest.name + ":" + identity) + ";\\n");
      writeFileSync(join(dist, "index.d.ts"), "export declare const identity: string;\\n");
      break;
    } catch { selected = dirname(selected); }
  }
}
`;
