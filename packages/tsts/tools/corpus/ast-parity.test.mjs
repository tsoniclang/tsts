import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { realpathSync } from "node:fs";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { delimiter, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  acquireCorpusTstsBuild,
  corpusCaseId,
  main,
  normalizedCompilerInput,
  parseArgs,
  publishCorpusReport,
  readVerifiedGitBlob,
  renderCorpusSummary,
  safeOutputName,
  validateCorpusCaseResults,
  verifyCorpusReport,
} from "./ast-parity.mjs";
import { fingerprint } from "../test-provenance.mjs";
import { sealEvidenceDirectory } from "../sealed-evidence.mjs";

const testPath = fileURLToPath(import.meta.url);
const packageRoot = dirname(dirname(dirname(testPath)));
const repoRoot = dirname(dirname(packageRoot));
const rejectedEnvironment = ["DYLD_INSERT_LIBRARIES", "DYLD_LIBRARY_PATH", "LD_AUDIT", "LD_PRELOAD", "LOCPATH", "NODE_ICU_DATA", "NODE_OPTIONS", "NODE_PATH", "TZDIR"];
const canonicalGitArguments = [
  "--no-replace-objects",
  "-c", "advice.detachedHead=false",
  "-c", "color.ui=false",
  "-c", "core.attributesFile=<null-device>",
  "-c", "core.fsmonitor=false",
  "-c", "core.untrackedCache=false",
  "-c", "credential.helper=",
  "-c", "protocol.version=2",
];
const canonicalGitEnvironment = {
  GIT_ATTR_NOSYSTEM: "1",
  GIT_CONFIG_COUNT: "0",
  GIT_CONFIG_GLOBAL: "<null-device>",
  GIT_CONFIG_NOSYSTEM: "1",
  GIT_CONFIG_SYSTEM: "<null-device>",
  GIT_NO_REPLACE_OBJECTS: "1",
  GIT_OPTIONAL_LOCKS: "0",
  GIT_PAGER: "cat",
  GIT_TERMINAL_PROMPT: "0",
  LANG: "C.UTF-8",
  LC_ALL: "C.UTF-8",
  PAGER: "cat",
  TZ: "UTC",
};

test("corpus arguments are strict and preserve no-build as boolean", async () => {
  assert.equal(parseArgs(["ast", "--limit", "1", "--no-build"])["no-build"], true);
  assert.throws(() => parseArgs(["ast", "--unknown"]), /unknown option/);
  assert.throws(() => parseArgs(["ast", "--project"]), /requires a value/);
  assert.throws(() => parseArgs(["ast", "--project", "p", "--project", "q"]), /duplicate option/);
  assert.throws(() => parseArgs(["ast", "--no-build=value"]), /does not accept a value/);
  await assert.rejects(main(["verify", "--report", "x", "extra"]), /unexpected positional argument/);
});

test("both parsers receive one recorded normalized byte sequence", () => {
  const original = Buffer.from([0x61, 0x80, 0x62]);
  const normalized = normalizedCompilerInput(original);
  assert.equal(normalized.sourceText, "a�b");
  assert.deepEqual(normalized.compilerInput, Buffer.from(normalized.sourceText, "utf8"));
});

test("case and artifact identities are relative and collision-free", () => {
  assert.equal(corpusCaseId("p", "a/b.ts"), "p/a/b.ts");
  assert.equal(corpusCaseId("p", "a/b.ts").startsWith("/"), false);
  assert.throws(() => corpusCaseId("p", "/a.ts"), /safe relative path/);
  assert.notEqual(safeOutputName("a/b.ts"), safeOutputName("a__b.ts"));
  assert.match(safeOutputName("a/b.ts"), /^[0-9a-f]{64}-b\.ts$/);
});

test("no-build intent is forwarded without fallback", async () => {
  const calls = [];
  const implementation = async (options) => {
    calls.push(options);
    if (options.noBuild) throw new Error("no exact cache");
    return { path: "built" };
  };
  await assert.rejects(acquireCorpusTstsBuild(true, implementation), /no exact cache/);
  assert.deepEqual(await acquireCorpusTstsBuild(false, implementation), { path: "built" });
  assert.deepEqual(calls.map((call) => call.noBuild), [true, false]);
  assert.equal(calls.every((call) => call.repoRoot === repoRoot && call.packageRoot === packageRoot), true);
});

test("fresh report publication creates missing parent directories", async (context) => {
  const root = await temporaryDirectory(context, "publication");
  const staging = join(root, "staging");
  const destination = join(root, "fresh", "nested", "runs", "report");
  await mkdir(staging);
  await writeFile(join(staging, "payload.txt"), "sealed\n");
  await sealEvidenceDirectory(staging, { schemaVersion: 1 });

  await publishCorpusReport(staging, destination);
  assert.equal(await readFile(join(destination, "payload.txt"), "utf8"), "sealed\n");
});

test("canonical Git ignores replacement/config injection and hashes cat-file bytes", { skip: process.platform === "win32" }, async (context) => {
  const root = await temporaryDirectory(context, "git-attacks");
  const repository = join(root, "repository");
  await mkdir(repository);
  await writeFile(join(repository, "input.ts"), "original\n");
  const realGit = commandPath("git");
  run(realGit, ["init", "--quiet", repository]);
  run(realGit, ["-C", repository, "add", "--", "input.ts"]);
  run(realGit, ["-C", repository, "-c", "user.name=TSTS Test", "-c", "user.email=tsts@example.invalid", "commit", "--quiet", "-m", "initial"]);
  const blobOid = run(realGit, ["-C", repository, "rev-parse", "HEAD:input.ts"]).stdout.trim();
  const replacementOid = run(realGit, ["-C", repository, "hash-object", "-w", "--stdin"], process.env, "replacement\n").stdout.trim();
  run(realGit, ["-C", repository, "replace", blobOid, replacementOid]);
  const attackConfig = join(root, "attack.gitconfig");
  await writeFile(attackConfig, "[core]\n\tuseReplaceRefs = true\n");
  const attackedEnvironment = {
    ...process.env,
    GIT_CONFIG_GLOBAL: attackConfig,
    GIT_CONFIG_COUNT: "1",
    GIT_CONFIG_KEY_0: "core.useReplaceRefs",
    GIT_CONFIG_VALUE_0: "true",
    GIT_NO_REPLACE_OBJECTS: "0",
  };
  assert.equal(readVerifiedGitBlob(repository, blobOid, "sha1", { environment: attackedEnvironment }).toString("utf8"), "original\n");

  const wrapperRoot = join(root, "wrapper");
  await mkdir(wrapperRoot);
  const wrapper = join(wrapperRoot, "git");
  await writeFile(wrapper, `#!/bin/sh
case " $* " in
  *" cat-file blob "*) printf forged; exit 0 ;;
esac
exec ${shellQuote(realGit)} "$@"
`, { mode: 0o755 });
  await chmod(wrapper, 0o755);
  assert.throws(() => readVerifiedGitBlob(repository, blobOid, "sha1", {
    environment: { ...attackedEnvironment, PATH: `${wrapperRoot}${delimiter}${attackedEnvironment.PATH}` },
  }), /bytes hash to .* expected declared blob/);
});

test("corpus case coverage requires exact identities, digests, and counts", () => {
  const report = makeReport();
  assert.doesNotThrow(() => validateCorpusCaseResults(report.evidenceId, report.evidence.selection, report.caseResults, report.summary));
  assert.throws(() => validateCorpusCaseResults(report.evidenceId, report.evidence.selection, [], report.summary), /coverage is incomplete/);
  const forged = structuredClone(report);
  forged.summary.inputDigest = hex("f");
  assert.throws(() => validateCorpusCaseResults(forged.evidenceId, forged.evidence.selection, forged.caseResults, forged.summary), /input digest mismatch/);
});

test("sealed corpus verifier rejects forged schemas and closed relation forgeries", async (context) => {
  const attacks = [
    {
      name: "extra result key",
      mutateBeforeClose(report) { report.caseResults[0].forged = true; },
      pattern: /invalid keys/,
    },
    {
      name: "selection digest",
      mutateBeforeClose(report) { report.evidence.selectionDigest = hex("e"); },
      pattern: /selection digest mismatch/,
    },
    {
      name: "summary failures",
      mutateAfterClose(report) { report.summary.failures = [{ project: "p", file: "a.ts", path: "$.x", expected: 1, actual: 2 }]; },
      pattern: /summary failures do not match/,
    },
    {
      name: "case fingerprint",
      mutateAfterClose(report) { report.caseResults[0].caseFingerprint = hex("d"); },
      pattern: /case fingerprint mismatch/,
    },
    {
      name: "summary evidence",
      mutateAfterClose(report) { report.summary.evidence = { ...report.evidence, selectionDigest: hex("c") }; },
      pattern: /summary evidence does not match/,
    },
  ];
  for (const attack of attacks) {
    const fixture = await writeReportFixture(context, { ...attack, prefix: `forged-${attack.name.replaceAll(" ", "-")}` });
    assert.throws(() => verifyCorpusReport(fixture.directory), attack.pattern, attack.name);
  }
});

test("sealed corpus verifier rejects malformed SHA, negative bytes, and status", async (context) => {
  const attacks = [
    {
      name: "malformed SHA",
      mutateBeforeClose(report) { report.caseResults[0].input.originalSha256 = "A".repeat(64); },
      pattern: /lowercase SHA-256/,
    },
    {
      name: "negative bytes",
      mutateBeforeClose(report) { report.caseResults[0].input.compilerInputBytes = -1; },
      pattern: /non-negative safe integer/,
    },
    {
      name: "malformed status",
      mutateBeforeClose(report) { report.caseResults[0].status = "passed"; },
      pattern: /invalid corpus result status/,
    },
  ];
  for (const attack of attacks) {
    const fixture = await writeReportFixture(context, { ...attack, prefix: `malformed-${attack.name.replaceAll(" ", "-")}` });
    assert.throws(() => verifyCorpusReport(fixture.directory), attack.pattern, attack.name);
  }
});

test("sealed corpus verifier ties failure artifacts exactly to case results", async (context) => {
  const valid = await writeReportFixture(context, { status: "fail", prefix: "failure-valid" });
  assert.equal(verifyCorpusReport(valid.directory).results.summary.failedFiles, 1);

  const forged = await writeReportFixture(context, {
    status: "fail",
    prefix: "failure-forged",
    mutateArtifacts(artifacts) { artifacts.tsts.dump.root.value = 3; },
  });
  assert.throws(() => verifyCorpusReport(forged.directory), /failure artifacts do not prove its mismatch/);

  await writeFile(join(valid.directory, valid.report.caseResults[0].artifacts.tsts), "tampered\n");
  assert.throws(() => verifyCorpusReport(valid.directory), /inventory mismatch|changed while/);
});

test("sealed corpus verifier parses only exact serialized sealed bytes", async (context) => {
  const fixture = await writeReportFixture(context, {
    prefix: "duplicate-json-key",
    transformResults(text) { return text.replace(/^\{\n/, "{\n  \"schemaVersion\": 1,\n"); },
  });
  assert.throws(() => verifyCorpusReport(fixture.directory), /exact serialized form/);
});

function makeReport({ status = "pass", pretty = false } = {}) {
  const evidence = makeEvidence(pretty);
  const evidenceId = fingerprint(evidence, "tsts-corpus-ast-parity-v1");
  const selection = evidence.selection[0];
  const input = {
    project: selection.project,
    file: selection.path,
    blobOid: selection.blobOid,
    originalSha256: hex("1"),
    compilerInputSha256: hex("2"),
    compilerInputBytes: 7,
  };
  const caseId = corpusCaseId(selection.project, selection.path);
  const mismatch = status === "fail" ? { path: "$.root.value", expected: 1, actual: 2 } : null;
  const stem = safeOutputName(selection.path);
  const artifacts = status === "fail" ? {
    tsgo: `mismatches/${selection.project}/${stem}.tsgo.json`,
    tsts: `mismatches/${selection.project}/${stem}.tsts.json`,
  } : null;
  const result = {
    caseIndex: 0,
    caseId,
    caseFingerprint: fingerprint({ evidenceId, caseIndex: 0, caseId, input }, "tsts-corpus-case-v1"),
    input,
    status,
    mismatch,
    artifacts,
  };
  const failures = status === "fail" ? [{ project: selection.project, file: selection.path, ...mismatch }] : [];
  return {
    schemaVersion: 1,
    evidenceId,
    evidence,
    summary: {
      schemaVersion: 2,
      evidenceId,
      evidence,
      manifest: evidence.manifest.path,
      totalFiles: 1,
      passedFiles: status === "pass" ? 1 : 0,
      failedFiles: status === "fail" ? 1 : 0,
      failures,
      inputDigest: fingerprint([input], "tsts-corpus-input-receipts-v1"),
    },
    caseResults: [result],
  };
}

function makeEvidence(pretty) {
  const commit = "a".repeat(40);
  const tree = "b".repeat(40);
  const blobOid = "c".repeat(40);
  const sourcePinSha256 = hex("3");
  const selection = [{ project: "p", path: "a.ts", gitPath: "src/a.ts", blobOid }];
  const producerRequest = {
    schemaVersion: 2,
    label: "fixture producer",
    source: { revision: commit, tree, objectFormat: "sha1", commitTime: "2024-01-02T03:04:05Z", dirty: false },
    sourceModule: "example.invalid/module",
    producerDriver: byteIdentity("4"),
    overlays: [],
    additionalProvenance: { sourcePinSha256 },
    sourceTree: {
      fileCount: 1,
      directoryCount: 0,
      gitlinkCount: 0,
      bytes: 1,
      digest: hex("5"),
      vcsStatus: { bytes: 0, sha256: sha256(Buffer.alloc(0)), modified: false },
    },
    git: {},
    build: { package: ".", arguments: ["build"], environment: {}, toolchain: {}, dependencies: {} },
    outputName: "tsgo-dump",
  };
  const tstsRequest = {
    schemaVersion: 3,
    inputs: inputRoots(["tsts-source"]),
    runtime: { executable: byteIdentity("6"), version: "v26.0.0", versions: { node: "26.0.0" }, execArgv: [], startupNodeOptions: "" },
    compiler: { logicalPath: "node_modules/typescript/bin/tsc", executable: byteIdentity("e") },
    command: ["<node>", "node_modules/typescript/bin/tsc", "-p", "packages/tsts/tsconfig.json", "--outDir", "<dist>", "--pretty", "false"],
    environment: { LANG: "C.UTF-8", LC_ALL: "C.UTF-8", TZ: "UTC", NODE_OPTIONS: "", NODE_PATH: "" },
  };
  return {
    schemaVersion: 1,
    manifest: { path: "packages/tsts/corpus/fixture.json", sha256: hex("7") },
    sourcePin: { sha256: sourcePinSha256, revision: commit, nestedSources: [] },
    invocation: { project: null, file: null, limit: null, noSetup: true, noBuild: true, pretty },
    runtime: {
      executable: byteIdentity("8"),
      version: "v26.0.0",
      versions: { node: "26.0.0" },
      execArgv: [],
      platform: "linux",
      arch: "x64",
      locale: { locale: "en-US", calendar: "gregory", numberingSystem: "latn", timeZone: "UTC" },
      environment: { TZ: "UTC", LANG: "C.UTF-8", LC_ALL: "C.UTF-8", NODE_OPTIONS: "", NODE_PATH: "" },
      conditions: {
        schemaVersion: 1,
        umask: "0022",
        searchPath: byteIdentity("9"),
        controlledEnvironment: { HOME: "<runtime-home>" },
        rejectedEnvironment,
        networkEnvironment: {},
        systemEnvironment: {},
      },
      git: { schemaVersion: 1, executable: byteIdentity("a"), version: "git version 2.53.0", arguments: canonicalGitArguments, environment: canonicalGitEnvironment },
    },
    drivers: inputRoots(["corpus-driver", "corpus-manifest", "pinned-producer-helper", "provenance-helper", "sealed-evidence-helper", "source-pin", "source-pin-verifier", "tsgo-dump-helper"]),
    projects: [{ name: "p", repository: "https://example.invalid/p.git", expectedCommit: commit, checkout: { revision: commit, tree, objectFormat: "sha1", dirty: false } }],
    selection,
    selectionDigest: fingerprint(selection, "tsts-corpus-selection-v1"),
    tsgoProducer: {
      schemaVersion: 2,
      producerId: fingerprint(producerRequest, "tsts-pinned-go-producer-v2"),
      request: producerRequest,
      binary: { name: "tsgo-dump", bytes: 1, sha256: hex("b") },
      buildMetadata: {
        goVersion: "go1.26.0",
        path: "example.invalid/module/cmd",
        main: { path: "example.invalid/module", version: "v0.0.0", sum: "", replacement: null },
        dependencies: [],
        settings: { "vcs.revision": commit },
      },
    },
    tstsBuild: {
      schemaVersion: 3,
      buildId: fingerprint(tstsRequest, "tsts-prepared-build-v1"),
      evidenceDigest: hex("f"),
      request: tstsRequest,
      output: inputRoot("tsts-dist", "d"),
    },
  };
}

async function writeReportFixture(context, options = {}) {
  const directory = await temporaryDirectory(context, options.prefix ?? "report");
  const report = makeReport({ status: options.status, pretty: options.pretty });
  options.mutateBeforeClose?.(report);
  closeOuterRelations(report);
  options.mutateAfterClose?.(report);

  await writeFile(join(directory, "RUN.json"), `${JSON.stringify({ schemaVersion: 1, evidenceId: report.evidenceId, evidence: report.evidence }, null, 2)}\n`);
  let resultsText = `${JSON.stringify(report, null, 2)}\n`;
  resultsText = options.transformResults?.(resultsText) ?? resultsText;
  await writeFile(join(directory, "results.json"), resultsText);
  await writeFile(join(directory, "summary.md"), renderCorpusSummary(report.summary));

  if (report.caseResults[0].status === "fail") {
    const result = report.caseResults[0];
    const artifacts = {
      tsgo: { evidenceId: report.evidenceId, input: result.input, dump: dump("tsgo", `/corpus/${result.caseId}`, 1) },
      tsts: { evidenceId: report.evidenceId, input: result.input, dump: dump("tsts", `/corpus/${result.caseId}`, 2) },
    };
    options.mutateArtifacts?.(artifacts);
    for (const compiler of ["tsgo", "tsts"]) {
      const path = join(directory, result.artifacts[compiler]);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, `${JSON.stringify(artifacts[compiler], undefined, report.evidence.invocation.pretty ? 2 : 0)}\n`);
    }
  }
  if (options.extraFile !== undefined) await writeFile(join(directory, options.extraFile), "extra\n");

  await sealEvidenceDirectory(directory, {
    evidenceId: report.evidenceId,
    outcome: report.summary.failedFiles === 0 ? "passed" : "failed",
    counts: { total: report.summary.totalFiles, passed: report.summary.passedFiles, failed: report.summary.failedFiles },
  });
  return { directory, report };
}

function closeOuterRelations(report) {
  report.evidenceId = fingerprint(report.evidence, "tsts-corpus-ast-parity-v1");
  report.summary.evidenceId = report.evidenceId;
  report.summary.evidence = report.evidence;
  for (const result of report.caseResults) {
    result.caseFingerprint = fingerprint({ evidenceId: report.evidenceId, caseIndex: result.caseIndex, caseId: result.caseId, input: result.input }, "tsts-corpus-case-v1");
  }
  report.summary.inputDigest = fingerprint(report.caseResults.map((result) => result.input), "tsts-corpus-input-receipts-v1");
}

function dump(compiler, fileName, value) {
  return {
    schemaVersion: 1,
    compiler,
    fileName,
    scriptKind: "TS",
    scriptKindId: 3,
    sourceFile: {},
    diagnostics: {},
    root: { value },
  };
}

function inputRoots(labels) {
  const roots = labels.map((label, index) => inputRoot(label, (index % 10).toString(16)));
  return { schemaVersion: 1, roots, digest: fingerprint(roots, "tsts-input-roots-v1") };
}

function inputRoot(label, character) {
  return { label, kind: "file", mode: 0o644, symlinkPolicy: "reject", fileCount: 1, symlinkCount: 0, bytes: 1, digest: hex(character) };
}

function byteIdentity(character) {
  return { bytes: 1, sha256: hex(character) };
}

function hex(character, length = 64) {
  return character.repeat(length);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function temporaryDirectory(context, name) {
  const directory = await mkdtemp(join(tmpdir(), `tsts-corpus-${name}-`));
  context.after(async () => rm(directory, { recursive: true, force: true }));
  return directory;
}

function commandPath(command) {
  const result = spawnSync("which", [command], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`test requires '${command}'`);
  return realpathSync(result.stdout.split(/\r?\n/).find(Boolean));
}

function run(command, arguments_ = [], environment = process.env, input) {
  const result = spawnSync(command, arguments_, { encoding: "utf8", env: environment, input });
  if (result.error !== undefined) throw result.error;
  if (result.status !== 0 || result.signal !== null) throw new Error(`${command} ${arguments_.join(" ")} failed: ${result.stderr || result.stdout}`);
  return result;
}

function shellQuote(value) {
  return `'${value.replaceAll("'", `'"'"'`)}'`;
}
