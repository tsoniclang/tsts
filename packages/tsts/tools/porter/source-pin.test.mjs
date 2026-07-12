import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { GO_TOOLCHAIN_ROOT_HASH_CONTRACT, hashGoToolchainRoot } from "./go-toolchain-pin.mjs";
import { buildSourcePinStatus, readSourcePinManifest, resolvePinnedGoToolchain } from "./source-pin.mjs";
import { gitlinkEntries } from "./source-pin/git.mjs";
import { loadConfig, repoRoot } from "./porter.mjs";

test("checked-in source pin proves source, nested source, schema, documentation, and extractor", () => {
  const status = buildSourcePinStatus(repoRoot, loadConfig());
  const { manifest } = readSourcePinManifest(repoRoot, loadConfig());
  const toolchain = resolvePinnedGoToolchain(repoRoot, loadConfig());
  assert.deepEqual(status.issues, []);
  assert.equal(sha256(readFileSync(toolchain.executable)), manifest.extractor.toolchainExecutableSha256);
  assert.deepEqual({ ...toolchain.tree, root: undefined }, { ...manifest.extractor.goroot, root: undefined });
  assert.equal(status.source.revision, manifest.revision);
  assert.equal(status.source.nestedSources[0].revision, manifest.nestedSources[0].revision);
  assert.equal(status.schemaFileCount, manifest.schemaFiles.length);
});

test("GOROOT tree hash is cross-language exact over paths, modes, bytes, and symlink targets", () => {
  const first = goRootFixture("lib/data.txt");
  const second = goRootFixture("bin/tool");
  const expected = "e9438fb2b08e3255f850123a8437fd10cd73f3d2367351e5615272f35108ef7f";
  const initial = hashGoToolchainRoot(first);
  assert.equal(GO_TOOLCHAIN_ROOT_HASH_CONTRACT.name, "tsts-porter-goroot-tree-v1");
  assert.equal(initial.sha256, expected);
  assert.equal(initial.entryCount, 5);
  assert.equal(initial.fileCount, 2);
  assert.equal(initial.directoryCount, 2);
  assert.equal(initial.symlinkCount, 1);
  assert.notEqual(hashGoToolchainRoot(second).sha256, expected);

  writeFileSync(path.join(first, "lib/data.txt"), "changed\0bytes\n");
  assert.notEqual(hashGoToolchainRoot(first).sha256, expected);
  writeFileSync(path.join(first, "lib/data.txt"), "alpha\0beta\n");
  chmodSync(path.join(first, "lib/data.txt"), 0o600);
  assert.notEqual(hashGoToolchainRoot(first).sha256, expected);
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

test("Git index inspection fails closed outside a repository", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-source-pin-no-git-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  assert.throws(() => gitlinkEntries(root), /cannot read Git index/);
});

test("source pin fails closed when required documentation is missing", (t) => {
  const fixture = sourcePinFixture();
  t.after(() => rmSync(fixture.root, { recursive: true, force: true }));
  rmSync(path.join(fixture.root, "SOURCE-PIN.md"));
  const status = buildSourcePinStatus(fixture.root, fixture.config, fixture.snapshot);
  assert.ok(status.issues.some((issue) => (
    issue.path === "SOURCE-PIN.md" &&
    issue.reason.includes("required source pin documentation cannot be read") &&
    issue.reason.includes("disappeared during filesystem traversal")
  )));
});

test("source pin fails closed when required documentation is nonregular", (t) => {
  const fixture = sourcePinFixture();
  t.after(() => rmSync(fixture.root, { recursive: true, force: true }));
  const documentation = path.join(fixture.root, "SOURCE-PIN.md");
  rmSync(documentation);
  mkdirSync(documentation);
  const status = buildSourcePinStatus(fixture.root, fixture.config, fixture.snapshot);
  assert.ok(status.issues.some((issue) => (
    issue.path === "SOURCE-PIN.md" &&
    issue.reason.includes("required source pin documentation cannot be read") &&
    issue.reason.includes("must be a regular non-symlink file")
  )));
});

test("source pin fails closed when required documentation is unreadable", (t) => {
  const fixture = sourcePinFixture();
  t.after(() => rmSync(fixture.root, { recursive: true, force: true }));
  const documentation = path.join(fixture.root, "SOURCE-PIN.md");
  chmodSync(documentation, 0o000);
  const status = buildSourcePinStatus(fixture.root, fixture.config, fixture.snapshot);
  chmodSync(documentation, 0o600);
  assert.ok(status.issues.some((issue) => (
    issue.path === "SOURCE-PIN.md" &&
    issue.reason.includes("required source pin documentation cannot be read") &&
    issue.reason.includes("EACCES")
  )));
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
  const extractorExecutableHash = "a".repeat(64);
  const extractorGoRootHash = "c".repeat(64);
  writeFileSync(path.join(schemaRoot, "schema.go"), schemaText);
  writeFileSync(path.join(root, "SOURCE-PIN.md"), [
    "| Field | Value |",
    "| --- | --- |",
    "| Upstream | `example/source` |",
    `| Commit | \`${sourceRevision}\` |`,
    "| Git object format | `sha1` |",
    `| Nested TypeScript commit | \`${nestedRevision}\` |`,
    `| Go toolchain executable SHA-256 | \`${extractorExecutableHash}\` |`,
    "| Go GOROOT hash contract | `tsts-porter-goroot-tree-v1` |",
    `| Go GOROOT tree SHA-256 | \`${extractorGoRootHash}\` |`,
    `| \`schema.go\` SHA-256 | \`${digest}\` |`,
    "",
  ].join("\n"));
  writeFileSync(path.join(extractorRoot, "go.mod"), "module example-extractor\n\ngo 1.26\n\ntoolchain go1.26.4\n");

  const manifest = {
    schemaVersion: 3,
    upstream: "example/source",
    sourceRoot: "source",
    goModulePath: "example/source",
    revision: sourceRevision,
    gitObjectFormat: "sha1",
    nestedSources: [{ name: "TypeScript", path: "nested", revision: nestedRevision, gitObjectFormat: "sha1", goPolicy: "no-go" }],
    schemaDirectory: "schema",
    documentation: "SOURCE-PIN.md",
    schemaMetadata: [],
    schemaFiles: [{ path: "schema.go", source: "schema.go", sha256: digest }],
    sourceFiles: [],
    generatorInputs: [],
    extractor: {
      module: "extractor",
      goVersion: "go1.26.4",
      goos: "linux",
      goarch: "amd64",
      toolchainExecutableSha256: extractorExecutableHash,
      goroot: {
        contract: "tsts-porter-goroot-tree-v1", sha256: extractorGoRootHash,
        entryCount: 5, fileCount: 2, directoryCount: 2, symlinkCount: 1, bytes: 28,
      },
    },
  };
  writeFileSync(path.join(root, "source-pin.json"), `${JSON.stringify(manifest, null, 2)}\n`);

  initializeRepository(root);
  runGit(root, ["update-index", "--add", "--cacheinfo", `160000,${sourceRevision},source`]);

  return {
    root,
    sourceRoot,
    manifestPath: path.join(root, "source-pin.json"),
    config: {
      sourceRoot: "source",
      sourcePinManifest: "source-pin.json",
      goModulePath: "example/source",
      astSchemaDir: "schema",
    },
    snapshot: {
      gitRevision: sourceRevision,
      environment: { goVersion: "go1.26.4", goos: "linux", goarch: "amd64" },
      semantic: {
        toolchainExecutable: "/fixture/go", toolchainHash: extractorExecutableHash,
        goroot: "/fixture", gorootHash: extractorGoRootHash, gorootHashContract: "tsts-porter-goroot-tree-v1",
        gorootEntryCount: 5, gorootFileCount: 2, gorootDirectoryCount: 2, gorootSymlinkCount: 1, gorootBytes: 28,
      },
      files: [{ path: "schema.go", gitBlobHash: gitBlobHash(schemaText) }],
    },
  };
}

function goRootFixture(linkTarget) {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-goroot-hash-"));
  const bin = path.join(root, "bin");
  const lib = path.join(root, "lib");
  mkdirSync(bin);
  mkdirSync(lib);
  chmodSync(root, 0o755);
  chmodSync(bin, 0o755);
  chmodSync(lib, 0o755);
  writeFileSync(path.join(bin, "tool"), "#!/bin/sh\nexit 0\n");
  chmodSync(path.join(bin, "tool"), 0o755);
  writeFileSync(path.join(lib, "data.txt"), "alpha\0beta\n");
  chmodSync(path.join(lib, "data.txt"), 0o644);
  symlinkSync(linkTarget, path.join(root, "alias"));
  return root;
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
