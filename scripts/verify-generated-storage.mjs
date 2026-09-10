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
import { canonicalTargetSourcePath, createTargetSourceLayout, withProviderDeclarationArtifacts } from "./target-source-layout.mjs";
import { removeSuccessfulScratchTree } from "./scratch-lifecycle.mjs";

const [repositoryArgument, gitExecutable, proofKind, ...toolchainArguments] = process.argv.slice(2);
assert.equal(typeof repositoryArgument, "string");
const repositoryRoot = resolve(repositoryArgument);
assert.ok(typeof gitExecutable === "string" && isAbsolute(gitExecutable) && !gitExecutable.includes(":"));
assert.ok(proofKind === "package-state" || proofKind === "array-storage" || proofKind === "provider-storage");
const arrayCalls = [
  "Direct", "Replacement", "Nested", "Empty", "Allocated", "Named",
  "RecordReplacement", "ElementReplacement", "AnonymousReplacement", "Overlap",
  "Parallel", "GlobalReplacement", "NilCancellation", "GenericReplacement",
  "GenericElementReplacement", "MapReplacement", "DuplicateElementAddress",
  "GenericRecordReplacement", "GenericFieldReplacement", "GenericScalarReplacement",
  "OrderedReplacement",
];
const selected = proofKind === "package-state" ? {
  fixture: "testdata/projects/package-state",
  importPath: "example.com/package-state/api",
  package: "./api",
  mode: "exported",
  exportedModule: "./packages/example.com/package-state/api/package.js",
  calls: ["Run", "Run"],
  expected: "341413514\n341423615\n",
  profiles: ["location"],
} : proofKind === "provider-storage" ? {
  fixture: "testdata/constructs/value/providerstorage",
  importPath: "example.com/providerstorage",
  package: ".",
  mode: "package",
  exportedModule: "./packages/example.com/providerstorage/_root/package.js",
  calls: [
    "Descriptors", "LiveLocations", "MutationConditions", "SyncReset",
    "AtomicReset", "MemStatsFields", "StructFields", "MetricsFields",
  ],
  expected: "true\ntrue\ntrue\ntrue\ntrue\ntrue\ntrue\ntrue\n",
  profiles: ["location", "closed-direct"],
} : {
  fixture: "testdata/constructs/value/arraystorage",
  importPath: "example.com/arraystorage",
  package: ".",
  mode: "package",
  exportedModule: "./packages/example.com/arraystorage/_root/package.js",
  calls: arrayCalls,
  expected: [
    "true", "556", "true", "true", "true", "34", "4456", "65", "34", "112",
    "31", "34", "true", "34", "56", "14", "true", "456", "34", "2", "1234", "",
  ].join("\n"),
  profiles: ["location", "closed-direct"],
};
const runRoot = join(repositoryRoot, ".temp", `${proofKind}-proof`, `${Date.now()}-${process.pid}`);
const sourceRoot = join(runRoot, "go");
const canonicalRoot = join(runRoot, "canonical");
await mkdir(sourceRoot, { recursive: true });
const toolchain = await openToolchainArguments(repositoryRoot, toolchainArguments);
activateToolchainEnvironment(toolchain);
const selection = toolchain.manifest.selection.submodules.find(record => record.path === "tools/gotots");
assert.ok(selection);

const fixture = selected.fixture;
const tree = await run(gitExecutable, [
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
  const content = await run(gitExecutable, [
    "-C", join(repositoryRoot, "tools", "gotots"), "show",
    `${selection.gitlink}:${fixture}/${path}`,
  ], sourceRoot, `source-${path.replaceAll("/", "-")}`);
  await writeFile(await owned(sourceRoot, path), content.stdout, { mode: Number.parseInt(mode, 8) & 0o777 });
}
await writeFile(await owned(sourceRoot, "cmd/oracle/main.go"), `package main
import (
  "fmt"
  fixture "${selected.importPath}"
)
func main() {
${selected.calls.map(name => `  fmt.Println(fixture.${name}())`).join("\n")}
}
`);
const oracle = await run(toolchain.binaries.go, ["run", "./cmd/oracle"], sourceRoot, "native");
assert.equal(oracle.stdout, selected.expected);
const distribution = await createDistributionWorkspace(toolchain, join(runRoot, "distribution"));
const config = join(runRoot, "gotots.json");
await writeFile(config, JSON.stringify({
  schemaVersion: 4,
  distribution: { root: distribution },
  source: { root: sourceRoot, package: selected.package, mode: selected.mode },
  go: toolchain.manifest.profile,
  semantics: { integers: "fixed64-bigint", evaluationOrder: "preserve-go" },
  providers: { standardLibrary: proofKind === "provider-storage", externals: false },
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
if (proofKind === "provider-storage") await installToolchainPackage(toolchain, "gostdlib", canonicalRoot);
await writeFile(join(canonicalRoot, "runner.ts"), `import "./program.js";
import * as fixture from ${JSON.stringify(selected.exportedModule)};
export const result = [${selected.calls.map(name => `fixture.${name}()`).join(", ")}];
`);
const { compileProject } = await import(toolchain.packages.host.entry);
const { createTargetRegistry } = await import(toolchain.packages.targetApi.entry);
const { createTypeScriptTargetPack } = await import(toolchain.packages.targetTypeScript.entry);
const { createGoAbiCapability } = await import(toolchain.packages.goAbi.entry);
const profiles = [];
for (const pointerFlows of selected.profiles) {
  const targetRoot = join(runRoot, "target", pointerFlows);
  const result = compileProject({
    project: {
      entryPoint: "runner.ts", rootFiles: layout.rootFiles, rootDir: ".", outDir: targetRoot,
      targets: [{ id: "typescript", options: {
        execution: "synchronous", printer: typeScriptAstPrinterConfig(toolchain, canonicalRoot),
        optimizations: { pointerFlows },
      } }],
    },
    projectFilePath: join(canonicalRoot, "tsonic.json"),
    registry: createTargetRegistry([createTypeScriptTargetPack()]),
    installedCapabilities: [createGoAbiCapability("typescript")],
  });
  const errors = result.diagnostics.filter(diagnostic => diagnostic.category === "error");
  await writeFile(join(runRoot, `diagnostics-${pointerFlows}.json`), JSON.stringify(errors, null, 2));
  assert.equal(errors.length, 0, `${proofKind} target rejected; evidence: ${runRoot}`);
  const compiled = result.targets[0]?.compileResult;
  assert.equal(compiled?.kind, "resolved");
  const artifacts = compiled.value.artifacts.map(artifact => artifact.kind === "source"
    ? { ...artifact, path: canonicalTargetSourcePath(artifact.path, layout.canonicalSet) }
    : artifact);
  const sourceLayout = withProviderDeclarationArtifacts(layout, artifacts, toolchain.packages);
  assert.deepEqual(artifacts.filter(artifact => artifact.kind === "source").map(artifact => artifact.path).sort(),
    [...sourceLayout.expectedArtifacts].sort());
  if (proofKind === "provider-storage") await installToolchainPackage(toolchain, "gostdlib", targetRoot);
  for (const artifact of artifacts) {
    await writeFile(await owned(targetRoot, artifact.path), artifact.text);
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
    files: sourceLayout.expectedArtifacts,
  }));
  await run(toolchain.binaries.tsgo, ["-p", "tsconfig.json"], targetRoot, `strict-${pointerFlows}`);
  const executable = join(runRoot, `${proofKind}-${pointerFlows}.mjs`);
  await run(toolchain.binaries.esbuild, [
    "runner.ts", "--bundle", "--format=esm", "--platform=node", `--outfile=${executable}`,
  ], targetRoot, `bundle-${pointerFlows}`);
  const actual = await execute(executable, targetRoot, `execution-${pointerFlows}`);
  assert.equal(actual.stdout, oracle.stdout);
  assert.equal(actual.stderr, oracle.stderr);
  if (proofKind === "package-state") {
    await writeFile(join(targetRoot, "without-initialization.ts"), `import { Run } from "./packages/example.com/package-state/api/package.js";
export const result = [Run(), Run()];
`);
    const control = join(runRoot, "without-initialization.mjs");
    await run(toolchain.binaries.esbuild, [
      "without-initialization.ts", "--bundle", "--format=esm", "--platform=node", `--outfile=${control}`,
    ], targetRoot, "control-bundle");
    const rejected = await execute(control, targetRoot, "control-execution", false);
    assert.ok(rejected.status !== 0 || rejected.stdout !== oracle.stdout || rejected.stderr !== oracle.stderr);
  }
  profiles.push({
    pointerFlows, stdout: actual.stdout, stderr: actual.stderr,
    ...(proofKind === "package-state" ? { missingInitializationRejected: true } : {}),
  });
}
const evidence = {
  toolchain: toolchain.digest, source: selection.gitlink, fixtureFiles: fixtureFiles.length,
  canonicalFiles: sourceFiles.length, cases: selected.calls.length, profiles,
};
await writeFile(`${runRoot}.json`, JSON.stringify(evidence, null, 2));
await removeSuccessfulScratchTree(repositoryRoot, runRoot);
console.log(`generated_storage_proof=${proofKind} pass cases=${selected.calls.length} profiles=${profiles.length} files=${sourceFiles.length} evidence=${runRoot}.json`);

async function owned(root, path) {
  assert.ok(!isAbsolute(path) && !path.split(/[\\/]/u).includes(".."));
  const destination = join(root, path);
  await mkdir(dirname(destination), { recursive: true });
  return destination;
}

function execute(path, targetRoot, name, requireSuccess = true) {
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
