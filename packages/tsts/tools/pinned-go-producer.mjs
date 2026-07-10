import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  accessSync,
  closeSync,
  constants,
  existsSync,
  fstatSync,
  lstatSync,
  openSync,
  readFileSync,
  readdirSync,
  realpathSync,
} from "node:fs";
import { chmod, lstat, mkdir, mkdtemp, open, readdir, rm, unlink } from "node:fs/promises";
import { delimiter, dirname, isAbsolute, join, parse, relative, resolve, sep } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

import { canonicalJson, compareUtf8, fingerprint } from "./test-provenance.mjs";

const PRODUCER_SCHEMA_VERSION = 2;
const PUBLICATION_MARKER = ".publishing";
const producerDriverPath = fileURLToPath(import.meta.url);
const nullDevice = process.platform === "win32" ? "NUL" : "/dev/null";
const sourceInputFields = [
  "GoFiles",
  "CgoFiles",
  "CFiles",
  "CXXFiles",
  "MFiles",
  "HFiles",
  "FFiles",
  "SFiles",
  "SwigFiles",
  "SwigCXXFiles",
  "SysoFiles",
  "EmbedFiles",
];
const fixedBuildArgumentPrefixes = [
  "-C",
  "-buildmode",
  "-buildvcs",
  "-compiler",
  "-mod",
  "-modfile",
  "-o",
  "-overlay",
  "-pkgdir",
  "-toolexec",
  "-trimpath",
  "-work",
  "-workfile",
];

class PublishingProducerError extends Error {}

export async function ensurePinnedGoProducer(options) {
  assertProducerOptions(options);
  await ensurePlainDirectory(options.cacheRoot, "pinned producer cache root");
  const prepared = await prepareProducer(options);
  try {
    const producerId = fingerprint(prepared.request, "tsts-pinned-go-producer-v2");
    const destination = join(resolve(options.cacheRoot), producerId);
    const existing = await verifyOrWaitForProducer(destination, prepared.request, producerId, prepared);
    if (existing !== undefined) return existing;

    assertPreparedInputs(prepared, "immediately before Go build");
    await mkdir(prepared.publishRoot, { mode: 0o700 });
    const stagedBinaryPath = join(prepared.publishRoot, options.outputName);
    runChecked(
      prepared.go.executable,
      [...prepared.request.build.arguments, "-o", stagedBinaryPath, prepared.request.build.package],
      prepared.moduleRoot,
      prepared.buildEnvironment,
    );
    assertPreparedInputs(prepared, "immediately after Go build");

    const stagedBinary = readRegularFileSnapshot(stagedBinaryPath, "staged pinned producer binary", { executable: true });
    const buildMetadata = goBinaryMetadata(stagedBinaryPath, prepared.moduleRoot, prepared.buildEnvironment, prepared.go.executable);
    const stagedBinaryAfterMetadata = readRegularFileSnapshot(stagedBinaryPath, "staged pinned producer binary", { executable: true });
    assertSameFileBytes(stagedBinary, stagedBinaryAfterMetadata, "staged pinned producer binary changed during metadata inspection");
    validateBuildMetadata(buildMetadata, prepared.request);

    const provenance = {
      schemaVersion: PRODUCER_SCHEMA_VERSION,
      producerId,
      request: prepared.request,
      binary: { name: options.outputName, ...stagedBinary.identity },
      buildMetadata,
    };
    const provenanceBytes = Buffer.from(`${JSON.stringify(provenance, null, 2)}\n`);
    const published = await publishProducerNoOverwrite(destination, producerId, options.outputName, stagedBinary.bytes, provenanceBytes);
    if (!published) {
      const raceWinner = await waitForPublishedProducer(destination, prepared.request, producerId, prepared);
      if (
        canonicalJson(raceWinner.binary) !== canonicalJson(provenance.binary)
        || canonicalJson(raceWinner.provenance.buildMetadata) !== canonicalJson(buildMetadata)
      ) {
        throw new Error(`concurrent pinned Go producer emitted different bytes for ${options.label}`);
      }
      return raceWinner;
    }
    const verified = verifyProducerDirectory(destination, prepared.request, producerId, prepared);
    if (verified === undefined) throw new Error(`pinned Go producer publication failed for ${options.label}`);
    return verified;
  } finally {
    await removeStagingRoot(prepared.stagingRoot);
  }
}

export async function buildProducerRequest(options) {
  assertProducerOptions(options);
  const prepared = await prepareProducer(options);
  try {
    return prepared.request;
  } finally {
    await removeStagingRoot(prepared.stagingRoot);
  }
}

export function verifyProducerDirectory(directory, request, producerId, prepared) {
  let directoryStat;
  try {
    directoryStat = lstatSync(directory, { bigint: true });
  } catch (error) {
    if (hasErrorCode(error, "ENOENT")) return undefined;
    throw error;
  }
  if (!directoryStat.isDirectory() || directoryStat.isSymbolicLink()) {
    throw new Error(`pinned producer cache must be a regular directory: ${directory}`);
  }
  assertNoSymlinkPath(directory, "pinned producer cache path");

  const entries = readdirSync(directory).sort(compareUtf8);
  if (entries.includes(PUBLICATION_MARKER)) throw new PublishingProducerError(`pinned producer cache publication is incomplete: ${directory}`);
  const provenancePath = join(directory, "provenance.json");
  if (!entries.includes("provenance.json")) {
    if (entries.length === 0 || canonicalJson(entries) === canonicalJson([request.outputName])) {
      throw new PublishingProducerError(`pinned producer cache publication is incomplete: ${directory}`);
    }
    throw new Error(`pinned producer cache is missing provenance: ${directory}`);
  }

  const provenanceSnapshot = readRegularFileSnapshot(provenancePath, "pinned producer provenance", { noSymlinkPath: true });
  let provenance;
  try {
    provenance = JSON.parse(provenanceSnapshot.bytes.toString("utf8"));
  } catch (error) {
    throw new Error(`pinned producer provenance is not valid JSON: ${directory}`, { cause: error });
  }
  assertExactKeys(provenance, ["binary", "buildMetadata", "producerId", "request", "schemaVersion"], "pinned producer provenance");
  assertExactKeys(provenance.binary, ["bytes", "name", "sha256"], "pinned producer binary provenance");
  if (provenanceSnapshot.bytes.compare(Buffer.from(`${JSON.stringify(provenance, null, 2)}\n`)) !== 0) {
    throw new Error(`pinned producer provenance is not in canonical serialized form: ${directory}`);
  }
  if (
    provenance.schemaVersion !== PRODUCER_SCHEMA_VERSION
    || provenance.producerId !== producerId
    || canonicalJson(provenance.request) !== canonicalJson(request)
  ) {
    throw new Error(`pinned producer provenance does not match request: ${directory}`);
  }
  if (provenance.binary.name !== request.outputName || !Number.isSafeInteger(provenance.binary.bytes) || provenance.binary.bytes < 0 || !isSha256(provenance.binary.sha256)) {
    throw new Error(`pinned producer binary provenance is invalid: ${directory}`);
  }

  const expectedEntries = [request.outputName, "provenance.json"].sort(compareUtf8);
  if (canonicalJson(entries) !== canonicalJson(expectedEntries)) throw new Error(`pinned producer cache has unexpected entries: ${directory}`);
  const binaryPath = join(directory, request.outputName);
  const binary = readRegularFileSnapshot(binaryPath, "pinned producer binary", { executable: true, noSymlinkPath: true });
  if (binary.identity.bytes !== provenance.binary.bytes || binary.identity.sha256 !== provenance.binary.sha256) {
    throw new Error(`pinned producer binary digest mismatch: ${binaryPath}`);
  }

  const goEnvironment = prepared?.buildEnvironment ?? fixedGoEnvironment();
  const goExecutable = prepared?.go.executable ?? resolveExecutable("go", goEnvironment);
  const metadata = goBinaryMetadata(binaryPath, directory, goEnvironment, goExecutable);
  const binaryAfterMetadata = readRegularFileSnapshot(binaryPath, "pinned producer binary", { executable: true, noSymlinkPath: true });
  assertSameFileBytes(binary, binaryAfterMetadata, `pinned producer binary changed during verification: ${binaryPath}`);
  if (canonicalJson(metadata) !== canonicalJson(provenance.buildMetadata)) throw new Error(`pinned producer build metadata mismatch: ${binaryPath}`);
  validateBuildMetadata(metadata, request);
  return { path: binaryPath, producerId, provenance, binary: provenance.binary };
}

export function fixedGoEnvironment(base = process.env, isolationRoot) {
  const environment = cleanProcessEnvironment(base);
  if (isolationRoot !== undefined) {
    const absoluteIsolationRoot = resolve(isolationRoot);
    environment.HOME = join(absoluteIsolationRoot, "home");
    environment.XDG_CONFIG_HOME = join(absoluteIsolationRoot, "xdg");
    environment.GOCACHE = join(absoluteIsolationRoot, "go-build-cache");
    environment.GOMODCACHE = join(absoluteIsolationRoot, "go-module-cache");
    environment.GOPATH = join(absoluteIsolationRoot, "gopath");
    environment.GOTMPDIR = join(absoluteIsolationRoot, "go-tmp");
    if (process.platform === "win32") {
      environment.USERPROFILE = environment.HOME;
      environment.TEMP = join(absoluteIsolationRoot, "tmp");
      environment.TMP = environment.TEMP;
    } else {
      environment.TMPDIR = join(absoluteIsolationRoot, "tmp");
    }
  }
  Object.assign(environment, {
    CGO_ENABLED: "0",
    GO111MODULE: "on",
    GOAUTH: "off",
    GOCACHEPROG: "",
    GODEBUG: "",
    GOENV: "off",
    GOEXPERIMENT: "",
    GOFIPS140: "off",
    GOFLAGS: "",
    GOINSECURE: "",
    GONOPROXY: "",
    GONOSUMDB: "",
    GOPRIVATE: "",
    GOPROXY: "https://proxy.golang.org",
    GOSUMDB: "sum.golang.org",
    GOTELEMETRY: "off",
    GOTOOLCHAIN: "local",
    GOVCS: "*:off",
    GOWORK: "off",
    LANG: "C",
    LC_ALL: "C",
    SOURCE_DATE_EPOCH: "0",
    TZ: "UTC",
  });
  return environment;
}

export function goToolchainProvenance(environment) {
  const executable = resolveExecutable("go", environment);
  return inspectGoToolchain(executable, environment).semantic;
}

async function prepareProducer(options) {
  const overlaySnapshots = snapshotOverlays(options.overlayFiles ?? []);
  await ensurePlainDirectory(options.buildRoot, "pinned producer build root");
  const stagingRoot = await mkdtemp(join(resolve(options.buildRoot), "pinned-go-producer-"));
  try {
    const isolationRoot = join(stagingRoot, "isolation");
    await prepareIsolationDirectories(isolationRoot);
    const goEnvironment = fixedGoEnvironment(process.env, isolationRoot);
    const gitEnvironment = fixedGitEnvironment(process.env, isolationRoot);
    const buildEnvironment = { ...goEnvironment, ...gitEnvironment };
    const gitExecutable = resolveExecutable("git", gitEnvironment);
    const goExecutable = resolveExecutable("go", goEnvironment);
    const git = inspectGitTool(gitExecutable, gitEnvironment);
    const go = inspectGoToolchain(goExecutable, goEnvironment);
    const sourceRoot = verifiedSourceRoot(options.sourceRoot, options.buildRoot, options.cacheRoot);
    const source = gitCheckoutProvenanceCanonical(sourceRoot, options.label, gitExecutable, gitEnvironment);
    if (source.revision !== options.expectedRevision) {
      throw new Error(`${options.label} checkout is ${source.revision}, expected ${options.expectedRevision}`);
    }

    const moduleRoot = join(stagingRoot, "module");
    const publishRoot = join(stagingRoot, "publish");
    clonePinnedCheckout(sourceRoot, moduleRoot, source, gitExecutable, gitEnvironment, isolationRoot);
    const trackedEntries = gitTreeEntries(moduleRoot, source.revision, source.objectFormat, gitExecutable, gitEnvironment);
    const cleanTree = verifiedCleanSourceTree(moduleRoot, trackedEntries, source.objectFormat, gitExecutable, gitEnvironment);
    const expectedTree = await materializeOverlays(moduleRoot, cleanTree.records, overlaySnapshots, source.objectFormat);
    assertTreeRecords(moduleRoot, expectedTree, source.objectFormat, "after declared overlays");
    const expectedStatus = gitStatus(moduleRoot, gitExecutable, gitEnvironment);

    const buildArguments = normalizedBuildArguments(options.buildArguments ?? []);
    const graph = inspectBuildGraph(moduleRoot, options.package, buildArguments, goExecutable, buildEnvironment, {
      goModCache: goEnvironment.GOMODCACHE,
      goRoot: go.operational.goRoot,
    });
    assertTreeRecords(moduleRoot, expectedTree, source.objectFormat, "after dependency graph inspection");
    assertStatus(moduleRoot, expectedStatus, gitExecutable, gitEnvironment, "after dependency graph inspection");

    const request = {
      schemaVersion: PRODUCER_SCHEMA_VERSION,
      label: options.label,
      source,
      sourceModule: graph.mainModule,
      producerDriver: readRegularFileSnapshot(producerDriverPath, "pinned Go producer driver").identity,
      overlays: overlaySnapshots.map(({ destination, input }) => ({ destination, input })),
      additionalProvenance: immutableCanonicalCopy(options.additionalProvenance ?? null),
      sourceTree: {
        ...treeIdentity(expectedTree),
        vcsStatus: { ...bytesIdentity(expectedStatus), modified: expectedStatus.length !== 0 },
      },
      git: {
        tool: git.semantic,
        invocation: semanticGitInvocation(),
        environment: semanticEnvironment(gitEnvironment, gitEnvironmentPathKeys()),
      },
      build: {
        package: normalizedPackage(options.package),
        arguments: ["build", "-mod=readonly", "-trimpath", "-buildvcs=true", ...buildArguments],
        environment: semanticEnvironment(buildEnvironment, buildEnvironmentPathKeys()),
        toolchain: go.semantic,
        dependencies: graph.semantic,
      },
      outputName: options.outputName,
    };
    assertRelocationSafeSemanticValue(request, "$request");

    return {
      request,
      stagingRoot,
      moduleRoot,
      publishRoot,
      expectedTree,
      expectedStatus,
      dependencyInputs: graph.inputs,
      toolInputs: deduplicateVerificationInputs([...git.inputs, ...go.inputs]),
      go: { executable: goExecutable },
      git: { executable: gitExecutable },
      buildEnvironment,
      gitEnvironment,
    };
  } catch (error) {
    await removeStagingRoot(stagingRoot);
    throw error;
  }
}

function snapshotOverlays(overlays) {
  return overlays.map((overlay) => {
    const destination = normalizedRelativePath(overlay.destination);
    const snapshot = readRegularFileSnapshot(overlay.source, `pinned producer overlay '${destination}'`, { noSymlinkPath: true });
    return Object.freeze({ destination, input: Object.freeze(snapshot.identity), encodedBytes: snapshot.bytes.toString("base64") });
  }).sort((left, right) => compareUtf8(left.destination, right.destination));
}

function inspectGitTool(executable, environment) {
  const executableIdentity = inspectExecutable(executable, "Git executable");
  const version = runGitCapture(executable, ["--version"], process.cwd(), environment).toString("utf8").trim();
  if (!/^git version \S+/.test(version)) throw new Error(`cannot determine Git version from '${version}'`);
  return { semantic: { executable: executableIdentity.semantic, version }, inputs: executableIdentity.inputs };
}

function inspectGoToolchain(executable, environment) {
  const executableIdentity = inspectExecutable(executable, "Go executable");
  const version = runCapture(executable, ["version"], process.cwd(), environment).trim();
  const valueKeys = [
    "GOOS",
    "GOARCH",
    "GOVERSION",
    "GOTOOLCHAIN",
    "CGO_ENABLED",
    "GOAMD64",
    "GOARM64",
    "GO386",
    "GOARM",
    "GOMIPS",
    "GOMIPS64",
    "GOWASM",
    "GOEXPERIMENT",
    "GOFIPS140",
  ];
  const values = JSON.parse(runCapture(executable, ["env", "-json", ...valueKeys], process.cwd(), environment));
  const operational = JSON.parse(runCapture(executable, ["env", "-json", "GOROOT", "GOTOOLDIR"], process.cwd(), environment));
  const goRoot = realpathSync(operational.GOROOT);
  const toolDirectory = realpathSync(operational.GOTOOLDIR);
  const toolRoot = inspectFlatToolDirectory(toolDirectory, "Go tool directory");
  const compilerPath = join(toolDirectory, executableFileName("compile"));
  const linkerPath = join(toolDirectory, executableFileName("link"));
  const compiler = readRegularFileSnapshot(compilerPath, "Go compiler", { executable: true });
  const linker = readRegularFileSnapshot(linkerPath, "Go linker", { executable: true });
  const support = inspectIdentityTree(join(goRoot, "pkg", "include"), "Go toolchain support files");
  return {
    semantic: {
      go: { executable: executableIdentity.semantic, version },
      compiler: { executable: compiler.identity, version: runCapture(executable, ["tool", "compile", "-V=full"], process.cwd(), environment).trim() },
      linker: { executable: linker.identity, version: runCapture(executable, ["tool", "link", "-V=full"], process.cwd(), environment).trim() },
      tools: toolRoot.semantic,
      support: support.semantic,
      values,
    },
    operational: { goRoot, toolDirectory },
    inputs: deduplicateVerificationInputs([
      ...executableIdentity.inputs,
      { path: compilerPath, identity: compiler.identity, label: "Go compiler" },
      { path: linkerPath, identity: linker.identity, label: "Go linker" },
      ...toolRoot.inputs,
      ...support.inputs,
    ]),
  };
}

function inspectExecutable(executable, label, active = new Set()) {
  const absolute = realpathSync(executable);
  if (active.has(absolute)) throw new Error(`executable launcher cycle at ${absolute}`);
  active.add(absolute);
  const snapshot = readRegularFileSnapshot(absolute, label, { executable: true });
  const firstLine = snapshot.bytes.subarray(0, Math.min(snapshot.bytes.length, 512)).toString("utf8").split(/\r?\n/, 1)[0];
  let launcher = null;
  const shebang = /^#!\s*(\S+)(?:\s+(.+))?$/.exec(firstLine);
  const inputs = [{ path: absolute, identity: snapshot.identity, label }];
  if (shebang !== null && isAbsolute(shebang[1])) {
    const interpreter = inspectExecutable(shebang[1], `${label} interpreter`, active);
    launcher = { executable: interpreter.semantic, argument: shebang[2] ?? null };
    inputs.push(...interpreter.inputs);
  }
  active.delete(absolute);
  return { semantic: { binary: snapshot.identity, launcher }, inputs };
}

function inspectFlatToolDirectory(directory, label) {
  const entries = readdirSync(directory, { withFileTypes: true }).sort((left, right) => compareUtf8(left.name, right.name));
  const records = [];
  const inputs = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    const stat = lstatSync(path);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`${label} contains a non-regular entry: ${entry.name}`);
    const snapshot = readRegularFileSnapshot(path, `${label} '${entry.name}'`);
    records.push({ name: entry.name, ...snapshot.identity });
    inputs.push({ path, identity: snapshot.identity, label: `${label} '${entry.name}'` });
  }
  return {
    semantic: identitySummary(records, "tsts-go-tool-directory-v1"),
    inputs,
  };
}

function inspectIdentityTree(root, label) {
  const records = [];
  const inputs = [];
  collectIdentityTree(realpathSync(root), "", label, records, inputs);
  records.sort((left, right) => compareUtf8(left.path, right.path));
  return { semantic: identitySummary(records, `tsts-identity-tree:${label}:v1`), inputs };
}

function collectIdentityTree(root, relativeDirectory, label, records, inputs) {
  const directory = relativeDirectory === "" ? root : join(root, ...relativeDirectory.split("/"));
  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => compareUtf8(left.name, right.name))) {
    const relativePath = relativeDirectory === "" ? entry.name : `${relativeDirectory}/${entry.name}`;
    const absolutePath = join(directory, entry.name);
    const stat = lstatSync(absolutePath);
    if (stat.isSymbolicLink()) throw new Error(`${label} contains a symlink: ${relativePath}`);
    if (stat.isDirectory()) {
      collectIdentityTree(root, relativePath, label, records, inputs);
    } else if (stat.isFile()) {
      const snapshot = readRegularFileSnapshot(absolutePath, `${label} '${relativePath}'`);
      records.push({ path: relativePath, ...snapshot.identity });
      inputs.push({ path: absolutePath, identity: snapshot.identity, label: `${label} '${relativePath}'` });
    } else {
      throw new Error(`${label} contains an unsupported entry: ${relativePath}`);
    }
  }
}

function gitCheckoutProvenanceCanonical(root, label, executable, environment) {
  const topLevel = realpathSync(runGitCapture(executable, ["-C", root, "rev-parse", "--show-toplevel"], root, environment).toString("utf8").trim());
  if (topLevel !== root) throw new Error(`${label} sourceRoot is not the Git checkout root`);
  const revision = gitText(executable, ["-C", root, "rev-parse", "--verify", "HEAD^{commit}"], root, environment);
  const tree = gitText(executable, ["-C", root, "rev-parse", "--verify", "HEAD^{tree}"], root, environment);
  const objectFormat = gitText(executable, ["-C", root, "rev-parse", "--show-object-format"], root, environment);
  if (!new Set(["sha1", "sha256"]).has(objectFormat)) throw new Error(`${label} uses unsupported Git object format '${objectFormat}'`);
  const commitTime = gitText(executable, ["-C", root, "show", "-s", "--format=%cI", revision], root, environment);
  const status = gitStatus(root, executable, environment);
  if (status.length !== 0) throw new Error(`${label} checkout is dirty: ${status.toString("utf8").split("\0").filter(Boolean).slice(0, 5).join(", ")}`);
  return { revision, tree, objectFormat, commitTime, dirty: false };
}

function clonePinnedCheckout(sourceRoot, moduleRoot, source, executable, environment, isolationRoot) {
  runGitChecked(executable, [
    "clone",
    "--quiet",
    "--no-checkout",
    "--no-hardlinks",
    "--no-tags",
    "--local",
    "--config",
    `core.hooksPath=${nullDevice}`,
    "--config",
    "core.fsmonitor=false",
    "--config",
    "core.untrackedCache=false",
    "--template",
    join(isolationRoot, "git-template"),
    "--",
    sourceRoot,
    moduleRoot,
  ], dirname(moduleRoot), environment);
  runGitChecked(executable, ["-C", moduleRoot, "checkout", "--quiet", "--detach", source.revision], dirname(moduleRoot), environment);
  const gitDirectoryStat = lstatSync(join(moduleRoot, ".git"));
  if (!gitDirectoryStat.isDirectory() || gitDirectoryStat.isSymbolicLink()) throw new Error("staged Git metadata must be a regular directory");
  if (gitText(executable, ["-C", moduleRoot, "rev-parse", "HEAD"], moduleRoot, environment) !== source.revision) {
    throw new Error("staged checkout revision does not match the pinned source");
  }
  if (gitText(executable, ["-C", moduleRoot, "rev-parse", "HEAD^{tree}"], moduleRoot, environment) !== source.tree) {
    throw new Error("staged checkout tree does not match the pinned source");
  }
}

function gitTreeEntries(root, revision, objectFormat, executable, environment) {
  const output = runGitCapture(executable, ["-C", root, "ls-tree", "-r", "-z", "--full-tree", revision], root, environment);
  const records = splitNullRecords(output).map((record) => {
    const tab = record.indexOf(0x09);
    if (tab === -1) throw new Error("invalid Git tree record without a path");
    const header = record.subarray(0, tab).toString("ascii");
    const match = /^(\d+) (\S+) ([0-9a-f]+)$/.exec(header);
    if (match === null) throw new Error(`invalid Git tree record '${header}'`);
    const pathBytes = record.subarray(tab + 1);
    const path = pathBytes.toString("utf8");
    if (Buffer.from(path).compare(pathBytes) !== 0) throw new Error("Git source paths must be valid UTF-8");
    normalizedRelativePath(path);
    if (path.includes("\\")) throw new Error(`Git source path is not portable: '${path}'`);
    if (match[3].length !== (objectFormat === "sha1" ? 40 : 64)) throw new Error(`invalid Git object id for '${path}'`);
    return { mode: match[1], type: match[2], objectId: match[3], path };
  });
  records.sort((left, right) => compareUtf8(left.path, right.path));
  return records;
}

function verifiedCleanSourceTree(root, trackedEntries, objectFormat, executable, environment) {
  const status = gitStatus(root, executable, environment);
  if (status.length !== 0) throw new Error("new staged checkout is unexpectedly dirty");
  const gitlinks = new Map();
  const trackedFiles = new Map();
  for (const entry of trackedEntries) {
    if (entry.mode === "160000" && entry.type === "commit") gitlinks.set(entry.path, entry.objectId);
    else if (new Set(["100644", "100755"]).has(entry.mode) && entry.type === "blob") trackedFiles.set(entry.path, entry);
    else if (entry.mode === "120000") throw new Error(`pinned Go source tree contains unsupported symlink '${entry.path}'`);
    else throw new Error(`pinned Go source tree contains unsupported entry '${entry.path}' (${entry.mode} ${entry.type})`);
  }
  const records = collectSourceTree(root, objectFormat, gitlinks);
  const actualFiles = records.filter((record) => record.kind === "file");
  if (actualFiles.length !== trackedFiles.size) throw new Error("staged source tree does not contain exactly the tracked files");
  for (const record of actualFiles) {
    const tracked = trackedFiles.get(record.path);
    if (tracked === undefined || tracked.objectId !== record.gitObjectId || (tracked.mode === "100755") !== record.executable) {
      throw new Error(`staged source file does not match pinned Git tree: '${record.path}'`);
    }
  }
  return { records };
}

function collectSourceTree(root, objectFormat, gitlinks = new Map()) {
  const records = [];
  collectSourceDirectory(root, "", objectFormat, gitlinks, records);
  for (const [path, revision] of gitlinks) {
    const absolutePath = join(root, ...path.split("/"));
    if (existsSync(absolutePath)) {
      const stat = lstatSync(absolutePath);
      if (!stat.isDirectory() || stat.isSymbolicLink() || readdirSync(absolutePath).length !== 0) {
        throw new Error(`uninitialized Git submodule must be absent or empty: '${path}'`);
      }
    }
    records.push({ path, kind: "gitlink", revision });
  }
  records.sort((left, right) => compareUtf8(left.path, right.path) || compareUtf8(left.kind, right.kind));
  return records;
}

function collectSourceDirectory(root, relativeDirectory, objectFormat, gitlinks, records) {
  const directory = relativeDirectory === "" ? root : join(root, ...relativeDirectory.split("/"));
  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => compareUtf8(left.name, right.name))) {
    if (relativeDirectory === "" && entry.name === ".git") continue;
    const relativePath = relativeDirectory === "" ? entry.name : `${relativeDirectory}/${entry.name}`;
    if (gitlinks.has(relativePath)) continue;
    const absolutePath = join(directory, entry.name);
    const stat = lstatSync(absolutePath);
    if (stat.isSymbolicLink()) throw new Error(`staged source tree contains symlink '${relativePath}'`);
    if (stat.isDirectory()) {
      records.push({ path: relativePath, kind: "directory" });
      collectSourceDirectory(root, relativePath, objectFormat, gitlinks, records);
    } else if (stat.isFile()) {
      const snapshot = readRegularFileSnapshot(absolutePath, `staged source file '${relativePath}'`);
      records.push({
        path: relativePath,
        kind: "file",
        executable: process.platform === "win32" ? false : (stat.mode & 0o111) !== 0,
        ...snapshot.identity,
        gitObjectId: gitBlobObjectId(snapshot.bytes, objectFormat),
      });
    } else {
      throw new Error(`staged source tree contains unsupported entry '${relativePath}'`);
    }
  }
}

async function materializeOverlays(root, cleanRecords, overlays, objectFormat) {
  const expected = new Map(cleanRecords.map((record) => [record.path, record]));
  for (const overlay of overlays) {
    for (const gitlink of cleanRecords.filter((record) => record.kind === "gitlink")) {
      if (overlay.destination === gitlink.path || overlay.destination.startsWith(`${gitlink.path}/`)) {
        throw new Error(`overlay '${overlay.destination}' enters Git submodule '${gitlink.path}'`);
      }
    }
    const existing = expected.get(overlay.destination);
    if (existing?.kind === "directory" || existing?.kind === "gitlink") throw new Error(`overlay destination is not a file: '${overlay.destination}'`);
    const parts = overlay.destination.split("/");
    for (let index = 1; index < parts.length; index += 1) {
      const directoryPath = parts.slice(0, index).join("/");
      const record = expected.get(directoryPath);
      if (record !== undefined && record.kind !== "directory") throw new Error(`overlay parent is not a directory: '${directoryPath}'`);
      expected.set(directoryPath, { path: directoryPath, kind: "directory" });
    }
    const bytes = Buffer.from(overlay.encodedBytes, "base64");
    if (bytes.length !== overlay.input.bytes || sha256(bytes) !== overlay.input.sha256) throw new Error(`immutable overlay snapshot is corrupt: '${overlay.destination}'`);
    const destinationPath = join(root, ...parts);
    await mkdir(dirname(destinationPath), { recursive: true, mode: 0o755 });
    const executable = existing?.kind === "file" ? existing.executable : false;
    await writeVerifiedFile(destinationPath, bytes, executable ? 0o755 : 0o644, existing?.kind === "file");
    expected.set(overlay.destination, {
      path: overlay.destination,
      kind: "file",
      executable,
      ...overlay.input,
      gitObjectId: gitBlobObjectId(bytes, objectFormat),
    });
  }
  return [...expected.values()].sort((left, right) => compareUtf8(left.path, right.path) || compareUtf8(left.kind, right.kind));
}

function inspectBuildGraph(moduleRoot, packageName, buildArguments, goExecutable, environment, roots) {
  const normalized = normalizedPackage(packageName);
  const packageGraphArguments = ["list", "-mod=readonly", "-trimpath", ...buildArguments, "-deps", "-json", normalized];
  const modules = parseJsonStream(runCapture(goExecutable, ["list", "-mod=readonly", "-m", "-json", "all"], moduleRoot, environment));
  const moduleRecords = modules.map(normalizedModuleIdentity).sort(compareModules);
  const mainModules = moduleRecords.filter((module) => module.main);
  if (mainModules.length !== 1) throw new Error(`Go module graph has ${mainModules.length} main modules, expected one`);
  const packages = parseJsonStream(runCapture(goExecutable, packageGraphArguments, moduleRoot, environment));
  runChecked(goExecutable, ["mod", "verify"], moduleRoot, environment, { capture: true });

  const inputCache = new Map();
  const packageRecords = packages.map((packageValue) => normalizedPackageIdentity(packageValue, moduleRoot, roots, inputCache));
  packageRecords.sort((left, right) => compareUtf8(left.importPath, right.importPath));
  const linkedModulesMap = new Map();
  for (const packageRecord of packageRecords) {
    if (packageRecord.module !== null && !packageRecord.module.main) {
      linkedModulesMap.set(canonicalJson(packageRecord.module), packageRecord.module);
    }
  }
  const linkedModules = [...linkedModulesMap.values()].sort(compareModules);
  return {
    mainModule: mainModules[0].path,
    semantic: {
      commands: {
        modules: ["list", "-mod=readonly", "-m", "-json", "all"],
        packages: packageGraphArguments,
        verification: ["mod", "verify"],
      },
      modules: moduleRecords,
      packages: packageRecords,
      linkedModules,
    },
    inputs: [...inputCache.values()],
  };
}

function normalizedModuleIdentity(moduleValue) {
  if (moduleValue === null || typeof moduleValue !== "object" || typeof moduleValue.Path !== "string" || moduleValue.Path === "") {
    throw new Error("Go module graph contains an invalid module");
  }
  let replacement = null;
  if (moduleValue.Replace !== undefined) {
    if (typeof moduleValue.Replace.Version !== "string" || moduleValue.Replace.Version === "") {
      throw new Error(`local Go module replacement is not allowed for '${moduleValue.Path}'`);
    }
    replacement = {
      path: requiredString(moduleValue.Replace.Path, `replacement path for '${moduleValue.Path}'`),
      version: moduleValue.Replace.Version,
      sum: optionalString(moduleValue.Replace.Sum),
      goModSum: optionalString(moduleValue.Replace.GoModSum),
    };
  }
  return {
    path: moduleValue.Path,
    version: optionalString(moduleValue.Version),
    sum: optionalString(moduleValue.Sum),
    goModSum: optionalString(moduleValue.GoModSum),
    goVersion: optionalString(moduleValue.GoVersion),
    toolchain: optionalString(moduleValue.Toolchain),
    main: moduleValue.Main === true,
    replacement,
  };
}

function normalizedPackageIdentity(packageValue, moduleRoot, roots, inputCache) {
  if (packageValue?.Incomplete === true || packageValue?.Error !== undefined || packageValue?.DepsErrors !== undefined) {
    throw new Error(`Go package graph is incomplete for '${packageValue?.ImportPath ?? "<unknown>"}'`);
  }
  const importPath = requiredString(packageValue?.ImportPath, "Go package import path");
  const packageDirectory = realpathSync(requiredString(packageValue.Dir, `directory for Go package '${importPath}'`));
  const mainRoot = realpathSync(moduleRoot);
  const moduleCacheRoot = realpathSync(roots.goModCache);
  const standardRoot = join(realpathSync(roots.goRoot), "src");
  const isMain = isContainedPath(mainRoot, packageDirectory);
  const isModuleDependency = isContainedPath(moduleCacheRoot, packageDirectory);
  const isStandard = packageValue.Standard === true && isContainedPath(standardRoot, packageDirectory);
  if (!isMain && !isModuleDependency && !isStandard) {
    throw new Error(`Go package '${importPath}' resolves outside the staged module, isolated module cache, and bound toolchain`);
  }

  const files = [];
  for (const field of sourceInputFields) {
    const names = packageValue[field] ?? [];
    if (!Array.isArray(names) || names.some((name) => typeof name !== "string")) throw new Error(`Go package '${importPath}' has invalid ${field}`);
    for (const name of [...names].sort(compareUtf8)) {
      const relativePath = normalizedRelativePath(name);
      const absolutePath = resolve(packageDirectory, ...relativePath.split("/"));
      if (!isContainedPath(packageDirectory, absolutePath)) throw new Error(`Go package input escapes package directory: '${importPath}:${name}'`);
      assertNoSymlinkComponents(packageDirectory, absolutePath, `Go package input '${importPath}:${name}'`);
      let input = inputCache.get(absolutePath);
      if (input === undefined) {
        const snapshot = readRegularFileSnapshot(absolutePath, `Go package input '${importPath}:${name}'`);
        input = { path: absolutePath, identity: snapshot.identity, label: `Go package input '${importPath}:${name}'` };
        inputCache.set(absolutePath, input);
      }
      files.push({ kind: field, path: relativePath, ...input.identity });
    }
  }
  files.sort((left, right) => compareUtf8(left.kind, right.kind) || compareUtf8(left.path, right.path));
  const module = packageValue.Module === undefined ? null : normalizedModuleIdentity(packageValue.Module);
  return {
    importPath,
    name: requiredString(packageValue.Name, `name for Go package '${importPath}'`),
    standard: packageValue.Standard === true,
    module,
    imports: sortedStrings(packageValue.Imports ?? [], `imports for Go package '${importPath}'`),
    embedPatterns: sortedStrings(packageValue.EmbedPatterns ?? [], `embed patterns for Go package '${importPath}'`),
    files,
  };
}

function assertPreparedInputs(prepared, phase) {
  assertTreeRecords(prepared.moduleRoot, prepared.expectedTree, prepared.request.source.objectFormat, phase);
  assertStatus(prepared.moduleRoot, prepared.expectedStatus, prepared.git.executable, prepared.gitEnvironment, phase);
  verifyFileInputs(prepared.dependencyInputs, `dependency inputs ${phase}`);
  verifyFileInputs(prepared.toolInputs, `toolchain inputs ${phase}`);
}

function assertTreeRecords(root, expected, objectFormat, phase) {
  const gitlinks = new Map(expected.filter((record) => record.kind === "gitlink").map((record) => [record.path, record.revision]));
  const actual = collectSourceTree(root, objectFormat, gitlinks);
  if (canonicalJson(actual) !== canonicalJson(expected)) throw new Error(`complete staged source tree changed ${phase}`);
}

function assertStatus(root, expected, executable, environment, phase) {
  const actual = gitStatus(root, executable, environment);
  if (actual.compare(expected) !== 0) throw new Error(`staged Git status changed ${phase}`);
}

function verifyFileInputs(inputs, phase) {
  for (const input of inputs) {
    const snapshot = readRegularFileSnapshot(input.path, input.label);
    if (canonicalJson(snapshot.identity) !== canonicalJson(input.identity)) throw new Error(`${phase}: '${input.label}' changed`);
  }
}

function goBinaryMetadata(binary, cwd, environment, goExecutable) {
  const output = runCapture(goExecutable, ["version", "-m", binary], cwd, environment);
  const lines = output.split(/\r?\n/).filter((line) => line !== "");
  const header = lines.shift();
  const separator = header?.lastIndexOf(": ") ?? -1;
  if (header === undefined || separator === -1) throw new Error("cannot parse Go binary version metadata header");
  const metadata = { goVersion: header.slice(separator + 2), path: "", main: null, dependencies: [], settings: {} };
  let currentModule = null;
  for (const line of lines) {
    const columns = line.replace(/^\s+/, "").split("\t");
    const kind = columns.shift();
    if (kind === "path") {
      if (columns.length !== 1 || metadata.path !== "") throw new Error("invalid Go binary package metadata");
      metadata.path = columns[0];
    } else if (kind === "mod" || kind === "dep") {
      const module = buildInfoModule(columns);
      if (kind === "mod") {
        if (metadata.main !== null) throw new Error("duplicate Go binary main module metadata");
        metadata.main = module;
      } else {
        metadata.dependencies.push(module);
      }
      currentModule = module;
    } else if (kind === "=>") {
      if (currentModule === null || currentModule.replacement !== null) throw new Error("invalid Go binary module replacement metadata");
      currentModule.replacement = buildInfoModule(columns);
    } else if (kind === "build") {
      if (columns.length !== 1) throw new Error("invalid Go binary build setting metadata");
      const equals = columns[0].indexOf("=");
      if (equals <= 0) throw new Error(`invalid Go binary build setting '${columns[0]}'`);
      const key = columns[0].slice(0, equals);
      if (Object.hasOwn(metadata.settings, key)) throw new Error(`duplicate Go binary build setting '${key}'`);
      metadata.settings[key] = columns[0].slice(equals + 1);
      currentModule = null;
    } else {
      throw new Error(`unsupported Go binary metadata record '${kind}'`);
    }
  }
  metadata.dependencies.sort(compareModules);
  metadata.settings = Object.fromEntries(Object.entries(metadata.settings).sort(([left], [right]) => compareUtf8(left, right)));
  return metadata;
}

function buildInfoModule(columns) {
  if (columns.length < 1 || columns.length > 3 || columns[0] === "") throw new Error("invalid Go binary module metadata");
  return { path: columns[0], version: columns[1] ?? "", sum: columns[2] ?? "", replacement: null };
}

function validateBuildMetadata(metadata, request) {
  assertExactKeys(metadata, ["dependencies", "goVersion", "main", "path", "settings"], "Go binary metadata");
  const expectedImportPath = request.build.package === "."
    ? request.sourceModule
    : `${request.sourceModule}/${request.build.package.slice(2)}`;
  if (metadata.path !== expectedImportPath) throw new Error(`Go binary package is '${metadata.path}', expected '${expectedImportPath}'`);
  if (metadata.goVersion !== request.build.toolchain.values.GOVERSION) throw new Error("Go binary version does not match the bound Go toolchain");
  if (metadata.main?.path !== request.sourceModule) throw new Error("Go binary main module does not match the staged source module");
  const expectedDependencies = request.build.dependencies.linkedModules.map((module) => ({
    path: module.path,
    version: module.version,
    sum: module.sum,
    replacement: module.replacement === null ? null : {
      path: module.replacement.path,
      version: module.replacement.version,
      sum: module.replacement.sum,
      replacement: null,
    },
  })).sort(compareModules);
  if (canonicalJson(metadata.dependencies) !== canonicalJson(expectedDependencies)) throw new Error("Go binary dependencies do not match the bound package graph");
  const settings = metadata.settings;
  if (settings["-buildmode"] !== "exe" || settings["-compiler"] !== "gc") throw new Error("Go binary was not built by the bound gc executable toolchain");
  if (settings["-trimpath"] !== "true") throw new Error("Go binary is missing -trimpath metadata");
  for (const key of ["CGO_ENABLED", "GOOS", "GOARCH", "GOAMD64", "GOARM64", "GO386", "GOARM", "GOMIPS", "GOMIPS64", "GOWASM"]) {
    const expected = request.build.toolchain.values[key];
    if (expected !== "" && settings[key] !== expected) throw new Error(`Go binary setting '${key}' does not match the bound toolchain`);
  }
  if (
    settings.vcs !== "git"
    || settings["vcs.revision"] !== request.source.revision
    || settings["vcs.time"] !== request.source.commitTime
    || settings["vcs.modified"] !== String(request.sourceTree.vcsStatus.modified)
  ) {
    throw new Error("Go binary VCS metadata does not prove the pinned staged source tree");
  }
}

async function publishProducerNoOverwrite(destination, producerId, outputName, binaryBytes, provenanceBytes) {
  try {
    await mkdir(destination, { mode: 0o700 });
  } catch (error) {
    if (hasErrorCode(error, "EEXIST")) return false;
    throw error;
  }
  assertNoSymlinkPath(destination, "pinned producer publication path");
  await writeVerifiedFile(join(destination, PUBLICATION_MARKER), Buffer.from(`${producerId}\n`), 0o600, false);
  await writeVerifiedFile(join(destination, outputName), binaryBytes, 0o755, false);
  await writeVerifiedFile(join(destination, "provenance.json"), provenanceBytes, 0o600, false);
  await unlink(join(destination, PUBLICATION_MARKER));
  await syncDirectory(destination);
  await syncDirectory(dirname(destination));
  return true;
}

async function verifyOrWaitForProducer(directory, request, producerId, prepared) {
  try {
    return verifyProducerDirectory(directory, request, producerId, prepared);
  } catch (error) {
    if (!(error instanceof PublishingProducerError)) throw error;
    return await waitForPublishedProducer(directory, request, producerId, prepared);
  }
}

async function waitForPublishedProducer(directory, request, producerId, prepared) {
  let lastError;
  for (let attempt = 0; attempt < 200; attempt += 1) {
    try {
      const verified = verifyProducerDirectory(directory, request, producerId, prepared);
      if (verified !== undefined) return verified;
    } catch (error) {
      if (!(error instanceof PublishingProducerError)) throw error;
      lastError = error;
    }
    await delay(10);
  }
  throw new Error(`timed out waiting for pinned producer publication: ${directory}`, { cause: lastError });
}

async function writeVerifiedFile(path, bytes, mode, overwrite) {
  let pathStat;
  if (overwrite) {
    pathStat = await lstat(path, { bigint: true });
    if (!pathStat.isFile() || pathStat.isSymbolicLink()) throw new Error(`refusing to overwrite non-regular file: ${path}`);
  }
  const noFollow = constants.O_NOFOLLOW ?? 0;
  const flags = overwrite
    ? constants.O_RDWR | constants.O_TRUNC | noFollow
    : constants.O_RDWR | constants.O_CREAT | constants.O_EXCL | noFollow;
  const handle = await open(path, flags, mode);
  try {
    const openedStat = await handle.stat({ bigint: true });
    if (!openedStat.isFile() || (pathStat !== undefined && !sameInode(pathStat, openedStat))) throw new Error(`opened file identity mismatch: ${path}`);
    let offset = 0;
    while (offset < bytes.length) {
      const { bytesWritten } = await handle.write(bytes, offset, bytes.length - offset, offset);
      if (bytesWritten <= 0) throw new Error(`short write while creating ${path}`);
      offset += bytesWritten;
    }
    await handle.truncate(bytes.length);
    await handle.chmod(mode);
    await handle.sync();
    const verification = Buffer.alloc(bytes.length);
    offset = 0;
    while (offset < verification.length) {
      const { bytesRead } = await handle.read(verification, offset, verification.length - offset, offset);
      if (bytesRead <= 0) throw new Error(`short read while verifying ${path}`);
      offset += bytesRead;
    }
    const finalStat = await handle.stat({ bigint: true });
    if (finalStat.size !== BigInt(bytes.length) || verification.compare(bytes) !== 0) throw new Error(`written bytes do not verify exactly: ${path}`);
  } finally {
    await handle.close();
  }
  const finalPathStat = await lstat(path, { bigint: true });
  if (!finalPathStat.isFile() || finalPathStat.isSymbolicLink()) throw new Error(`written path is not a regular file: ${path}`);
}

function readRegularFileSnapshot(path, label, options = {}) {
  if (options.noSymlinkPath === true) assertNoSymlinkPath(path, label);
  const pathStatBefore = lstatSync(path, { bigint: true });
  if (!pathStatBefore.isFile() || pathStatBefore.isSymbolicLink()) throw new Error(`${label} must be a regular non-symlink file: ${path}`);
  if (options.executable === true && process.platform !== "win32" && (pathStatBefore.mode & 0o111n) === 0n) {
    throw new Error(`${label} must be executable: ${path}`);
  }
  const descriptor = openSync(path, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0));
  try {
    const openedStatBefore = fstatSync(descriptor, { bigint: true });
    if (!openedStatBefore.isFile() || !sameInode(pathStatBefore, openedStatBefore)) throw new Error(`${label} changed while it was opened: ${path}`);
    const bytes = readFileSync(descriptor);
    const openedStatAfter = fstatSync(descriptor, { bigint: true });
    const pathStatAfter = lstatSync(path, { bigint: true });
    if (
      !sameStableStat(openedStatBefore, openedStatAfter)
      || !sameInode(openedStatAfter, pathStatAfter)
      || openedStatAfter.size !== BigInt(bytes.length)
      || pathStatAfter.isSymbolicLink()
    ) {
      throw new Error(`${label} changed while it was read: ${path}`);
    }
    return { bytes, identity: bytesIdentity(bytes) };
  } finally {
    closeSync(descriptor);
  }
}

function fixedGitEnvironment(base, isolationRoot) {
  const environment = cleanProcessEnvironment(base);
  const absoluteIsolationRoot = resolve(isolationRoot);
  Object.assign(environment, {
    HOME: join(absoluteIsolationRoot, "home"),
    XDG_CONFIG_HOME: join(absoluteIsolationRoot, "xdg"),
    GIT_ASKPASS: "",
    GIT_ATTR_NOSYSTEM: "1",
    GIT_CONFIG_COUNT: "0",
    GIT_CONFIG_GLOBAL: nullDevice,
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_SYSTEM: nullDevice,
    GIT_NO_REPLACE_OBJECTS: "1",
    GIT_OPTIONAL_LOCKS: "0",
    GIT_SSH_COMMAND: "false",
    GIT_TEMPLATE_DIR: join(absoluteIsolationRoot, "git-template"),
    GIT_TERMINAL_PROMPT: "0",
    LANG: "C",
    LC_ALL: "C",
    SSH_ASKPASS: "",
    TZ: "UTC",
  });
  if (process.platform === "win32") {
    environment.USERPROFILE = environment.HOME;
    environment.TEMP = join(absoluteIsolationRoot, "tmp");
    environment.TMP = environment.TEMP;
  } else {
    environment.TMPDIR = join(absoluteIsolationRoot, "tmp");
  }
  return environment;
}

function cleanProcessEnvironment(base) {
  const inherited = process.platform === "win32" ? ["PATH", "PATHEXT", "SystemRoot", "ComSpec"] : ["PATH"];
  const environment = {};
  for (const key of inherited) {
    if (base[key] !== undefined) environment[key] = base[key];
  }
  return environment;
}

function semanticGitInvocation() {
  return {
    replaceObjects: false,
    systemConfig: false,
    globalConfig: false,
    hooks: false,
    fsmonitor: false,
    untrackedCache: false,
    credentials: false,
    localFileProtocol: true,
  };
}

function canonicalGitArguments(arguments_) {
  return [
    "--no-replace-objects",
    "-c",
    `core.hooksPath=${nullDevice}`,
    "-c",
    "core.fsmonitor=false",
    "-c",
    "core.untrackedCache=false",
    "-c",
    `core.attributesFile=${nullDevice}`,
    "-c",
    "credential.helper=",
    "-c",
    "protocol.file.allow=always",
    "-c",
    "submodule.recurse=false",
    ...arguments_,
  ];
}

function runGitChecked(executable, arguments_, cwd, environment) {
  runChecked(executable, canonicalGitArguments(arguments_), cwd, environment);
}

function runGitCapture(executable, arguments_, cwd, environment) {
  return runCaptureBuffer(executable, canonicalGitArguments(arguments_), cwd, environment);
}

function gitText(executable, arguments_, cwd, environment) {
  return runGitCapture(executable, arguments_, cwd, environment).toString("utf8").trim();
}

function gitStatus(root, executable, environment) {
  return runGitCapture(executable, ["-C", root, "status", "--porcelain=v1", "-z", "--untracked-files=all", "--ignore-submodules=none"], root, environment);
}

function semanticEnvironment(environment, pathKeys) {
  const replacements = new Set(pathKeys);
  return Object.fromEntries(Object.keys(environment).sort(compareUtf8).filter((key) => key !== "PATH" && !new Set(["PATHEXT", "SystemRoot", "ComSpec"]).has(key)).map((key) => [
    key,
    replacements.has(key) ? `<isolated:${key.toLowerCase()}>` : environment[key],
  ]));
}

function buildEnvironmentPathKeys() {
  return [...gitEnvironmentPathKeys(), "GOCACHE", "GOMODCACHE", "GOPATH", "GOTMPDIR"];
}

function gitEnvironmentPathKeys() {
  return ["GIT_CONFIG_GLOBAL", "GIT_CONFIG_SYSTEM", "GIT_TEMPLATE_DIR", "HOME", "TMP", "TEMP", "TMPDIR", "USERPROFILE", "XDG_CONFIG_HOME"];
}

async function prepareIsolationDirectories(root) {
  for (const path of [
    root,
    join(root, "home"),
    join(root, "xdg"),
    join(root, "go-build-cache"),
    join(root, "go-module-cache"),
    join(root, "gopath"),
    join(root, "go-tmp"),
    join(root, "tmp"),
    join(root, "git-template"),
  ]) {
    await mkdir(path, { recursive: true, mode: 0o700 });
    const stat = await lstat(path);
    if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error(`isolated producer path must be a regular directory: ${path}`);
  }
}

async function ensurePlainDirectory(path, label) {
  assertNoSymlinkPath(path, label, true);
  await mkdir(path, { recursive: true, mode: 0o700 });
  const stat = await lstat(path);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error(`${label} must be a regular non-symlink directory: ${path}`);
  assertNoSymlinkPath(path, label);
}

function verifiedSourceRoot(sourceRoot, buildRoot, cacheRoot) {
  assertNoSymlinkPath(sourceRoot, "pinned producer sourceRoot");
  const stat = lstatSync(sourceRoot);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error(`pinned producer sourceRoot must be a regular non-symlink directory: ${sourceRoot}`);
  const root = realpathSync(sourceRoot);
  for (const [label, mutableRoot] of [["buildRoot", buildRoot], ["cacheRoot", cacheRoot]]) {
    if (isContainedPath(root, resolve(mutableRoot))) throw new Error(`pinned producer ${label} must not be inside sourceRoot`);
  }
  return root;
}

function assertProducerOptions(options) {
  if (options === null || typeof options !== "object" || Array.isArray(options)) throw new Error("pinned Go producer options must be an object");
  for (const key of ["label", "sourceRoot", "expectedRevision", "package", "outputName", "cacheRoot", "buildRoot"]) {
    if (typeof options[key] !== "string" || options[key] === "") throw new Error(`pinned Go producer option '${key}' must be non-empty`);
  }
  if (!/^(?:[0-9a-f]{40}|[0-9a-f]{64})$/.test(options.expectedRevision)) throw new Error("pinned Go producer expectedRevision must be a full object id");
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(options.outputName) || new Set(["provenance.json", PUBLICATION_MARKER]).has(options.outputName.toLowerCase())) {
    throw new Error("pinned Go producer outputName must be a safe file name");
  }
  normalizedPackage(options.package);
  if (options.overlayFiles !== undefined && !Array.isArray(options.overlayFiles)) throw new Error("pinned Go producer overlayFiles must be an array");
  const destinations = new Set();
  for (const overlay of options.overlayFiles ?? []) {
    if (typeof overlay?.source !== "string" || typeof overlay?.destination !== "string") throw new Error("pinned Go producer overlays require source and destination");
    const destination = normalizedRelativePath(overlay.destination);
    if (destination.split("/")[0].toLowerCase() === ".git") throw new Error(`overlay destination enters Git metadata: '${destination}'`);
    if (destinations.has(destination)) throw new Error(`duplicate pinned Go producer overlay '${destination}'`);
    destinations.add(destination);
  }
  if (options.buildArguments !== undefined && !Array.isArray(options.buildArguments)) throw new Error("pinned Go producer buildArguments must be an array");
  normalizedBuildArguments(options.buildArguments ?? []);
  immutableCanonicalCopy(options.additionalProvenance ?? null);
}

function normalizedBuildArguments(arguments_) {
  return arguments_.map((argument) => {
    if (typeof argument !== "string" || argument === "" || argument.includes("\0") || argument.includes("\n") || argument.includes("\r")) {
      throw new Error("pinned Go producer build arguments must be non-empty single-line strings");
    }
    const flagName = argument.split("=", 1)[0];
    if (fixedBuildArgumentPrefixes.some((prefix) => flagName === prefix)) throw new Error(`pinned Go producer build argument is controlled by the producer: '${argument}'`);
    if (containsAbsolutePath(argument)) throw new Error(`pinned Go producer build argument contains an absolute path: '${argument}'`);
    if (
      !new Set(["-a", "-v", "-x"]).has(argument)
      && !/^-p=[1-9][0-9]*$/.test(argument)
      && !/^-tags=[a-zA-Z0-9_., ]+$/.test(argument)
    ) {
      throw new Error(`unsupported pinned Go producer build argument '${argument}'`);
    }
    return argument;
  });
}

function normalizedPackage(value) {
  if (value === ".") return value;
  if (!value.startsWith("./") || value.includes("...") || value.includes("\\")) throw new Error("pinned Go producer package must be '.' or one safe module-relative package");
  normalizedRelativePath(value.slice(2));
  return value;
}

function normalizedRelativePath(value) {
  const normalized = value.replaceAll("\\", "/");
  if (
    normalized === ""
    || normalized.startsWith("/")
    || /^[a-zA-Z]:/.test(normalized)
    || normalized.split("/").some((part) => part === "" || part === "." || part === "..")
  ) {
    throw new Error(`unsafe relative path '${value}'`);
  }
  return normalized;
}

function resolveExecutable(command, environment) {
  if (command.includes("/") || command.includes("\\")) return realpathSync(command);
  const pathValue = environment.PATH;
  if (typeof pathValue !== "string" || pathValue === "") throw new Error(`cannot resolve executable '${command}' without PATH`);
  const extensions = process.platform === "win32"
    ? (environment.PATHEXT ?? ".COM;.EXE;.BAT;.CMD").split(";").map((extension) => extension.toLowerCase())
    : [""];
  for (const directory of pathValue.split(delimiter)) {
    if (directory === "") continue;
    for (const extension of extensions) {
      const candidate = join(directory, process.platform === "win32" ? `${command}${extension}` : command);
      try {
        accessSync(candidate, constants.X_OK);
        const stat = lstatSync(candidate);
        if (stat.isFile() || stat.isSymbolicLink()) return realpathSync(candidate);
      } catch (error) {
        if (!hasErrorCode(error, "ENOENT") && !hasErrorCode(error, "EACCES")) throw error;
      }
    }
  }
  throw new Error(`cannot resolve executable '${command}'`);
}

function runChecked(command, arguments_, cwd, environment, options = {}) {
  const result = spawnSync(command, arguments_, {
    cwd,
    env: environment,
    encoding: options.capture === true ? "utf8" : undefined,
    stdio: options.capture === true ? "pipe" : "inherit",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error !== undefined) throw result.error;
  if (result.status !== 0 || result.signal !== null) {
    const details = options.capture === true ? `: ${result.stderr || result.stdout}` : "";
    throw new Error(`${command} ${arguments_.join(" ")} failed${details}`);
  }
  return result.stdout;
}

function runCapture(command, arguments_, cwd, environment) {
  return runCaptureBuffer(command, arguments_, cwd, environment).toString("utf8");
}

function runCaptureBuffer(command, arguments_, cwd, environment) {
  const result = spawnSync(command, arguments_, { cwd, env: environment, encoding: null, maxBuffer: 64 * 1024 * 1024 });
  if (result.error !== undefined) throw result.error;
  if (result.status !== 0 || result.signal !== null) {
    throw new Error(`${command} ${arguments_.join(" ")} failed: ${(result.stderr ?? Buffer.alloc(0)).toString("utf8")}`);
  }
  return result.stdout;
}

function parseJsonStream(output) {
  const values = [];
  let start = -1;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = 0; index < output.length; index += 1) {
    const character = output[index];
    if (start === -1) {
      if (/\s/.test(character)) continue;
      if (character !== "{") throw new Error("Go JSON stream contains a non-object value");
      start = index;
      depth = 1;
      continue;
    }
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === "\"") inString = false;
    } else if (character === "\"") {
      inString = true;
    } else if (character === "{") {
      depth += 1;
    } else if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        values.push(JSON.parse(output.slice(start, index + 1)));
        start = -1;
      }
    }
  }
  if (start !== -1 || inString) throw new Error("Go JSON stream ended inside an object");
  return values;
}

function treeIdentity(records) {
  return {
    fileCount: records.filter((record) => record.kind === "file").length,
    directoryCount: records.filter((record) => record.kind === "directory").length,
    gitlinkCount: records.filter((record) => record.kind === "gitlink").length,
    bytes: records.reduce((total, record) => total + (record.bytes ?? 0), 0),
    digest: fingerprint(records, "tsts-pinned-go-staged-tree-v1"),
  };
}

function identitySummary(records, domain) {
  return {
    fileCount: records.length,
    bytes: records.reduce((total, record) => total + record.bytes, 0),
    digest: fingerprint(records, domain),
  };
}

function bytesIdentity(bytes) {
  return { bytes: bytes.length, sha256: sha256(bytes) };
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function gitBlobObjectId(bytes, objectFormat) {
  return createHash(objectFormat).update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
}

function assertSameFileBytes(left, right, message) {
  if (canonicalJson(left.identity) !== canonicalJson(right.identity) || left.bytes.compare(right.bytes) !== 0) throw new Error(message);
}

function sameInode(left, right) {
  return left.dev === right.dev && left.ino === right.ino;
}

function sameStableStat(left, right) {
  return sameInode(left, right)
    && left.size === right.size
    && left.mtimeNs === right.mtimeNs
    && left.ctimeNs === right.ctimeNs;
}

function splitNullRecords(buffer) {
  const records = [];
  let start = 0;
  for (let index = 0; index < buffer.length; index += 1) {
    if (buffer[index] === 0) {
      if (index > start) records.push(buffer.subarray(start, index));
      start = index + 1;
    }
  }
  if (start !== buffer.length) throw new Error("NUL-delimited Git output is not terminated");
  return records;
}

function immutableCanonicalCopy(value) {
  return JSON.parse(canonicalJson(value));
}

function assertRelocationSafeSemanticValue(value, location) {
  if (typeof value === "string") {
    if (containsAbsolutePath(value)) throw new Error(`host-specific absolute path is not allowed in producer request at ${location}`);
    return;
  }
  if (Array.isArray(value)) {
    for (const [index, entry] of value.entries()) assertRelocationSafeSemanticValue(entry, `${location}[${index}]`);
  } else if (value !== null && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) assertRelocationSafeSemanticValue(entry, `${location}.${key}`);
  }
}

function containsAbsolutePath(value) {
  return value.split(/[=,;\s()[\]{}'"`]+/).some(looksLikeAbsolutePath);
}

function looksLikeAbsolutePath(value) {
  return value.startsWith("/") || /^[a-zA-Z]:[\\/]/.test(value) || value.startsWith("\\\\") || value.startsWith("file://");
}

function assertNoSymlinkComponents(root, path, label) {
  const relativePath = relative(root, path);
  let current = root;
  const rootStat = lstatSync(root);
  if (rootStat.isSymbolicLink() || !rootStat.isDirectory()) throw new Error(`${label} package root is not a regular directory`);
  for (const part of relativePath.split(sep)) {
    current = join(current, part);
    const stat = lstatSync(current);
    if (stat.isSymbolicLink()) throw new Error(`${label} traverses symlink '${current}'`);
  }
}

function assertNoSymlinkPath(path, label, allowMissingTail = false) {
  const absolute = resolve(path);
  const root = parse(absolute).root;
  let current = root;
  const remainder = absolute.slice(root.length).split(sep).filter(Boolean);
  for (const part of remainder) {
    current = join(current, part);
    let stat;
    try {
      stat = lstatSync(current);
    } catch (error) {
      if (allowMissingTail && hasErrorCode(error, "ENOENT")) return;
      throw error;
    }
    if (stat.isSymbolicLink()) throw new Error(`${label} must not traverse symlink '${current}'`);
  }
}

function isContainedPath(root, candidate) {
  const relation = relative(root, candidate);
  return relation === "" || (!relation.startsWith(`..${sep}`) && relation !== ".." && !isAbsolute(relation));
}

function deduplicateVerificationInputs(inputs) {
  const result = new Map();
  for (const input of inputs) {
    const existing = result.get(input.path);
    if (existing !== undefined && canonicalJson(existing.identity) !== canonicalJson(input.identity)) throw new Error(`conflicting identities for '${input.path}'`);
    if (existing === undefined) result.set(input.path, input);
  }
  return [...result.values()].sort((left, right) => compareUtf8(left.path, right.path));
}

function normalizedModuleForComparison(module) {
  return `${module.path}\0${module.version ?? ""}\0${module.sum ?? ""}`;
}

function compareModules(left, right) {
  return compareUtf8(normalizedModuleForComparison(left), normalizedModuleForComparison(right));
}

function sortedStrings(values, label) {
  if (!Array.isArray(values) || values.some((value) => typeof value !== "string")) throw new Error(`${label} must be strings`);
  return [...values].sort(compareUtf8);
}

function requiredString(value, label) {
  if (typeof value !== "string" || value === "") throw new Error(`${label} must be non-empty`);
  return value;
}

function optionalString(value) {
  if (value === undefined) return "";
  if (typeof value !== "string") throw new Error("optional Go graph value must be a string");
  return value;
}

function executableFileName(name) {
  return process.platform === "win32" ? `${name}.exe` : name;
}

function assertExactKeys(value, expected, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const keys = Object.keys(value).sort(compareUtf8);
  if (canonicalJson(keys) !== canonicalJson([...expected].sort(compareUtf8))) throw new Error(`${label} has invalid keys`);
}

function isSha256(value) {
  return typeof value === "string" && /^[0-9a-f]{64}$/.test(value);
}

function hasErrorCode(error, code) {
  return error instanceof Error && "code" in error && error.code === code;
}

async function syncDirectory(directory) {
  let handle;
  try {
    handle = await open(directory, constants.O_RDONLY);
    await handle.sync();
  } catch (error) {
    if (!hasErrorCode(error, "EINVAL") && !hasErrorCode(error, "ENOTSUP") && !hasErrorCode(error, "EBADF")) throw error;
  } finally {
    await handle?.close();
  }
}

async function removeStagingRoot(stagingRoot) {
  await makeTreeRemovable(stagingRoot);
  await rm(stagingRoot, { recursive: true, force: true, maxRetries: 3, retryDelay: 20 });
}

async function makeTreeRemovable(path) {
  let stat;
  try {
    stat = await lstat(path);
  } catch (error) {
    if (hasErrorCode(error, "ENOENT")) return;
    throw error;
  }
  if (stat.isSymbolicLink()) return;
  if (stat.isDirectory()) {
    await chmod(path, 0o700);
    for (const entry of await readdir(path)) await makeTreeRemovable(join(path, entry));
  } else {
    await chmod(path, 0o600);
  }
}
