import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { arch, cpus, endianness, freemem, hostname, loadavg, platform, release, totalmem, type, uptime } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { ensurePinnedGoProducer } from "../pinned-go-producer.mjs";
import { canonicalJson, executableProvenance, fingerprint, hashInputRoots } from "../test-provenance.mjs";
import { loadAndVerifyTsgoSourcePin } from "../tsgo-source-pin.mjs";
import {
  ensureTstsBuild,
  preparedTstsBuildEvidence,
  tstsBuildRequest,
  verifyTstsBuild,
} from "../tsts-build.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(here, "../..");
const repoRoot = resolve(packageRoot, "../..");
const vendorRoot = join(packageRoot, "_vendor/typescript-go");
const timeExecutable = "/usr/bin/time";
const sourcePinPath = join(packageRoot, "schema/tsgo/source-pin.json");
const startupSensitiveVariables = Object.freeze([
  "LD_LIBRARY_PATH",
  "LD_PRELOAD",
  "NODE_COMPILE_CACHE",
  "NODE_DEBUG",
  "NODE_DEBUG_NATIVE",
  "NODE_EXTRA_CA_CERTS",
  "NODE_ICU_DATA",
  "NODE_OPTIONS",
  "NODE_PATH",
  "NODE_PRESERVE_SYMLINKS",
  "NODE_PRESERVE_SYMLINKS_MAIN",
  "NODE_REDIRECT_WARNINGS",
  "NODE_V8_COVERAGE",
  "OPENSSL_CONF",
]);

export function repositoryPaths() {
  return { here, packageRoot, repoRoot, vendorRoot, timeExecutable };
}

export function assertCanonicalBenchmarkProcess() {
  if (process.platform !== "linux") throw new Error("the sealed performance policy currently requires Linux and GNU /usr/bin/time");
  if (!existsSync(timeExecutable)) throw new Error(`required timing executable is missing: ${timeExecutable}`);
  assertUninjectedNodeProcess();
}

export function assertUninjectedNodeProcess({ execArgv = process.execArgv, environment = process.env } = {}) {
  if (execArgv.length !== 0) throw new Error(`performance harness refuses startup execArgv: ${execArgv.join(" ")}`);
  for (const key of [...startupSensitiveVariables, "TSGO_BIN", "TSC_BIN", "TSC_EVIDENCE_ROOT"]) {
    if ((environment[key] ?? "") !== "") throw new Error(`performance harness refuses ambient ${key}`);
  }
}

export function canonicalBenchmarkEnvironment(runtimeRoot) {
  const absoluteRoot = resolve(runtimeRoot);
  const actual = {
    HOME: join(absoluteRoot, "home"),
    LANG: "C.UTF-8",
    LC_ALL: "C.UTF-8",
    NODE_OPTIONS: "",
    NODE_PATH: "",
    NO_COLOR: "1",
    SOURCE_DATE_EPOCH: "0",
    TMPDIR: join(absoluteRoot, "tmp"),
    TZ: "UTC",
    XDG_CACHE_HOME: join(absoluteRoot, "xdg-cache"),
    XDG_CONFIG_HOME: join(absoluteRoot, "xdg-config"),
  };
  for (const directory of [actual.HOME, actual.TMPDIR, actual.XDG_CACHE_HOME, actual.XDG_CONFIG_HOME]) mkdirSync(directory, { recursive: true, mode: 0o700 });
  const recorded = Object.fromEntries(Object.entries(actual).map(([key, value]) => [key, value.startsWith(`${absoluteRoot}${sep}`) ? `<benchmark-runtime>/${relative(absoluteRoot, value).split(sep).join("/")}` : value]));
  return { actual, recorded };
}

export function collectHostEvidence(recordedEnvironment) {
  const timeVersion = spawnSync(timeExecutable, ["--version"], { encoding: "utf8", env: { LANG: "C", LC_ALL: "C", TZ: "UTC" } });
  if (timeVersion.error !== undefined || timeVersion.status !== 0 || timeVersion.signal !== null) throw new Error("could not identify GNU time executable");
  const versionText = String(timeVersion.stdout || timeVersion.stderr).trim();
  if (!versionText.startsWith("time (GNU Time)")) throw new Error(`unsupported timing implementation: ${versionText.split(/\r?\n/, 1)[0] ?? "unknown"}`);
  const cpuEntries = cpus();
  const modelCounts = new Map();
  for (const cpu of cpuEntries) modelCounts.set(cpu.model, (modelCounts.get(cpu.model) ?? 0) + 1);
  const osReleaseEvidence = existsSync("/etc/os-release") ? hashInputRoots([{ label: "os-release", path: "/etc/os-release", symlinkPolicy: "resolved-contained" }]) : null;
  const compatibility = {
    schemaVersion: 1,
    hostname: hostname(),
    platform: platform(),
    architecture: arch(),
    operatingSystem: { type: type(), release: release(), osReleaseEvidence },
    cpu: { logicalCount: cpuEntries.length, models: [...modelCounts].sort(([left], [right]) => Buffer.compare(Buffer.from(left), Buffer.from(right))).map(([model, count]) => ({ model, count })) },
    totalMemoryBytes: totalmem(),
    endianness: endianness(),
    node: {
      version: process.version,
      versions: process.versions,
      executable: executableProvenance(process.execPath),
      execArgv: [...process.execArgv],
      startupEnvironment: Object.fromEntries(startupSensitiveVariables.map((key) => [key, process.env[key] ?? ""])),
    },
    timing: { logicalPath: timeExecutable, version: versionText, executable: executableProvenance(timeExecutable) },
    environment: recordedEnvironment,
  };
  return {
    compatibility,
    compatibilityDigest: fingerprint(compatibility, "tsts-performance-host-v1"),
    observed: hostObservation(cpuEntries),
  };
}

export function hostObservation(cpuEntries = cpus()) {
  return {
    capturedAt: new Date().toISOString(),
    freeMemoryBytes: freemem(),
    loadAverage: loadavg(),
    uptimeSeconds: uptime(),
    cpuSpeedsMHz: cpuEntries.map((cpu) => cpu.speed),
  };
}

export function collectHarnessEvidence() {
  const inputs = hashInputRoots([
    { label: "performance-driver", path: fileURLToPath(new URL("./bench.mjs", import.meta.url)) },
    { label: "performance-core", path: fileURLToPath(new URL("./benchmark-core.mjs", import.meta.url)) },
    { label: "performance-workload", path: fileURLToPath(new URL("./benchmark-workload.mjs", import.meta.url)) },
    { label: "performance-evidence", path: fileURLToPath(import.meta.url) },
    { label: "performance-policy-loader", path: fileURLToPath(new URL("./performance-policy.mjs", import.meta.url)) },
    { label: "performance-report", path: fileURLToPath(new URL("./performance-report.mjs", import.meta.url)) },
    { label: "performance-attributor", path: fileURLToPath(new URL("./attribute.mjs", import.meta.url)) },
    { label: "provenance-helper", path: fileURLToPath(new URL("../test-provenance.mjs", import.meta.url)) },
    { label: "sealed-evidence-helper", path: fileURLToPath(new URL("../sealed-evidence.mjs", import.meta.url)) },
    { label: "prepared-build-helper", path: fileURLToPath(new URL("../tsts-build.mjs", import.meta.url)) },
    { label: "pinned-go-producer-helper", path: fileURLToPath(new URL("../pinned-go-producer.mjs", import.meta.url)) },
    { label: "tsgo-source-pin-helper", path: fileURLToPath(new URL("../tsgo-source-pin.mjs", import.meta.url)) },
    { label: "tsgo-source-pin", path: sourcePinPath },
    { label: "gnu-time", path: timeExecutable },
  ]);
  return { schemaVersion: 1, inputs, digest: fingerprint(inputs, "tsts-performance-harness-v1") };
}

export async function acquireBenchmarkCompilers({ noBuild = false } = {}) {
  const sourcePin = loadAndVerifyTsgoSourcePin({ repoRoot, packageRoot, vendorRoot });
  const buildRoot = join(repoRoot, ".temp/profiling/prepared-tsts");
  const tstsBuild = await ensureTstsBuild({ repoRoot, packageRoot, buildRoot, noBuild });
  const tstsCli = join(tstsBuild.path, "src/cli/index.js");
  if (!existsSync(tstsCli)) throw new Error("prepared TSTS build does not contain src/cli/index.js");
  const tsgoOptions = pinnedTsgoOptions(sourcePin);
  const tsgo = await ensurePinnedGoProducer(tsgoOptions);
  const tscEntry = join(repoRoot, "node_modules/typescript/bin/tsc");
  if (!existsSync(tscEntry)) throw new Error(`repository TypeScript compiler is missing: ${tscEntry}`);
  const evidence = compilerEvidence({ sourcePin, tstsBuild, tstsCli, tsgo, tscEntry });
  return {
    timeExecutable,
    compilers: [
      { id: "tsts", argv: [process.execPath, "--expose-gc", tstsCli] },
      { id: "tsgo", argv: [tsgo.path] },
      { id: "tsc", argv: [process.execPath, tscEntry] },
    ],
    evidence,
    async reverify() {
      const currentRequest = tstsBuildRequest({ repoRoot, packageRoot, tscPath: tscEntry });
      if (canonicalJson(currentRequest) !== canonicalJson(tstsBuild.provenance.request)) throw new Error("TSTS source/build inputs changed during benchmark execution");
      const verifiedBuild = verifyTstsBuild(dirname(tstsBuild.path), currentRequest, tstsBuild.buildId);
      if (verifiedBuild === undefined) throw new Error("prepared TSTS build disappeared during benchmark execution");
      const currentPin = loadAndVerifyTsgoSourcePin({ repoRoot, packageRoot, vendorRoot });
      const verifiedTsgo = await ensurePinnedGoProducer(pinnedTsgoOptions(currentPin));
      const after = compilerEvidence({ sourcePin: currentPin, tstsBuild: verifiedBuild, tstsCli: join(verifiedBuild.path, "src/cli/index.js"), tsgo: verifiedTsgo, tscEntry });
      if (canonicalJson(after) !== canonicalJson(evidence)) throw new Error("benchmark compiler evidence changed during execution");
    },
  };
}

function pinnedTsgoOptions(sourcePin) {
  return {
    label: "TS-Go performance reference producer",
    sourceRoot: vendorRoot,
    expectedRevision: sourcePin.pin.revision,
    package: "./cmd/tsgo",
    outputName: process.platform === "win32" ? "tsgo.exe" : "tsgo",
    cacheRoot: join(repoRoot, ".temp/profiling/pinned-tsgo/cache"),
    buildRoot: join(repoRoot, ".temp/profiling/pinned-tsgo/build"),
    additionalProvenance: { sourcePinSha256: sourcePin.sha256 },
  };
}

function compilerEvidence({ sourcePin, tstsBuild, tstsCli, tsgo, tscEntry }) {
  return {
    tsts: {
      id: "tsts",
      argv: ["<node>", "--expose-gc", "<prepared-tsts>/src/cli/index.js"],
      preparedBuild: preparedTstsBuildEvidence(tstsBuild),
      cli: executableProvenance(tstsCli),
    },
    tsgo: {
      id: "tsgo",
      argv: ["<pinned-tsgo>"],
      sourcePin: sourcePinEvidence(sourcePin),
      producer: tsgo.provenance,
    },
    tsc: {
      id: "tsc",
      argv: ["<node>", "node_modules/typescript/bin/tsc"],
      entry: executableProvenance(tscEntry),
      package: hashInputRoots([{ label: "typescript-package", path: join(repoRoot, "node_modules/typescript") }]),
    },
  };
}

function sourcePinEvidence(sourcePin) {
  return {
    schemaVersion: sourcePin.schemaVersion,
    path: sourcePin.path,
    sha256: sourcePin.sha256,
    primary: checkoutEvidence(sourcePin.primary),
    nestedSources: sourcePin.nestedSources.map((entry) => ({
      name: entry.name,
      path: entry.path,
      revision: entry.revision,
      gitObjectFormat: entry.gitObjectFormat,
      checkout: checkoutEvidence(entry.checkout),
    })),
  };
}

function checkoutEvidence(checkout) {
  return { revision: checkout.revision, tree: checkout.tree, objectFormat: checkout.objectFormat, dirty: checkout.dirty };
}
