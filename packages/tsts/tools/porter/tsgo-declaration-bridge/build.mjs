import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, renameSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { readStableRegularFile } from "../core/provenance-filesystem.mjs";
import { inspectGitCheckout, readSourcePinManifest, resolvePinnedGoToolchain } from "../source-pin.mjs";

const bridgeRoot = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(bridgeRoot, "../../..");
const repositoryRoot = path.resolve(packageRoot, "../..");
const sourcePinPath = "packages/tsts/tools/porter/source-pin.json";
const bridgeInputs = Object.freeze(["go.mod", "go.sum", "main.go"]);

let preparedBridge;

export function prepareTSGoDeclarationBridge() {
  if (preparedBridge === undefined) preparedBridge = prepareBridge();
  return preparedBridge;
}

function prepareBridge() {
  const { manifest } = readSourcePinManifest(repositoryRoot, { sourcePinManifest: sourcePinPath });
  const sourceRoot = path.resolve(repositoryRoot, manifest.sourceRoot);
  const checkout = inspectGitCheckout(sourceRoot);
  if (checkout.issues.length > 0 || checkout.dirty || checkout.revision !== manifest.revision || checkout.objectFormat !== manifest.gitObjectFormat) {
    throw new Error([
      "pinned TS-Go checkout is not exact enough to build the Porter declaration bridge",
      `expected revision: ${manifest.revision}`,
      `actual revision: ${checkout.revision || "<unavailable>"}`,
      `dirty: ${checkout.dirty}`,
      `object format: ${checkout.objectFormat || "<unavailable>"}`,
      ...checkout.issues,
    ].join("\n"));
  }

  const toolchain = resolvePinnedGoToolchain(repositoryRoot, { sourcePinManifest: sourcePinPath });
  const inputHash = hashBridgeInputs();
  const outputDirectory = path.join(repositoryRoot, ".temp", "porter", "tsgo-declaration-bridge", `${manifest.revision}-${inputHash}`);
  mkdirSync(outputDirectory, { recursive: true });
  const binary = path.join(outputDirectory, "bridge");
  if (!existsSync(binary)) buildBridge(binary, manifest.revision, toolchain);
  requireRegularExecutable(binary);
  return Object.freeze({ binary, inputHash, revision: manifest.revision, sourceRoot, toolchain });
}

function hashBridgeInputs() {
  const digest = createHash("sha256");
  digest.update("tsts-porter-tsgo-declaration-bridge-v1\0", "ascii");
  for (const relative of bridgeInputs) {
    const contents = readStableRegularFile(path.join(bridgeRoot, relative), `TS-Go declaration bridge input '${relative}'`);
    digest.update(relative, "utf8");
    digest.update("\0", "ascii");
    digest.update(String(contents.length), "ascii");
    digest.update("\0", "ascii");
    digest.update(contents);
  }
  return digest.digest("hex");
}

function buildBridge(binary, revision, toolchain) {
  const temporary = `${binary}.building-${process.pid}-${process.hrtime.bigint()}`;
  const result = spawnSync(toolchain.executable, [
    "build",
    "-trimpath",
    "-buildvcs=false",
    `-ldflags=-X=main.embeddedSourceRevision=${revision}`,
    "-o",
    temporary,
    ".",
  ], {
    cwd: bridgeRoot,
    encoding: "utf8",
    env: {
      ...toolchain.environment,
      GOFLAGS: "-mod=readonly -p=1",
      GOMAXPROCS: "2",
    },
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.status !== 0) {
    throw new Error(`failed to build pinned TS-Go declaration bridge\n${result.stdout ?? ""}${result.stderr ?? ""}`.trim());
  }
  requireRegularExecutable(temporary);
  try {
    renameSync(temporary, binary);
  } catch (error) {
    if (!existsSync(binary)) throw error;
  }
}

function requireRegularExecutable(file) {
  const stat = lstatSync(file);
  if (!stat.isFile() || stat.isSymbolicLink() || (stat.mode & 0o111) === 0) {
    throw new Error(`TS-Go declaration bridge is not a real executable file: ${file}`);
  }
}
