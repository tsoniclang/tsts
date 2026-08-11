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
const {
  createCompilerSessionFromFiles,
  createSourceSemanticsExtension,
} = await importTool("tsts", "dist/src/index.js");
const { createTargetSourceProgram } = await importTool(
  "target-api",
  "dist/index.js",
);
const {
  createExternalAstPrinter,
  createTypeScriptBackend,
} = await importTool("target-typescript", "dist/index.js");

const markerModule = "./markers.js";
const session = createCompilerSessionFromFiles({
  currentDirectory: "/project",
  files: {
    "/project/index.ts": `import type { Pointer } from "./markers.js";
import { addressOf, equalPointer, loadPointer, storePointer } from "./markers.js";

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
`,
    "/project/markers.ts": `export interface Pointer<T> { readonly marker: T }
export declare function addressOf<T>(storage: T): Pointer<T>;
export declare function loadPointer<T>(pointer: Pointer<T>): T;
export declare function storePointer<T>(pointer: Pointer<T>, value: T): void;
export declare function equalPointer<T>(left: Pointer<T> | undefined, right: Pointer<T> | undefined): boolean;
`,
  },
  rootFiles: ["/project/index.ts"],
  compilerOptions: {
    module: "esnext",
    moduleResolution: "bundler",
    strict: true,
    target: "es2022",
  },
  extensionHostOptions: {
    extensions: [createSourceSemanticsExtension({
      modules: [{
        moduleSpecifier: markerModule,
        capabilities: ["type-marker", "call-marker"],
        exports: [
          { kind: "type-marker", exportName: "Pointer", marker: "pointer" },
          { kind: "call-marker", exportName: "addressOf", marker: "address-of" },
          { kind: "call-marker", exportName: "loadPointer", marker: "load" },
          { kind: "call-marker", exportName: "storePointer", marker: "store" },
          { kind: "call-marker", exportName: "equalPointer", marker: "equal-pointer" },
        ],
      }],
    })],
  },
});
const checked = session.checkSource();
assert.deepEqual(checked.diagnostics, []);
assert.deepEqual(checked.extensionDiagnostics, []);

await mkdir(sourceRoot, { recursive: true });
const runtimeRoot = toolchain.packages.typeScriptRuntime.root;
const runtimePackage = JSON.parse(
  await readFile(join(runtimeRoot, "package.json"), "utf8"),
);
assert.equal(runtimePackage.name, "@tsonic/typescript-runtime");
assert.equal(typeof runtimePackage.version, "string");

const backend = createTypeScriptBackend(createExternalAstPrinter(
  typeScriptAstPrinterConfig(toolchain, sourceRoot),
));
const compiled = backend.compile({
  source: createTargetSourceProgram(checked),
  project: {
    entryPoint: "/project/index.ts",
    targets: [{ id: "typescript" }],
  },
  target: { id: "typescript" },
  runtimeReferences: [{
    kind: "npm-package",
    include: runtimePackage.name,
    version: runtimePackage.version,
  }],
  paths: {
    projectFilePath: "/project/tsonic.json",
    projectRoot: "/project",
    outputRoot: "/project/out",
    targetOutputRoot: "/project/out/typescript",
  },
});
assert.deepEqual(compiled.diagnostics, []);
assert.deepEqual(
  compiled.artifacts.map((artifact) => [artifact.kind, artifact.path]),
  [
    ["project", "package.json"],
    ["asset", "tsonic-typescript-optimization.json"],
    ["source", "index.ts"],
    ["source", "markers.ts"],
  ],
);
const optimizationArtifact = compiled.artifacts.find((artifact) =>
  artifact.path === "tsonic-typescript-optimization.json"
);
assert.ok(optimizationArtifact !== undefined);
assert.deepEqual(JSON.parse(optimizationArtifact.text), {
  schemaVersion: 4,
  pointer: { profile: "location", analyzed: false },
  scalar: {
    profile: "preserve",
    syntacticProjectionCount: 0,
    optimizedProjectionCount: 0,
    retainedProjectionCount: 0,
  },
  cooperativeEffects: { profile: "preserve", analyzed: false },
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
