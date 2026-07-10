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
} from "../sealed-evidence.mjs";
import { canonicalJson, compareUtf8, executableProvenance, fingerprint, hashInputRoots } from "../test-provenance.mjs";

const driverPath = fileURLToPath(import.meta.url);
const provenanceHelperPath = fileURLToPath(new URL("../test-provenance.mjs", import.meta.url));
const sealHelperPath = fileURLToPath(new URL("../sealed-evidence.mjs", import.meta.url));

export async function ensureCorpusTstsBuild({ repoRoot, packageRoot, buildRoot, noBuild }) {
  const tscPath = join(repoRoot, "node_modules/typescript/bin/tsc");
  if (!existsSync(tscPath)) throw new Error(`TypeScript compiler not found at ${relative(repoRoot, tscPath)}; run npm install first`);
  const request = corpusBuildRequest({ repoRoot, packageRoot, tscPath });
  const buildId = fingerprint(request, "tsts-corpus-build-v2");
  const destination = join(buildRoot, "cache", buildId);
  const existing = verifyCorpusTstsBuild(destination, request, buildId);
  if (existing !== undefined) return existing;
  if (noBuild) throw new Error(`--no-build requires the exact validated TSTS corpus build ${buildId}`);

  const staging = join(buildRoot, `${buildId}.partial-${process.pid}-${randomUUID()}`);
  const dist = join(staging, "dist");
  await mkdir(dist, { recursive: true });
  console.log(`Building TSTS dist for AST parity ${buildId}`);
  run(process.execPath, [tscPath, "-p", "packages/tsts/tsconfig.json", "--outDir", dist, "--pretty", "false"], repoRoot, fixedNodeEnvironment());
  await normalizeModes(dist);
  const output = hashInputRoots([{ label: "tsts-dist", path: dist }]).roots[0];
  const provenance = { schemaVersion: 2, buildId, request, output };
  await writeFile(join(staging, "provenance.json"), `${JSON.stringify(provenance, null, 2)}\n`);
  await normalizeModes(staging);
  await sealEvidenceDirectory(staging, { kind: "tsts-corpus-build", buildId });
  await mkdir(dirname(destination), { recursive: true });
  try {
    await publishSealedDirectory(staging, destination);
  } catch (error) {
    if (!existsSync(destination)) throw error;
    const winner = verifyCorpusTstsBuild(destination, request, buildId);
    if (winner === undefined) throw error;
    return winner;
  }
  const verified = verifyCorpusTstsBuild(destination, request, buildId);
  if (verified === undefined) throw new Error(`TSTS corpus build publication failed for ${buildId}`);
  return verified;
}

export function corpusBuildRequest({ repoRoot, packageRoot, tscPath = join(repoRoot, "node_modules/typescript/bin/tsc") }) {
  return {
    schemaVersion: 2,
    inputs: hashInputRoots([
      { label: "tsts-source", path: join(packageRoot, "src") },
      { label: "tsts-tsconfig", path: join(packageRoot, "tsconfig.json") },
      { label: "tsts-package", path: join(packageRoot, "package.json") },
      { label: "workspace-package", path: join(repoRoot, "package.json") },
      { label: "workspace-lock", path: join(repoRoot, "package-lock.json") },
      { label: "typescript-compiler-package", path: join(repoRoot, "node_modules/typescript") },
      { label: "node-type-declarations", path: join(repoRoot, "node_modules/@types/node") },
      { label: "undici-type-declarations", path: join(repoRoot, "node_modules/undici-types") },
      { label: "corpus-build-driver", path: driverPath },
      { label: "corpus-build-provenance-helper", path: provenanceHelperPath },
      { label: "corpus-build-seal-helper", path: sealHelperPath },
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

export function verifyCorpusTstsBuild(directory, request, buildId) {
  if (!existsSync(directory)) return undefined;
  const verified = readVerifiedEvidenceJson(directory, "provenance.json");
  const provenance = verified.value;
  assertExactKeys(provenance, ["buildId", "output", "request", "schemaVersion"], "TSTS corpus build provenance");
  if (provenance.schemaVersion !== 2 || provenance.buildId !== buildId || canonicalJson(provenance.request) !== canonicalJson(request)) {
    throw new Error(`TSTS corpus build provenance mismatch: ${directory}`);
  }
  if (fingerprint(request, "tsts-corpus-build-v2") !== buildId) throw new Error(`TSTS corpus build identity mismatch: ${directory}`);
  if (canonicalJson(verified.seal.metadata) !== canonicalJson({ kind: "tsts-corpus-build", buildId })) throw new Error(`TSTS corpus build seal metadata mismatch: ${directory}`);
  const output = hashInputRoots([{ label: "tsts-dist", path: join(directory, "dist") }]).roots[0];
  if (canonicalJson(output) !== canonicalJson(provenance.output)) throw new Error(`TSTS corpus build output digest mismatch: ${directory}`);
  return { buildId, path: join(directory, "dist"), provenance, evidenceDigest: verified.seal.evidenceDigest };
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
    if (stat.isSymbolicLink()) throw new Error(`symlink is forbidden in TSTS corpus build: ${path}`);
    if (stat.isDirectory()) await normalizeModes(path);
    else if (stat.isFile()) await chmod(path, 0o644);
    else throw new Error(`unsupported TSTS corpus build entry: ${path}`);
  }
}

function assertExactKeys(value, expected, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  if (canonicalJson(Object.keys(value).sort(compareUtf8)) !== canonicalJson([...expected].sort(compareUtf8))) throw new Error(`${label} has invalid keys`);
}
