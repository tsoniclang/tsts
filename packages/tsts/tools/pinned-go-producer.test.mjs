import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstatSync, realpathSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  symlink,
  unlink,
  writeFile,
} from "node:fs/promises";
import { delimiter, dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  buildProducerRequest,
  ensurePinnedGoProducer,
  fixedGoEnvironment,
} from "./pinned-go-producer.mjs";
import { canonicalJson, fingerprint } from "./test-provenance.mjs";

const toolsRoot = dirname(fileURLToPath(import.meta.url));
const producerPath = join(toolsRoot, "pinned-go-producer.mjs");
const realGit = commandPath("git");
const realGo = commandPath("go");

test("pinned Go producer normalizes ambient configuration", () => {
  const environment = fixedGoEnvironment({
    PATH: process.env.PATH,
    HOME: "/ambient",
    GOCACHE: "/ambient/cache",
    GOMODCACHE: "/ambient/modules",
    GOENV: "/bad",
    GOEXPERIMENT: "bad",
    GOPRIVATE: "private.example",
  });
  assert.equal(environment.HOME, undefined);
  assert.equal(environment.GOCACHE, undefined);
  assert.equal(environment.GOMODCACHE, undefined);
  assert.equal(environment.GOENV, "off");
  assert.equal(environment.GOEXPERIMENT, "");
  assert.equal(environment.GOWORK, "off");
  assert.equal(environment.CGO_ENABLED, "0");
  assert.equal(environment.GOPRIVATE, "");
  assert.equal(environment.GOVCS, "*:off");
});

test("pinned Go producer builds, reuses exact cache bytes, and rejects tampering", async (context) => {
  const fixture = await createFixture(context, "cache");
  const source = await createTinyRepository(fixture.root, "source", "base");
  const options = producerOptions(fixture, source);

  const first = await ensurePinnedGoProducer(options);
  assert.equal(run(first.path).stdout.trim(), "base");
  assert.equal(first.provenance.request.source.revision, source.revision);
  assert.match(first.provenance.request.git.tool.executable.binary.sha256, /^[0-9a-f]{64}$/);
  assert.match(first.provenance.request.build.toolchain.compiler.executable.sha256, /^[0-9a-f]{64}$/);
  assert.match(first.provenance.request.build.toolchain.linker.executable.sha256, /^[0-9a-f]{64}$/);
  assert.ok(first.provenance.request.build.dependencies.modules.length >= 1);
  assert.ok(first.provenance.request.build.dependencies.packages.length >= 1);
  assert.equal(first.provenance.request.build.environment.HOME, "<isolated:home>");
  assert.equal(canonicalJson(first.provenance.request).includes(fixture.root), false);

  const firstStat = lstatSync(first.path, { bigint: true });
  const firstBytes = await readFile(first.path);
  const second = await ensurePinnedGoProducer(options);
  const secondStat = lstatSync(second.path, { bigint: true });
  assert.equal(second.producerId, first.producerId);
  assert.equal(second.path, first.path);
  assert.equal(secondStat.ino, firstStat.ino);
  assert.deepEqual(await readFile(second.path), firstBytes);

  await writeFile(first.path, Buffer.concat([firstBytes, Buffer.from("tampered")]));
  await assert.rejects(ensurePinnedGoProducer(options), /binary digest mismatch/);
  await writeFile(first.path, firstBytes);
  await chmod(first.path, 0o755);

  if (process.platform !== "win32") {
    const provenancePath = join(dirname(first.path), "provenance.json");
    const provenanceBytes = await readFile(provenancePath);
    const externalProvenance = join(fixture.root, "external-provenance.json");
    await writeFile(externalProvenance, provenanceBytes);
    await unlink(provenancePath);
    await symlink(externalProvenance, provenancePath);
    await assert.rejects(ensurePinnedGoProducer(options), /provenance must not traverse symlink|provenance must be a regular non-symlink file/);
    await unlink(provenancePath);
    await writeFile(provenancePath, provenanceBytes);

    const externalBinary = join(fixture.root, "external-binary");
    await writeFile(externalBinary, firstBytes, { mode: 0o755 });
    await chmod(externalBinary, 0o755);
    await unlink(first.path);
    await symlink(externalBinary, first.path);
    await assert.rejects(ensurePinnedGoProducer(options), /binary must not traverse symlink|binary must be a regular non-symlink file/);
  }
});

test("pinned Go producer never overwrites a pre-existing cache destination", async (context) => {
  const fixture = await createFixture(context, "no-overwrite");
  const source = await createTinyRepository(fixture.root, "source", "base");
  const options = producerOptions(fixture, source);
  await mkdir(options.cacheRoot, { recursive: true });
  const request = await buildProducerRequest(options);
  const producerId = fingerprint(request, "tsts-pinned-go-producer-v2");
  const destination = join(options.cacheRoot, producerId);
  await mkdir(destination);
  const sentinelPath = join(destination, "sentinel");
  await writeFile(sentinelPath, "must-survive\n");

  await assert.rejects(ensurePinnedGoProducer(options), /missing provenance|unexpected entries/);
  assert.equal(await readFile(sentinelPath, "utf8"), "must-survive\n");
  assert.deepEqual(await readdir(destination), ["sentinel"]);
});

test("pinned Go producer rejects a symlinked cache root", { skip: process.platform === "win32" }, async (context) => {
  const fixture = await createFixture(context, "cache-symlink");
  const source = await createTinyRepository(fixture.root, "source", "base");
  const target = join(fixture.root, "cache-target");
  const linkedParent = join(fixture.root, "cache-link");
  const cacheRoot = join(linkedParent, "cache");
  await mkdir(target);
  await symlink(target, linkedParent);

  await assert.rejects(ensurePinnedGoProducer({ ...producerOptions(fixture, source), cacheRoot }), /cache root must not traverse symlink/);
  assert.deepEqual(await readdir(target), []);
});

test("pinned Go producer copies its one immutable overlay read despite a source race", { skip: process.platform === "win32" }, async (context) => {
  const fixture = await createFixture(context, "overlay-race");
  const source = await createTinyRepository(fixture.root, "source", "base");
  const overlayPath = join(fixture.root, "overlay.go");
  const originalOverlay = goMain("snapshot");
  const racedOverlay = goMain("raced");
  await writeFile(overlayPath, originalOverlay);
  const wrapperRoot = join(fixture.root, "bin");
  await mkdir(wrapperRoot);
  await writeExecutable(join(wrapperRoot, "git"), `#!/bin/sh
case " $* " in
  *" clone "*) printf '%s' ${shellQuote(racedOverlay)} > ${shellQuote(overlayPath)} ;;
esac
exec ${shellQuote(realGit)} "$@"
`);

  const previousPath = process.env.PATH;
  process.env.PATH = `${wrapperRoot}${delimiter}${previousPath}`;
  try {
    const producer = await ensurePinnedGoProducer({
      ...producerOptions(fixture, source),
      overlayFiles: [{ source: overlayPath, destination: "main.go" }],
    });
    assert.equal(await readFile(overlayPath, "utf8"), racedOverlay);
    assert.equal(run(producer.path).stdout.trim(), "snapshot");
    assert.equal(producer.provenance.request.overlays[0].input.sha256, sha256(Buffer.from(originalOverlay)));
  } finally {
    process.env.PATH = previousPath;
  }
});

test("pinned Go producer detects source mutation performed during build", { skip: process.platform === "win32" }, async (context) => {
  const fixture = await createFixture(context, "build-tamper");
  const source = await createTinyRepository(fixture.root, "source", "base");
  const wrapperRoot = join(fixture.root, "bin");
  await mkdir(wrapperRoot);
  await writeExecutable(join(wrapperRoot, "go"), `#!/bin/sh
if [ "$1" = "build" ]; then
  printf '\n// build-time tamper\n' >> "$PWD/main.go"
fi
exec ${shellQuote(realGo)} "$@"
`);

  const previousPath = process.env.PATH;
  process.env.PATH = `${wrapperRoot}${delimiter}${previousPath}`;
  try {
    await assert.rejects(ensurePinnedGoProducer(producerOptions(fixture, source)), /complete staged source tree changed immediately after Go build/);
  } finally {
    process.env.PATH = previousPath;
  }
});

test("pinned Go producer rejects unsafe output, package, overlay, and build controls", async () => {
  const base = {
    label: "invalid producer",
    sourceRoot: "/unused/source",
    expectedRevision: "0".repeat(40),
    package: ".",
    outputName: "producer",
    cacheRoot: "/unused/cache",
    buildRoot: "/unused/build",
  };
  await assert.rejects(buildProducerRequest({ ...base, outputName: "../producer" }), /safe file name/);
  await assert.rejects(buildProducerRequest({ ...base, package: "example.test/remote" }), /safe module-relative package/);
  await assert.rejects(buildProducerRequest({ ...base, overlayFiles: [{ source: producerPath, destination: ".git/config" }] }), /Git metadata/);
  await assert.rejects(buildProducerRequest({ ...base, buildArguments: ["-toolexec=/host/tool"] }), /controlled by the producer/);
});

async function createFixture(context, name) {
  const root = await mkdtemp(join(realpathSync(tmpdir()), `tsts-pinned-go-${name}-`));
  context.after(async () => {
    await rm(root, { recursive: true, force: true });
  });
  return { root, cacheRoot: join(root, "cache"), buildRoot: join(root, "build") };
}

async function createTinyRepository(root, name, message) {
  const sourceRoot = join(root, name);
  await mkdir(sourceRoot);
  await writeFile(join(sourceRoot, "go.mod"), "module example.test/pinned\n\ngo 1.23\n");
  await writeFile(join(sourceRoot, "main.go"), goMain(message));
  run(realGit, ["init", "--quiet", sourceRoot]);
  run(realGit, ["-C", sourceRoot, "add", "--", "go.mod", "main.go"]);
  run(realGit, [
    "-C",
    sourceRoot,
    "-c",
    "user.name=TSTS Test",
    "-c",
    "user.email=tsts@example.invalid",
    "commit",
    "--quiet",
    "-m",
    "initial",
  ], {
    ...process.env,
    GIT_AUTHOR_DATE: "2024-01-02T03:04:05Z",
    GIT_COMMITTER_DATE: "2024-01-02T03:04:05Z",
  });
  return { sourceRoot, revision: run(realGit, ["-C", sourceRoot, "rev-parse", "HEAD"]).stdout.trim() };
}

function producerOptions(fixture, source) {
  return {
    label: "tiny pinned producer",
    sourceRoot: source.sourceRoot,
    expectedRevision: source.revision,
    package: ".",
    outputName: process.platform === "win32" ? "producer.exe" : "producer",
    cacheRoot: fixture.cacheRoot,
    buildRoot: fixture.buildRoot,
  };
}

function goMain(message) {
  return `package main

import "fmt"

func main() {
	fmt.Println(${JSON.stringify(message)})
}
`;
}

async function writeExecutable(path, content) {
  await writeFile(path, content, { mode: 0o755 });
  await chmod(path, 0o755);
}

function commandPath(command) {
  const locator = process.platform === "win32" ? "where" : "which";
  const result = spawnSync(locator, [command], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`test requires '${command}'`);
  return realpathSync(result.stdout.split(/\r?\n/).find(Boolean));
}

function run(command, arguments_ = [], environment = process.env) {
  const result = spawnSync(command, arguments_, { encoding: "utf8", env: environment, maxBuffer: 64 * 1024 * 1024 });
  if (result.error !== undefined) throw result.error;
  if (result.status !== 0 || result.signal !== null) throw new Error(`${command} ${arguments_.join(" ")} failed: ${result.stderr || result.stdout}`);
  return result;
}

function shellQuote(value) {
  return `'${value.replaceAll("'", `'"'"'`)}'`;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
