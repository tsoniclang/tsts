#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import {
  inspectGeneratedArtifactRegistration,
  inventoryGeneratedArtifactsForProvider,
  renderGeneratedArtifactEnvelope,
  stripGeneratedArtifactEnvelope,
} from "../porter/generated-artifact-registry.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const generatedKind = "bundled-generated";
const generatedBy = "porter:bundled";

export function bundledConfig(config = {}) {
  const tsRoot = config.tsRoot ?? "packages/tsts/src";
  const sourceRoot = config.sourceRoot ?? "packages/tsts/_vendor/typescript-go";
  const sourceLibDir = config.bundledSourceLibDir ?? `${sourceRoot}/internal/bundled/libs`;
  const generatedDir = "internal/bundled";
  const targetDir = `${tsRoot.replace(/\/$/, "")}/${generatedDir}`;
  return {
    sourceLibDir,
    targetDir,
    targetLibDir: `${targetDir}/libs`,
    libsGeneratedPath: `${targetDir}/libs_generated.ts`,
    embedGeneratedPath: `${targetDir}/embed_generated.ts`,
  };
}

export function buildExpectedBundledArtifacts(config = {}, sourceRevision = undefined) {
  sourceRevision ??= currentSourceRevision(config.sourceRoot);
  const bc = bundledConfig(config);
  const sourceRoot = resolveRepo(bc.sourceLibDir);
  const libNames = readLibNames(sourceRoot);
  const artifacts = new Map();

  const libsBody = renderLibsGeneratedBody(libNames);
  artifacts.set(bc.libsGeneratedPath, withGeneratedHeader({
    path: path.posix.relative(config.tsRoot ?? "packages/tsts/src", bc.libsGeneratedPath),
    sourceRevision,
    body: libsBody,
  }));

  const embedBody = renderEmbedGeneratedBody(sourceRoot, libNames);
  artifacts.set(bc.embedGeneratedPath, withGeneratedHeader({
    path: path.posix.relative(config.tsRoot ?? "packages/tsts/src", bc.embedGeneratedPath),
    sourceRevision,
    body: embedBody,
  }));

  for (const name of libNames) {
    const relativePath = `${bc.targetLibDir}/${name}`;
    const body = readFileSync(path.join(sourceRoot, name), "utf8");
    artifacts.set(relativePath, withGeneratedHeader({
      path: path.posix.relative(config.tsRoot ?? "packages/tsts/src", relativePath),
      sourceRevision,
      body,
    }));
  }

  return artifacts;
}

export function buildBundledGeneratedArtifactStatus(config = {}, sourceRevision = undefined) {
  sourceRevision ??= currentSourceRevision(config.sourceRoot);
  const expected = buildExpectedBundledArtifacts(config, sourceRevision);
  const expectedPaths = new Set(expected.keys());
  const bc = bundledConfig(config);
  const inventory = actualBundledArtifactInventory(config);
  const actualFiles = inventory.files;
  const actualPaths = new Set(actualFiles);
  const missing = [];
  const stale = [];
  const orphan = [];
  const untracked = [];
  const invalid = inventory.invalid.map((entry) => ({
    ...entry,
    path: `${(config.tsRoot ?? "packages/tsts/src").replace(/\/$/, "")}/${entry.path}`,
  }));

  for (const relativePath of [...expectedPaths].sort()) {
    if (!actualPaths.has(relativePath)) {
      missing.push({ path: relativePath, reason: "Expected bundled generated artifact is missing." });
    }
  }

  for (const relativePath of actualFiles) {
    const text = readFileSync(resolveRepo(relativePath), "utf8");
    const artifactPath = path.posix.relative(config.tsRoot ?? "packages/tsts/src", relativePath);
    const metadataResult = inspectGeneratedArtifactRegistration(artifactPath, text);
    if (metadataResult.error) {
      invalid.push({ path: relativePath, reason: metadataResult.error });
      continue;
    }
    if (!metadataResult.metadata) {
      untracked.push({ path: relativePath, reason: "Bundled generated artifacts must carry @tsgo-generated metadata." });
      continue;
    }
    if (!expectedPaths.has(relativePath)) {
      orphan.push({
        path: relativePath,
        metadata: metadataResult.metadata,
        reason: "Bundled generated artifact metadata exists, but this artifact is no longer generated from the current TS-Go snapshot.",
      });
      continue;
    }
    const expectedText = expected.get(relativePath);
    if (text !== expectedText) {
      stale.push({
        path: relativePath,
        metadata: metadataResult.metadata,
        expectedHash: hashText(stripGeneratedHeader(expectedText)),
        actualHash: hashText(stripGeneratedHeader(text)),
        reason: "Bundled generated artifact contents differ from the current deterministic output.",
      });
    }
  }

  return { missing, stale, orphan, untracked, invalid };
}

export function emptyBundledGeneratedArtifactStatus() {
  return { missing: [], stale: [], orphan: [], untracked: [], invalid: [] };
}

export function collectBundledArtifactFailures(status) {
  const failures = [];
  if (status.missing.length > 0) failures.push(`${status.missing.length} missing bundled artifacts`);
  if (status.stale.length > 0) failures.push(`${status.stale.length} stale bundled artifacts`);
  if (status.orphan.length > 0) failures.push(`${status.orphan.length} orphan bundled artifacts`);
  if (status.untracked.length > 0) failures.push(`${status.untracked.length} untracked bundled artifacts`);
  if (status.invalid.length > 0) failures.push(`${status.invalid.length} invalid bundled artifacts`);
  return failures;
}

export function writeBundledGenerated(config = {}, sourceRevision = undefined) {
  sourceRevision ??= currentSourceRevision(config.sourceRoot);
  const artifacts = buildExpectedBundledArtifacts(config, sourceRevision);
  const bc = bundledConfig(config);
  rmSync(resolveRepo(bc.targetLibDir), { force: true, recursive: true });
  for (const [relativePath, text] of artifacts) {
    const absolutePath = resolveRepo(relativePath);
    mkdirSync(path.dirname(absolutePath), { recursive: true });
    writeFileSync(absolutePath, text);
  }
  return artifacts.size;
}

function actualBundledArtifactInventory(config) {
  const tsRoot = (config.tsRoot ?? "packages/tsts/src").replace(/\/$/, "");
  const inventory = inventoryGeneratedArtifactsForProvider(resolveRepo(tsRoot), generatedBy);
  return {
    files: inventory.files.map((relativePath) => `${tsRoot}/${relativePath}`),
    invalid: inventory.invalid,
  };
}

function renderLibsGeneratedBody(names) {
  const entries = names.map((name) => `  ${JSON.stringify(name)},`).join("\n");
  return `export const LibNames: readonly string[] = [\n${entries}\n];\n`;
}

function renderEmbedGeneratedBody(sourceRoot, names) {
  const entries = names.map((name) => {
    const content = readFileSync(path.join(sourceRoot, name), "utf8");
    return `  [${JSON.stringify(`libs/${name}`)}, ${Buffer.byteLength(content, "utf8")}],`;
  });
  return `export const embeddedContentSizes: ReadonlyMap<string, number> = new Map<string, number>([\n${entries.join("\n")}\n]);\n\nexport const embeddedContentNames: ReadonlySet<string> = new Set<string>(embeddedContentSizes.keys());\n`;
}

function withGeneratedHeader({ path: artifactPath, sourceRevision, body }) {
  return renderGeneratedArtifactEnvelope({
    body,
    header: "// Code generated by TSTS bundled generator. DO NOT EDIT.",
    kind: generatedKind,
    path: artifactPath,
    providerId: generatedBy,
    sourceRevision,
  });
}

function readLibNames(sourceRoot) {
  return readdirSync(sourceRoot)
    .filter((name) => name.endsWith(".d.ts"))
    .sort((left, right) => left.localeCompare(right));
}

function stripGeneratedHeader(text) {
  return stripGeneratedArtifactEnvelope(text);
}

function currentSourceRevision(sourceRoot = "packages/tsts/_vendor/typescript-go") {
  const result = spawnSync("git", ["rev-parse", "HEAD"], { cwd: resolveRepo(sourceRoot), encoding: "utf8" });
  if (result.status !== 0) return "unknown";
  return result.stdout.trim();
}

function hashText(text) {
  return createHash("sha256").update(text).digest("hex");
}

function resolveRepo(relativePath) {
  return path.resolve(repoRoot, relativePath);
}

function main() {
  const args = new Set(process.argv.slice(2));
  const check = args.has("--check");
  const write = args.has("--write") || !check;

  if (args.has("--help")) {
    console.log("Usage: node packages/tsts/tools/bundled/generate-bundled.mjs [--check|--write]");
    process.exit(0);
  }

  if (check) {
    const status = buildBundledGeneratedArtifactStatus();
    const failures = collectBundledArtifactFailures(status);
    if (failures.length > 0) {
      throw new Error(`bundled generated artifact check failed: ${failures.join(", ")}`);
    }
    const bc = bundledConfig();
    const libCount = readLibNames(resolveRepo(bc.sourceLibDir)).length;
    console.log(`bundled generated files are current (${libCount} libs)`);
  } else if (write) {
    const count = writeBundledGenerated();
    console.log(`bundled generated files written (${count - 2} libs)`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
