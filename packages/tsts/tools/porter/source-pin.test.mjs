import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { buildSourcePinStatus, readSourcePinManifest } from "./source-pin.mjs";
import { loadConfig, repoRoot } from "./porter.mjs";

test("checked-in source pin proves source, nested source, schema, documentation, and extractor", () => {
  const status = buildSourcePinStatus(repoRoot, loadConfig());
  const { manifest } = readSourcePinManifest(repoRoot, loadConfig());
  assert.deepEqual(status.issues, []);
  assert.equal(status.source.revision, manifest.revision);
  assert.equal(status.source.nestedSources[0].revision, manifest.nestedSources[0].revision);
  assert.equal(status.schemaFileCount, manifest.schemaFiles.length);
});

test("source pin detects dirty source and byte/hash drift", (t) => {
  const fixture = sourcePinFixture();
  t.after(() => rmSync(fixture.root, { recursive: true, force: true }));

  const clean = buildSourcePinStatus(fixture.root, fixture.config, fixture.snapshot);
  assert.deepEqual(clean.issues, []);

  writeFileSync(path.join(fixture.sourceRoot, "schema.go"), "package source\nconst Value = 2\n");
  const drifted = buildSourcePinStatus(fixture.root, fixture.config, fixture.snapshot);
  assert.ok(drifted.issues.some((issue) => issue.reason.includes("source checkout is dirty")));
  assert.ok(drifted.issues.some((issue) => issue.reason.includes("not byte-identical")));
  assert.ok(drifted.issues.some((issue) => issue.reason.includes("upstream source hash")));
});

test("source pin rejects tracked Go files in a nested source declared no-go", (t) => {
  const fixture = sourcePinFixture({ nestedGo: true });
  t.after(() => rmSync(fixture.root, { recursive: true, force: true }));
  const status = buildSourcePinStatus(fixture.root, fixture.config, fixture.snapshot);
  assert.ok(status.issues.some((issue) => issue.reason.includes("declared no-go")));
});

test("source pin rejects unknown manifest fields instead of accepting schema drift", (t) => {
  const fixture = sourcePinFixture();
  t.after(() => rmSync(fixture.root, { recursive: true, force: true }));
  const manifest = JSON.parse(readFileSync(fixture.manifestPath, "utf8"));
  manifest.futureField = true;
  writeFileSync(fixture.manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  const status = buildSourcePinStatus(fixture.root, fixture.config, fixture.snapshot);
  assert.ok(status.issues.some((issue) => issue.reason.includes("keys must be exactly") && issue.reason.includes("futureField")));
});

function sourcePinFixture(options = {}) {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-source-pin-"));
  const sourceRoot = path.join(root, "source");
  const nestedRoot = path.join(sourceRoot, "nested");
  const schemaRoot = path.join(root, "schema");
  const extractorRoot = path.join(root, "extractor");
  mkdirSync(sourceRoot, { recursive: true });
  mkdirSync(schemaRoot, { recursive: true });
  mkdirSync(extractorRoot, { recursive: true });

  const schemaText = "package source\nconst Value = 1\n";
  mkdirSync(nestedRoot, { recursive: true });
  writeFileSync(path.join(nestedRoot, "source.ts"), "export const value = 1;\n");
  if (options.nestedGo === true) writeFileSync(path.join(nestedRoot, "unexpected.go"), "package unexpected\n");
  const nestedRevision = commitRepository(nestedRoot, "nested");

  writeFileSync(path.join(sourceRoot, "schema.go"), schemaText);
  initializeRepository(sourceRoot);
  runGit(sourceRoot, ["add", "schema.go"]);
  runGit(sourceRoot, ["update-index", "--add", "--cacheinfo", `160000,${nestedRevision},nested`]);
  commit(sourceRoot, "source");
  const sourceRevision = runGit(sourceRoot, ["rev-parse", "HEAD"]).trim();

  const digest = sha256(schemaText);
  writeFileSync(path.join(schemaRoot, "schema.go"), schemaText);
  writeFileSync(path.join(schemaRoot, "VERSION.md"), [
    "| Field | Value |",
    "| --- | --- |",
    "| Upstream | `example/source` |",
    `| Commit | \`${sourceRevision}\` |`,
    "| Git object format | `sha1` |",
    `| Nested TypeScript commit | \`${nestedRevision}\` |`,
    `| \`schema.go\` SHA-256 | \`${digest}\` |`,
    "",
  ].join("\n"));
  writeFileSync(path.join(extractorRoot, "go.mod"), "module example-extractor\n\ngo 1.26\n\ntoolchain go1.26.4\n");

  const manifest = {
    schemaVersion: 1,
    upstream: "example/source",
    sourceRoot: "source",
    goModulePath: "example/source",
    revision: sourceRevision,
    gitObjectFormat: "sha1",
    nestedSources: [{ name: "TypeScript", path: "nested", revision: nestedRevision, gitObjectFormat: "sha1", goPolicy: "no-go" }],
    schemaDirectory: "schema",
    documentation: "VERSION.md",
    schemaFiles: [{ path: "schema.go", source: "schema.go", sha256: digest }],
    sourceFiles: [],
    extractor: { module: "extractor", goVersion: "go1.26.4", goos: "linux", goarch: "amd64" },
  };
  writeFileSync(path.join(schemaRoot, "source-pin.json"), `${JSON.stringify(manifest, null, 2)}\n`);

  initializeRepository(root);
  runGit(root, ["update-index", "--add", "--cacheinfo", `160000,${sourceRevision},source`]);

  return {
    root,
    sourceRoot,
    manifestPath: path.join(schemaRoot, "source-pin.json"),
    config: {
      sourceRoot: "source",
      sourcePinManifest: "schema/source-pin.json",
      goModulePath: "example/source",
      astSchemaDir: "schema",
    },
    snapshot: {
      gitRevision: sourceRevision,
      environment: { goVersion: "go1.26.4", goos: "linux", goarch: "amd64" },
      files: [{ path: "schema.go", gitBlobHash: gitBlobHash(schemaText) }],
    },
  };
}

function commitRepository(directory, message) {
  initializeRepository(directory);
  runGit(directory, ["add", "."]);
  commit(directory, message);
  return runGit(directory, ["rev-parse", "HEAD"]).trim();
}

function initializeRepository(directory) {
  runGit(directory, ["init", "--quiet"]);
}

function commit(directory, message) {
  runGit(directory, ["-c", "user.name=TSTS", "-c", "user.email=tsts@example.invalid", "commit", "--quiet", "-m", message]);
}

function runGit(directory, args) {
  const result = spawnSync("git", ["-C", directory, ...args], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function gitBlobHash(value) {
  return createHash("sha1").update(`blob ${Buffer.byteLength(value)}\0`).update(value).digest("hex");
}
