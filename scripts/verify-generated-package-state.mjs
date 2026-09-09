import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import {
  activateToolchainEnvironment,
  createDistributionWorkspace,
  installGeneratedGoRuntime,
  installToolchainPackage,
  openToolchainArguments,
  typeScriptAstPrinterConfig,
} from "./toolchain.mjs";
import { canonicalTargetSourcePath, createTargetSourceLayout } from "./target-source-layout.mjs";
import { removeSuccessfulScratchTree } from "./scratch-lifecycle.mjs";

const [repositoryArgument, ...toolchainArguments] = process.argv.slice(2);
assert.equal(typeof repositoryArgument, "string");
const repositoryRoot = resolve(repositoryArgument);
const hostUtilities = process.env.TSTS_HOST_PLATFORM_PATH;
assert.ok(typeof hostUtilities === "string" && isAbsolute(hostUtilities) && !hostUtilities.includes(":"));
const runRoot = join(repositoryRoot, ".temp", "package-state-proof", `${Date.now()}-${process.pid}`);
const sourceRoot = join(runRoot, "go");
const canonicalRoot = join(runRoot, "canonical");
const targetRoot = join(runRoot, "target");
await mkdir(sourceRoot, { recursive: true });
const toolchain = await openToolchainArguments(repositoryRoot, toolchainArguments);
activateToolchainEnvironment(toolchain);
const selection = toolchain.manifest.selection.submodules.find(record => record.path === "tools/gotots");
assert.ok(selection);

const fixture = "testdata/projects/package-state";
const tree = await run(join(hostUtilities, "git"), [
  "-C", join(repositoryRoot, "tools", "gotots"), "ls-tree", "-r", "-z",
  `${selection.gitlink}:${fixture}`,
], sourceRoot, "source-membership");
const fixtureFiles = tree.stdout.split("\0").filter(Boolean);
assert.ok(fixtureFiles.length > 0);
for (const entry of fixtureFiles) {
  const [header, path] = entry.split("\t");
  const [mode, kind] = header.split(" ");
  assert.ok(mode === "100644" || mode === "100755");
  assert.equal(kind, "blob");
  assert.equal(typeof path, "string");
  const content = await run(join(hostUtilities, "git"), [
    "-C", join(repositoryRoot, "tools", "gotots"), "show",
    `${selection.gitlink}:${fixture}/${path}`,
  ], sourceRoot, `source-${path.replaceAll("/", "-")}`);
  await writeFile(await owned(sourceRoot, path), content.stdout, { mode: Number.parseInt(mode, 8) & 0o777 });
}
await writeFile(await owned(sourceRoot, "cmd/oracle/main.go"), `package main
import (
  "fmt"
  "example.com/package-state/api"
)
func main() {
  fmt.Println(api.Run())
  fmt.Println(api.Run())
}
`);
const oracle = await run(toolchain.binaries.go, ["run", "./cmd/oracle"], sourceRoot, "native");
assert.equal(oracle.stdout, "341413514\n341423615\n");
const distribution = await createDistributionWorkspace(toolchain, join(runRoot, "distribution"));
const config = join(runRoot, "gotots.json");
await writeFile(config, JSON.stringify({
  schemaVersion: 4,
  distribution: { root: distribution },
  source: { root: sourceRoot, package: "./api", mode: "exported" },
  go: toolchain.manifest.profile,
  semantics: { integers: "fixed64-bigint", evaluationOrder: "preserve-go" },
  providers: { standardLibrary: false, externals: false },
  output: { directory: canonicalRoot },
}));
await run(toolchain.binaries.gotots, [
  "build", "-c", config, "--go", toolchain.binaries.go, "--tsgo", toolchain.binaries.tsgo,
  "--tool-cache", toolchain.toolCacheRoot,
], sourceRoot, "generation");
const manifest = JSON.parse(await readFile(join(canonicalRoot, "gotots-manifest.json"), "utf8"));
const sourceFiles = manifest.files.filter(path => path.endsWith(".ts"));
const layout = createTargetSourceLayout(sourceFiles);
await installGeneratedGoRuntime(join(canonicalRoot, "runtime"), canonicalRoot);
await writeFile(join(canonicalRoot, "runner.ts"), `import "./program.js";
import { Run } from "./packages/example.com/package-state/api/package.js";
export const result = [Run(), Run()];
`);
const { compileProject } = await import(toolchain.packages.host.entry);
const { createTargetRegistry } = await import(toolchain.packages.targetApi.entry);
const { createTypeScriptTargetPack } = await import(toolchain.packages.targetTypeScript.entry);
const result = compileProject({
  project: {
    entryPoint: "runner.ts", rootFiles: layout.rootFiles, rootDir: ".", outDir: targetRoot,
    targets: [{ id: "typescript", options: {
      execution: "synchronous", printer: typeScriptAstPrinterConfig(toolchain, canonicalRoot),
    } }],
  },
  projectFilePath: join(canonicalRoot, "tsonic.json"),
  registry: createTargetRegistry([createTypeScriptTargetPack()]),
});
const errors = result.diagnostics.filter(diagnostic => diagnostic.category === "error");
await writeFile(join(runRoot, "diagnostics.json"), JSON.stringify(errors, null, 2));
assert.equal(errors.length, 0, `package-state target rejected; evidence: ${runRoot}`);
const compiled = result.targets[0]?.compileResult;
assert.equal(compiled?.kind, "resolved");
for (const artifact of compiled.value.artifacts) {
  const path = canonicalTargetSourcePath(artifact.path, layout.canonicalSet);
  await writeFile(await owned(targetRoot, path), artifact.text);
}
for (const path of manifest.files.filter(path => !path.endsWith(".ts") && path !== "package.json")) {
  await copyFile(join(canonicalRoot, path), await owned(targetRoot, path));
}
await installGeneratedGoRuntime(join(targetRoot, "runtime"), targetRoot);
await installToolchainPackage(toolchain, "typeScriptRuntime", targetRoot);
await writeFile(join(targetRoot, "tsconfig.json"), JSON.stringify({
  compilerOptions: {
    target: "ES2022", module: "NodeNext", moduleResolution: "NodeNext", strict: true,
    noUncheckedIndexedAccess: true, exactOptionalPropertyTypes: true, skipLibCheck: false,
    noEmit: true, types: [],
  },
  files: layout.rootFiles,
}));
await run(toolchain.binaries.tsgo, ["-p", "tsconfig.json"], targetRoot, "strict");
const executable = join(runRoot, "package-state.mjs");
await run(toolchain.binaries.esbuild, [
  "runner.ts", "--bundle", "--format=esm", "--platform=node", `--outfile=${executable}`,
], targetRoot, "bundle");
const actual = await execute(executable, "execution");
assert.equal(actual.stdout, oracle.stdout);
assert.equal(actual.stderr, oracle.stderr);
await writeFile(join(targetRoot, "without-initialization.ts"), `import { Run } from "./packages/example.com/package-state/api/package.js";
export const result = [Run(), Run()];
`);
const control = join(runRoot, "without-initialization.mjs");
await run(toolchain.binaries.esbuild, [
  "without-initialization.ts", "--bundle", "--format=esm", "--platform=node", `--outfile=${control}`,
], targetRoot, "control-bundle");
const rejected = await execute(control, "control-execution", false);
assert.ok(rejected.status !== 0 || rejected.stdout !== oracle.stdout || rejected.stderr !== oracle.stderr);
const evidence = {
  toolchain: toolchain.digest, source: selection.gitlink, fixtureFiles: fixtureFiles.length,
  canonicalFiles: sourceFiles.length,
  stdout: actual.stdout, stderr: actual.stderr, missingInitializationRejected: true,
};
await writeFile(`${runRoot}.json`, JSON.stringify(evidence, null, 2));
await removeSuccessfulScratchTree(repositoryRoot, runRoot);
console.log(`generated_package_state_proof=pass files=${sourceFiles.length} evidence=${runRoot}.json`);

async function owned(root, path) {
  assert.ok(!isAbsolute(path) && !path.split(/[\\/]/u).includes(".."));
  const destination = join(root, path);
  await mkdir(dirname(destination), { recursive: true });
  return destination;
}

function execute(path, name, requireSuccess = true) {
  const script = `import { result } from ${JSON.stringify(pathToFileURL(path).href)};
for (const value of result) console.log(value);`;
  return run(toolchain.binaries.node, ["--input-type=module", "--eval", script], targetRoot, name, requireSuccess);
}

async function run(command, arguments_, cwd, name, requireSuccess = true) {
  const result = spawnSync(command, arguments_, {
    cwd, env: process.env, encoding: "utf8", timeout: 180_000, maxBuffer: 1024 * 1024,
  });
  await writeFile(join(runRoot, `${name}.stdout`), result.stdout ?? "");
  await writeFile(join(runRoot, `${name}.stderr`), result.stderr ?? "");
  assert.equal(result.error, undefined, `${name}: process error; ${runRoot}`);
  assert.equal(result.signal, null, `${name}: terminated; ${runRoot}`);
  if (requireSuccess) assert.equal(result.status, 0, `${name}: failed; ${runRoot}`);
  return result;
}
