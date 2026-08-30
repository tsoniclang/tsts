import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import {
  activateToolchainEnvironment,
  installToolchainPackage,
  openToolchainArguments,
  typeScriptAstPrinterConfig,
} from "./toolchain.mjs";

const [repositoryArgument, ...toolchainArguments] = process.argv.slice(2);
if (repositoryArgument === undefined) {
  throw new Error("repository root and exact toolchain arguments are required");
}
const repositoryRoot = resolve(repositoryArgument);
const runIdentity = `${new Date().toISOString().replaceAll(/[:.]/gu, "-")}-${process.pid}`;
const runRoot = join(
  repositoryRoot,
  ".temp",
  "typescript-target-proof",
  runIdentity,
);
const sourceRoot = join(runRoot, "source");

const toolchain = await openToolchainArguments(repositoryRoot, toolchainArguments);
activateToolchainEnvironment(toolchain);
const { compileProject } = await importTool("host", "dist/index.js");
const { createTargetRegistry } = await importTool(
  "target-api",
  "dist/public/index.js",
);
const { createTypeScriptTargetPack } = await importTool(
  "target-typescript",
  "dist/index.js",
);

await mkdir(sourceRoot, { recursive: true });
await writeFile(join(sourceRoot, "package.json"), `${JSON.stringify({
  private: true,
  type: "module",
}, undefined, 2)}\n`, "utf8");
await writeFile(join(sourceRoot, "index.ts"), `import type { Pointer } from "@tsonic/core/types.js";
import { addressOf, equalPointer, loadPointer, storePointer } from "@tsonic/core/lang.js";

let value = 10;
const pointer: Pointer<number> = addressOf(value);
value = 12;
const afterDirect = loadPointer(pointer);
storePointer(pointer, 13);

export const result = {
  afterDirect,
  value,
  loaded: loadPointer(pointer),
  same: equalPointer(pointer, addressOf(value)),
};
`, "utf8");

const runtimeRoot = toolchain.packages.typeScriptRuntime.root;
const runtimePackage = JSON.parse(
  await readFile(join(runtimeRoot, "package.json"), "utf8"),
);
assert.equal(runtimePackage.name, "@tsonic/typescript-runtime");
assert.equal(typeof runtimePackage.version, "string");

const project = {
  entryPoint: "index.ts",
  rootFiles: ["index.ts"],
  rootDir: ".",
  outDir: "out",
  targets: [{
    id: "typescript",
    options: {
      printer: typeScriptAstPrinterConfig(toolchain, sourceRoot),
      execution: "synchronous",
    },
  }],
};
const result = compileProject({
  project,
  projectFilePath: join(sourceRoot, "tsonic.json"),
  registry: createTargetRegistry([createTypeScriptTargetPack()]),
});
assert.deepEqual(result.diagnostics.filter((diagnostic) =>
  diagnostic.category === "error"
), []);
assert.equal(result.targets.length, 1);
const compileResult = result.targets[0].compileResult;
assert.equal(compileResult.kind, "resolved");
if (compileResult.kind !== "resolved") {
  throw new Error("TypeScript target proof was rejected");
}
const compiled = compileResult.value;
assert.deepEqual(
  compiled.artifacts.map((artifact) => [artifact.kind, artifact.path]),
  [
    ["project", "package.json"],
    ["asset", "tsonic-typescript-optimization.json"],
    ["source", "index.ts"],
  ],
);
const optimizationArtifact = compiled.artifacts.find((artifact) =>
  artifact.path === "tsonic-typescript-optimization.json"
);
assert.ok(optimizationArtifact !== undefined);
assert.deepEqual(JSON.parse(optimizationArtifact.text), {
  schemaVersion: 30,
  sourceExecution: "synchronous",
  profileIdentity:
    "typescript-optimization-v5/pointer=location/scalar=preserve/representations=preserve",
  sourceMembership: ["index.ts"],
  programIndex: {
    nodeVisits: 75,
    childEdges: 74,
    kindEntries: 75,
    identifierEntries: 27,
    sourceReferenceIndex: {
      constructionPasses: 1,
      sourceFiles: 1,
      nodesVisited: 75,
      referenceCandidates: 27,
      selectedReferences: 27,
      selectedDeclarations: 11,
      reverseEdges: 21,
      indexedSymbols: 8,
      moduleExportsExamined: 53,
    },
    bindingCandidates: 0,
    bindingWrites: 0,
  },
  pointer: {
    profile: "location",
    analyzed: false,
    projectionCallables: {
      candidateCount: 0,
      optimizedCount: 0,
      retainedCount: 0,
      fallbackReasons: [],
    },
  },
  scalar: {
    profile: "preserve",
    syntacticProjectionCount: 0,
    optimizedProjectionCount: 0,
    retainedProjectionCount: 0,
    fallbackReasons: [],
    scalarClassCandidateCount: 0,
    loweredScalarClassCount: 0,
    retainedScalarClassCount: 0,
    scalarClassFallbackReasons: [],
  },
  representationProjections: {
    profile: "preserve",
    identityCandidateCount: 0,
    inverseCandidateCount: 0,
    optimizedCount: 0,
    retainedCount: 0,
    fallbackReasons: [],
    storedFlows: {
      flowCount: 0,
      constructionCount: 0,
      projectionCount: 0,
    },
    identityCallables: {
      candidateCount: 0,
      optimizedCount: 0,
      retainedCount: 0,
      fallbackReasons: [],
    },
  },
  representationTransports: {
    digest:
      "e0b8c30fa1ab2fb9d676b79532fb204339a6666ecb3f546a49d4c57a577fa909",
    contractCount: 0,
    selectedCallCount: 0,
  },
});

const installed = new Set();
for (const artifact of compiled.artifacts) {
  assert.equal(installed.has(artifact.path), false, artifact.path);
  installed.add(artifact.path);
  const path = join(sourceRoot, artifact.path);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, artifact.text, "utf8");
}
await installToolchainPackage(toolchain, "typeScriptRuntime", sourceRoot);
await writeFile(join(sourceRoot, "tsconfig.json"), `${JSON.stringify({
  compilerOptions: {
    exactOptionalPropertyTypes: true,
    forceConsistentCasingInFileNames: true,
    module: "NodeNext",
    moduleResolution: "NodeNext",
    noFallthroughCasesInSwitch: true,
    noImplicitOverride: true,
    noUncheckedIndexedAccess: true,
    outDir: "out",
    skipLibCheck: false,
    strict: true,
    target: "ES2022",
    types: [],
  },
  include: ["*.ts"],
}, undefined, 2)}\n`, "utf8");

const printedIndex = await readFile(join(sourceRoot, "index.ts"), "utf8");
assert.match(printedIndex, /let value = 10/u);
assert.match(printedIndex, /boundLocation/u);
assert.doesNotMatch(
  printedIndex,
  /\b(?:addressOf|equalPointer|loadPointer|storePointer)\s*\(/u,
);

run(
  toolchain.binaries.tsgo,
  ["-p", join(sourceRoot, "tsconfig.json")],
  sourceRoot,
  "strict TypeScript target proof typecheck and emit",
);
const execution = run(
  process.execPath,
  [
    "--input-type=module",
    "--eval",
    `import { result } from ${JSON.stringify(pathToFileURL(join(sourceRoot, "out", "index.js")).href)}; process.stdout.write(JSON.stringify(result));`,
  ],
  sourceRoot,
  "TypeScript target proof execution",
);
assert.equal(
  execution.stdout,
  '{"afterDirect":12,"value":13,"loaded":13,"same":true}',
);

console.log(
  `typescript_target_pointer_proof=pass files=${compiled.artifacts.length} output=${sourceRoot}`,
);

async function importTool(name, entry) {
  const key = name === "target-api" ? "targetApi" :
    name === "target-typescript" ? "targetTypeScript" : name;
  const packageRoot = toolchain.packages[key]?.root;
  if (packageRoot === undefined) {
    throw new Error(`Toolchain package '${name}' is absent`);
  }
  return import(pathToFileURL(join(packageRoot, entry)).href);
}

function run(command, arguments_, cwd, subject) {
  const result = spawnSync(command, arguments_, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, NO_COLOR: "1" },
    maxBuffer: 64 * 1024 * 1024,
    timeout: 5 * 60 * 1000,
  });
  if (result.error !== undefined) {
    throw result.error;
  }
  if (result.signal !== null || result.status !== 0) {
    throw new Error(
      `${subject} failed: status=${String(result.status)} signal=${String(result.signal)}\n${result.stdout}${result.stderr}`,
    );
  }
  return result;
}
