import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { chmod, lstat, mkdir, readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import {
  publishSealedDirectory,
  readVerifiedEvidenceJson,
  sealEvidenceDirectory,
} from "./sealed-evidence.mjs";
import { canonicalJson, compareUtf8, executableProvenance, fingerprint, hashInputRoots } from "./test-provenance.mjs";

const driverPath = fileURLToPath(import.meta.url);
const provenanceHelperPath = fileURLToPath(new URL("./test-provenance.mjs", import.meta.url));
const sealHelperPath = fileURLToPath(new URL("./sealed-evidence.mjs", import.meta.url));

export async function ensureTstsBuild({ repoRoot, packageRoot, buildRoot, noBuild, logger = console.log }) {
  if (typeof logger !== "function") throw new Error("prepared TSTS build logger must be a function");
  const tscPath = join(repoRoot, "node_modules/typescript/bin/tsc");
  if (!existsSync(tscPath)) throw new Error(`TypeScript compiler not found at ${relative(repoRoot, tscPath)}; run npm install first`);
  const request = tstsBuildRequest({ repoRoot, packageRoot, tscPath });
  const buildId = fingerprint(request, "tsts-prepared-build-v1");
  const destination = join(buildRoot, "cache", buildId);
  const existing = verifyTstsBuild(destination, request, buildId);
  if (existing !== undefined) return existing;
  if (noBuild) throw new Error(`--no-build requires the exact validated prepared TSTS build ${buildId}`);

  const staging = join(buildRoot, `${buildId}.partial-${process.pid}-${randomUUID()}`);
  const dist = join(staging, "dist");
  await mkdir(dist, { recursive: true });
  logger(`Building prepared TSTS dist ${buildId}`);
  run(process.execPath, [tscPath, "-p", "packages/tsts/tsconfig.json", "--outDir", dist, "--pretty", "false"], repoRoot, fixedNodeEnvironment());
  assertTstsBuildRequestStable(request, tstsBuildRequest({ repoRoot, packageRoot, tscPath }));
  await normalizeModes(dist);
  const output = hashInputRoots([{ label: "tsts-dist", path: dist }]).roots[0];
  const provenance = { schemaVersion: 3, buildId, request, output };
  await writeFile(join(staging, "provenance.json"), `${JSON.stringify(provenance, null, 2)}\n`);
  await normalizeModes(staging);
  await sealEvidenceDirectory(staging, { kind: "tsts-prepared-build", buildId });
  await mkdir(dirname(destination), { recursive: true });
  try {
    await publishSealedDirectory(staging, destination);
  } catch (error) {
    if (!existsSync(destination)) throw error;
    const winner = verifyTstsBuild(destination, request, buildId);
    if (winner === undefined) throw error;
    return winner;
  }
  const verified = verifyTstsBuild(destination, request, buildId);
  if (verified === undefined) throw new Error(`prepared TSTS build publication failed for ${buildId}`);
  return verified;
}

export function tstsBuildRequest({ repoRoot, packageRoot, tscPath = join(repoRoot, "node_modules/typescript/bin/tsc") }) {
  return {
    schemaVersion: 3,
    inputs: hashInputRoots([
      { label: "tsts-source", path: join(packageRoot, "src") },
      { label: "tsts-tsconfig", path: join(packageRoot, "tsconfig.json") },
      { label: "tsts-package", path: join(packageRoot, "package.json") },
      { label: "workspace-package", path: join(repoRoot, "package.json") },
      { label: "workspace-lock", path: join(repoRoot, "package-lock.json") },
      { label: "typescript-compiler-package", path: join(repoRoot, "node_modules/typescript") },
      { label: "node-type-declarations", path: join(repoRoot, "node_modules/@types/node") },
      { label: "undici-type-declarations", path: join(repoRoot, "node_modules/undici-types") },
      { label: "tsts-build-driver", path: driverPath },
      { label: "tsts-build-provenance-helper", path: provenanceHelperPath },
      { label: "tsts-build-seal-helper", path: sealHelperPath },
    ]),
    runtime: {
      executable: executableProvenance(process.execPath),
      version: process.version,
      versions: process.versions,
      execArgv: [...process.execArgv],
      startupNodeOptions: process.env.NODE_OPTIONS ?? "",
    },
    compiler: {
      logicalPath: "node_modules/typescript/bin/tsc",
      executable: executableProvenance(tscPath),
    },
    command: ["<node>", "node_modules/typescript/bin/tsc", "-p", "packages/tsts/tsconfig.json", "--outDir", "<dist>", "--pretty", "false"],
    environment: semanticNodeEnvironment(),
  };
}

export function assertTstsBuildRequestStable(before, after) {
  if (canonicalJson(before) !== canonicalJson(after)) {
    throw new Error("prepared TSTS build inputs changed during compilation");
  }
}

export function verifyTstsBuild(directory, request, buildId) {
  if (!existsSync(directory)) return undefined;
  const verified = readVerifiedEvidenceJson(directory, "provenance.json");
  const provenance = verified.value;
  assertExactKeys(provenance, ["buildId", "output", "request", "schemaVersion"], "prepared TSTS build provenance");
  if (provenance.schemaVersion !== 3 || provenance.buildId !== buildId || canonicalJson(provenance.request) !== canonicalJson(request)) {
    throw new Error(`prepared TSTS build provenance mismatch: ${directory}`);
  }
  if (fingerprint(request, "tsts-prepared-build-v1") !== buildId) throw new Error(`TSTS prepared build identity mismatch: ${directory}`);
  if (canonicalJson(verified.seal.metadata) !== canonicalJson({ kind: "tsts-prepared-build", buildId })) throw new Error(`TSTS prepared build seal metadata mismatch: ${directory}`);
  const output = hashInputRoots([{ label: "tsts-dist", path: join(directory, "dist") }]).roots[0];
  if (canonicalJson(output) !== canonicalJson(provenance.output)) throw new Error(`prepared TSTS build output digest mismatch: ${directory}`);
  const build = { buildId, path: join(directory, "dist"), provenance, evidenceDigest: verified.seal.evidenceDigest };
  return { ...build, evidence: preparedTstsBuildEvidence(build) };
}

export function preparedTstsBuildEvidence(build) {
  if (build === null || typeof build !== "object" || Array.isArray(build)) throw new Error("prepared TSTS build must be an object");
  const provenance = build.provenance;
  assertExactKeys(provenance, ["buildId", "output", "request", "schemaVersion"], "prepared TSTS build provenance");
  if (provenance.schemaVersion !== 3) throw new Error(`unsupported prepared TSTS build schemaVersion '${provenance.schemaVersion}'`);
  if (typeof provenance.buildId !== "string" || provenance.buildId !== build.buildId || provenance.buildId !== fingerprint(provenance.request, "tsts-prepared-build-v1")) {
    throw new Error("prepared TSTS build identity mismatch");
  }
  if (typeof build.evidenceDigest !== "string" || !/^[0-9a-f]{64}$/.test(build.evidenceDigest)) throw new Error("prepared TSTS build evidence digest is invalid");
  assertExactKeys(provenance.request, ["command", "compiler", "environment", "inputs", "runtime", "schemaVersion"], "prepared TSTS build request");
  if (!Array.isArray(provenance.request.command) || canonicalJson(provenance.request.command.slice(0, 2)) !== canonicalJson(["<node>", "node_modules/typescript/bin/tsc"])) {
    throw new Error("prepared TSTS build command is not relocation-safe");
  }
  return JSON.parse(canonicalJson({
    schemaVersion: 3,
    buildId: provenance.buildId,
    evidenceDigest: build.evidenceDigest,
    request: provenance.request,
    output: provenance.output,
  }));
}

export function fixedNodeEnvironment() {
  const environment = semanticNodeEnvironment();
  if (process.platform === "win32") {
    for (const key of ["SystemRoot", "ComSpec", "PATHEXT", "TEMP", "TMP"]) if (process.env[key] !== undefined) environment[key] = process.env[key];
  }
  return environment;
}

function semanticNodeEnvironment() {
  return { LANG: "C.UTF-8", LC_ALL: "C.UTF-8", TZ: "UTC", NODE_OPTIONS: "", NODE_PATH: "" };
}

function run(command, args, cwd, env) {
  const result = spawnSync(command, args, { cwd, env, stdio: "inherit", timeout: 10 * 60 * 1000, killSignal: "SIGKILL" });
  if (result.error !== undefined) throw result.error;
  if (result.status !== 0 || result.signal !== null) throw new Error(`${command} ${args.join(" ")} failed`);
}

async function normalizeModes(root) {
  await chmod(root, 0o755);
  const entries = await readdir(root, { withFileTypes: true });
  entries.sort((left, right) => compareUtf8(left.name, right.name));
  for (const entry of entries) {
    const path = join(root, entry.name);
    const stat = await lstat(path);
    if (stat.isSymbolicLink()) throw new Error(`symlink is forbidden in prepared TSTS build: ${path}`);
    if (stat.isDirectory()) await normalizeModes(path);
    else if (stat.isFile()) await chmod(path, 0o644);
    else throw new Error(`unsupported prepared TSTS build entry: ${path}`);
  }
}

function assertExactKeys(value, expected, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  if (canonicalJson(Object.keys(value).sort(compareUtf8)) !== canonicalJson([...expected].sort(compareUtf8))) throw new Error(`${label} has invalid keys`);
}
