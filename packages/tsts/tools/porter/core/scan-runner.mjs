import { spawnSync } from "node:child_process";
import { constants as bufferConstants } from "node:buffer";
import { closeSync, constants, fstatSync, mkdirSync, mkdtempSync, openSync, readSync } from "node:fs";
import path from "node:path";

import { assertPinnedGoToolchainStable } from "../go-toolchain-pin.mjs";
import { inactiveSourcePolicyFor } from "./policies.mjs";
import {
  buildSourcePinStatus,
  collectSourcePinFailures,
  inspectGitCheckout,
  resolvePinnedGoToolchain,
} from "../source-pin.mjs";
import { assertPorterSnapshot } from "./snapshot.mjs";
import { externalPackageSurfaceObjectIds } from "./external-package-declarations.mjs";
import { assertDirectory, fail, repoRoot, resolveRepo, walk } from "./runtime.mjs";

const OUTPUT_FLAGS = constants.O_RDWR | constants.O_CREAT | constants.O_EXCL | (constants.O_NOFOLLOW ?? 0);
const OUTPUT_STABILITY_FIELDS = ["dev", "ino", "mode", "nlink", "size", "mtimeNs", "ctimeNs"];

export function runScan(config) {
  const sourceRoot = resolveRepo(config.sourceRoot);
  const helperDir = resolveRepo("packages/tsts/tools/porter/go-extractor");
  assertDirectory(sourceRoot, "TS-Go source root");
  assertDirectory(helperDir, "Go extractor");
  const sourceBefore = requireCleanSourceCheckout(sourceRoot, "before extraction");
  const semanticFiles = activeSemanticFiles(config, sourceRoot);
  const goToolchain = pinnedToolchain(config);
  const output = createOutputDescriptor();
  try {
    const result = spawnSync(
      goToolchain.executable,
      ["run", ".", "-root", sourceRoot, "-module", config.goModulePath, "-revision", sourceBefore.revision, "-extraction-request-stdin"],
      {
        cwd: helperDir,
        encoding: "utf8",
        env: goToolchain.environment,
        input: `${JSON.stringify({
          schemaVersion: 1,
          semanticFiles,
          externalPackageSurfaceObjectIds: externalPackageSurfaceObjectIds(config),
        })}\n`,
        maxBuffer: 16 * 1024 * 1024,
        stdio: ["pipe", output.fd, "pipe"],
      },
    );
    if (result.error !== undefined) fail(`failed to execute Go extractor: ${result.error.message}`);
    if (result.status !== 0 || result.signal !== null) {
      fail(`Go extractor failed with status ${result.status ?? "none"} signal ${result.signal ?? "none"}\n${result.stderr ?? ""}`);
    }
    if ((result.stderr ?? "") !== "") fail(`Go extractor wrote unexpected standard error on success:\n${result.stderr}`);
    assertPinnedGoToolchainStable(goToolchain);
    const snapshot = parseSnapshotDescriptor(output.fd);
    assertPorterSnapshot(snapshot, config);
    assertSemanticScope(snapshot, semanticFiles);
    assertSnapshotToolchainIdentity(snapshot, goToolchain);
    if (snapshot.gitRevision !== sourceBefore.revision) throw new Error("extractor source revision differs from independently validated checkout revision");
    const sourceAfter = requireCleanSourceCheckout(sourceRoot, "after extraction");
    if (sourceAfter.revision !== sourceBefore.revision) throw new Error(`source revision changed during extraction: ${sourceBefore.revision} -> ${sourceAfter.revision}`);
    return snapshot;
  } catch (error) {
    fail(`Go extractor produced invalid evidence: ${error.message}`);
  } finally {
    closeSync(output.fd);
  }
}

function activeSemanticFiles(config, sourceRoot) {
  return walk(sourceRoot)
    .filter((file) => file.endsWith(".go"))
    .map((file) => path.relative(sourceRoot, file).split(path.sep).join("/"))
    .filter((relative) => inactiveSourcePolicyFor(config, relative) === undefined);
}

function assertSemanticScope(snapshot, semanticFiles) {
  const allowed = new Set(semanticFiles);
  const required = new Set(snapshot.semantic.requiredFiles);
  const excluded = new Set(snapshot.semantic.excludedFiles);
  for (const file of snapshot.files) {
    if (allowed.has(file.path)) continue;
    if (!excluded.has(file.path)) throw new Error(`inactive Go source is not explicitly excluded from semantic evidence: ${file.path}`);
    if (required.has(file.path)) throw new Error(`inactive Go source acquired semantic evidence: ${file.path}`);
  }
  for (const file of required) {
    if (!allowed.has(file)) throw new Error(`semantic evidence escaped the active source policy: ${file}`);
  }
}

export function runPinnedScan(config) {
  assertSourcePinStatus(buildSourcePinStatus(repoRoot, config));
  const snapshot = runScan(config);
  assertSourcePinStatus(buildSourcePinStatus(repoRoot, config, snapshot));
  return snapshot;
}

function pinnedToolchain(config) {
  try {
    return resolvePinnedGoToolchain(repoRoot, config);
  } catch (error) {
    fail(`cannot resolve pinned Go toolchain: ${error.message}`);
  }
}

function createOutputDescriptor() {
  const scanRoot = resolveRepo(".temp/porter-scans");
  mkdirSync(scanRoot, { recursive: true });
  const directory = mkdtempSync(path.join(scanRoot, "scan-"));
  const file = path.join(directory, "snapshot.json");
  return { fd: openSync(file, OUTPUT_FLAGS, 0o600), file };
}

function parseSnapshotDescriptor(fd) {
  const before = fstatSync(fd, { bigint: true });
  if (!before.isFile() || before.isSymbolicLink()) throw new Error("extractor output descriptor is not a regular file");
  if (before.size < 1n || before.size > BigInt(bufferConstants.MAX_LENGTH)) {
    throw new Error(`extractor output size ${before.size} is outside the supported JSON evidence range`);
  }
  const bytes = Buffer.alloc(Number(before.size));
  let offset = 0;
  while (offset < bytes.length) {
    const count = readSync(fd, bytes, offset, bytes.length - offset, offset);
    if (count === 0) throw new Error(`extractor output ended after ${offset} of ${bytes.length} bytes`);
    offset += count;
  }
  const after = fstatSync(fd, { bigint: true });
  if (OUTPUT_STABILITY_FIELDS.some((field) => before[field] !== after[field])) throw new Error("extractor output changed while being read");
  return JSON.parse(bytes.toString("utf8"));
}

function assertSnapshotToolchainIdentity(snapshot, toolchain) {
  const expected = new Map([
    ["environment.goVersion", toolchain.goVersion],
    ["environment.goos", toolchain.goos],
    ["environment.goarch", toolchain.goarch],
    ["semantic.toolchain", toolchain.goVersion],
    ["semantic.toolchainExecutable", toolchain.executable],
    ["semantic.toolchainHash", toolchain.executableHash],
    ["semantic.goroot", toolchain.goroot],
    ["semantic.gorootHash", toolchain.gorootHash],
    ["semantic.gorootHashContract", toolchain.tree.contract],
    ["semantic.gorootEntryCount", toolchain.tree.entryCount],
    ["semantic.gorootFileCount", toolchain.tree.fileCount],
    ["semantic.gorootDirectoryCount", toolchain.tree.directoryCount],
    ["semantic.gorootSymlinkCount", toolchain.tree.symlinkCount],
    ["semantic.gorootBytes", toolchain.tree.bytes],
  ]);
  for (const [field, expectedValue] of expected) {
    const actual = field.split(".").reduce((value, key) => value?.[key], snapshot);
    if (actual !== expectedValue) throw new Error(`${field} is ${JSON.stringify(actual)}, expected independently verified ${JSON.stringify(expectedValue)}`);
  }
}

function requireCleanSourceCheckout(root, phase) {
  const status = inspectGitCheckout(root);
  if (status.issues.length > 0) throw new Error(`source checkout is not stable ${phase}: ${status.issues.join("; ")}`);
  return status;
}

function assertSourcePinStatus(status) {
  const failures = collectSourcePinFailures(status);
  if (failures.length > 0) fail(`Porter source pin check failed: ${status.issues.map((issue) => `${issue.path}: ${issue.reason}`).join("; ")}`);
}
