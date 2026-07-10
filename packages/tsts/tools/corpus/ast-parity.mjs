#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { accessSync, constants as fsConstants, existsSync, lstatSync, readFileSync, realpathSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { devNull } from "node:os";
import { delimiter, dirname, extname, join, relative, resolve, sep } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { canonicalJson, compareUtf8, executableProvenance, fingerprint, hashInputRoots } from "../test-provenance.mjs";
import { ensurePinnedGoProducer } from "../pinned-go-producer.mjs";
import { loadAndVerifyTsgoSourcePin } from "../tsgo-source-pin.mjs";
import { publishSealedDirectory, readVerifiedEvidenceFile, sealEvidenceDirectory, verifyEvidenceDirectory, writeDurableFileExclusive } from "../sealed-evidence.mjs";
import { ensureTstsBuild, fixedNodeEnvironment, preparedTstsBuildEvidence } from "../tsts-build.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(scriptPath), "../../../..");
const packageRoot = join(repoRoot, "packages/tsts");
const defaultManifestPath = join(packageRoot, "corpus/realworld.json");
const vendorRoot = join(packageRoot, "_vendor/typescript-go");
const tempRoot = join(repoRoot, ".temp/corpus");
const repoCacheRoot = join(tempRoot, "repos");
const helperSourcePath = join(packageRoot, "tools/corpus/tsgo-ast-dump/main.go");
const helperToolRoot = join(tempRoot, "tools/tsgo-ast-dump");
const helperBuildRoot = join(tempRoot, "build/tsgo-ast-dump");
const tstsBuildRoot = join(tempRoot, "build/tsts");
const resultRoot = join(tempRoot, "ast");
const sourcePinPath = join(packageRoot, "schema/tsgo/source-pin.json");
const provenanceHelperPath = fileURLToPath(new URL("../test-provenance.mjs", import.meta.url));
const sourcePinVerifierPath = fileURLToPath(new URL("../tsgo-source-pin.mjs", import.meta.url));
const producerHelperPath = fileURLToPath(new URL("../pinned-go-producer.mjs", import.meta.url));
const sealedEvidenceHelperPath = fileURLToPath(new URL("../sealed-evidence.mjs", import.meta.url));

const sourceFileExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mts", ".cts", ".mjs", ".cjs"]);
const defaultExcludedDirectories = new Set([".git", ".next", ".temp", ".turbo", "bower_components", "coverage", "dist", "node_modules", "tmp"]);
const sha256Pattern = /^[0-9a-f]{64}$/;
const projectNamePattern = /^[a-z0-9][a-z0-9._-]*$/i;
const fixedEnvironment = { TZ: "UTC", LANG: "C.UTF-8", LC_ALL: "C.UTF-8", NODE_OPTIONS: "", NODE_PATH: "" };
const rejectedRuntimeEnvironment = ["DYLD_INSERT_LIBRARIES", "DYLD_LIBRARY_PATH", "LD_AUDIT", "LD_PRELOAD", "LOCPATH", "NODE_ICU_DATA", "NODE_OPTIONS", "NODE_PATH", "TZDIR"];
const canonicalGitArgumentEvidence = [
  "--no-replace-objects",
  "-c", "advice.detachedHead=false",
  "-c", "color.ui=false",
  "-c", "core.attributesFile=<null-device>",
  "-c", "core.fsmonitor=false",
  "-c", "core.untrackedCache=false",
  "-c", "credential.helper=",
  "-c", "protocol.version=2",
];
const canonicalGitEnvironmentEvidence = {
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
const canonicalGitArguments = canonicalGitArgumentEvidence.map((value) => value.replace("<null-device>", devNull));
let preparedGitExecutable;

export async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const command = args._[0] ?? "help";
  if (command === "help" || args.help) {
    printHelp();
    return command === "help" ? 0 : 1;
  }
  validateCommandArgs(command, args);
  validateOptionValues(args);
  if (command === "verify") {
    const verified = verifyCorpusReport(args.report);
    console.log(`verified corpus report ${verified.results.evidenceId} outcome=${verified.seal.metadata.outcome} files=${verified.results.summary.totalFiles}`);
    return 0;
  }
  const executionConditions = await prepareExecutionEnvironment();
  if (command === "setup") {
    const manifest = readManifest(args.manifest ?? defaultManifestPath);
    await setupCorpus(manifest, args);
  } else if (command === "ast") {
    const manifest = readManifest(args.manifest ?? defaultManifestPath);
    const summary = await runAstParity(manifest, args, executionConditions);
    return summary.failedFiles === 0 ? 0 : 1;
  } else if (command === "list") {
    const manifest = readManifest(args.manifest ?? defaultManifestPath);
    await listCorpusFiles(manifest, args);
  } else {
    throw new Error(`unknown command: ${command}`);
  }
  return 0;
}

function printHelp() {
  console.log(`Usage:
  node packages/tsts/tools/corpus/ast-parity.mjs setup [--project name]
  node packages/tsts/tools/corpus/ast-parity.mjs ast [--project name] [--file relative/path.ts] [--limit n]
  node packages/tsts/tools/corpus/ast-parity.mjs list [--project name]
  node packages/tsts/tools/corpus/ast-parity.mjs verify --report path

Options:
  --manifest path   Corpus manifest path. Default: packages/tsts/corpus/realworld.json
  --project name    Restrict to one corpus project.
  --file path       Restrict to one project-relative source file.
  --limit n         Restrict to the first n selected files.
  --no-setup        Do not fetch/check out corpus repos before running ast.
  --no-build        Do not build packages/tsts/dist before running ast.
  --pretty          Write pretty JSON mismatch dumps.
  --report path     Immutable corpus report directory to verify.
`);
}

export function parseArgs(argv) {
  const result = { _: [] };
  const valueOptions = new Set(["manifest", "project", "file", "limit", "report"]);
  const booleanOptions = new Set(["no-setup", "no-build", "pretty", "help"]);
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (!arg.startsWith("--")) {
      result._.push(arg);
      continue;
    }
    const eq = arg.indexOf("=");
    const key = arg.slice(2, eq === -1 ? undefined : eq);
    if (!valueOptions.has(key) && !booleanOptions.has(key)) throw new Error(`unknown option: --${key}`);
    if (Object.hasOwn(result, key)) throw new Error(`duplicate option: --${key}`);
    if (eq !== -1) {
      if (booleanOptions.has(key)) throw new Error(`--${key} does not accept a value`);
      const value = arg.slice(eq + 1);
      if (value === "") throw new Error(`--${key} requires a value`);
      result[key] = value;
      continue;
    }
    if (booleanOptions.has(key)) {
      result[key] = true;
      continue;
    }
    const next = argv[index + 1];
    if (next !== undefined && !next.startsWith("--")) {
      result[key] = next;
      index++;
    } else {
      throw new Error(`--${key} requires a value`);
    }
  }
  return result;
}

function validateCommandArgs(command, args) {
  const allowedByCommand = {
    setup: new Set(["_", "manifest", "project"]),
    ast: new Set(["_", "file", "limit", "manifest", "no-build", "no-setup", "pretty", "project"]),
    list: new Set(["_", "file", "limit", "manifest", "project"]),
    verify: new Set(["_", "report"]),
  };
  const allowed = allowedByCommand[command];
  if (allowed === undefined) throw new Error(`unknown command: ${command}`);
  if (args._.length !== 1) throw new Error(`unexpected positional argument for ${command}`);
  for (const key of Object.keys(args)) if (!allowed.has(key)) throw new Error(`--${key} is not valid for ${command}`);
  if (command === "verify" && args.report === undefined) throw new Error("verify requires --report path");
}

function validateOptionValues(args) {
  if (args.project !== undefined && !projectNamePattern.test(args.project)) throw new Error(`invalid --project value: ${args.project}`);
  if (args.file !== undefined) safeRelativePath(normalizePath(args.file), "--file");
  if (args.limit !== undefined) {
    const limit = Number(args.limit);
    if (!Number.isSafeInteger(limit) || limit < 0) throw new Error(`invalid --limit value: ${args.limit}`);
  }
}

function readManifest(path) {
  const manifestPath = resolve(repoRoot, path);
  const manifestReportPath = repoRelativePath(manifestPath, "corpus manifest");
  const manifestBytes = readFileSync(manifestPath);
  const manifest = JSON.parse(manifestBytes.toString("utf8"));
  assertExactObjectKeys(manifest, ["description", "fileSelection", "projects", "schemaVersion"], "corpus manifest");
  if (typeof manifest.description !== "string" || manifest.description === "") throw new Error("corpus manifest description must be non-empty");
  if (manifest.schemaVersion !== 1) {
    throw new Error(`unsupported corpus manifest schemaVersion in ${manifestReportPath}`);
  }
  if (!Array.isArray(manifest.projects)) {
    throw new Error(`corpus manifest ${manifestReportPath} is missing projects[]`);
  }
  const names = new Set();
  for (const project of manifest.projects) {
    if (project === null || typeof project !== "object" || Array.isArray(project)) throw new Error("corpus project must be an object");
    assertExactObjectKeys(project, ["commit", "name", "repository", "sourceRoot"], `corpus project ${project.name ?? "<unknown>"}`);
    if (typeof project.name !== "string" || !projectNamePattern.test(project.name) || names.has(project.name)) throw new Error(`invalid or duplicate corpus project name '${project.name}'`);
    if (typeof project.repository !== "string" || !/^https:\/\//.test(project.repository)) throw new Error(`invalid corpus repository for ${project.name}`);
    if (typeof project.commit !== "string" || !/^[0-9a-f]{40,64}$/.test(project.commit)) throw new Error(`invalid full commit for ${project.name}`);
    normalizedSourceRoot(project.sourceRoot);
    names.add(project.name);
  }
  const selection = manifest.fileSelection;
  assertExactObjectKeys(selection, ["excludedDirectories", "excludedFileSuffixes", "extensions"], "corpus fileSelection");
  for (const [key, values] of Object.entries(selection)) {
    if (!Array.isArray(values) || !values.every((value) => typeof value === "string" && value !== "") || new Set(values).size !== values.length) {
      throw new Error(`corpus fileSelection.${key} must contain unique non-empty strings`);
    }
  }
  if (!selection.extensions.every((extension) => /^\.[a-z0-9]+$/i.test(extension))) throw new Error("corpus fileSelection.extensions contains an invalid extension");
  if (!selection.excludedDirectories.every((directory) => safePathSegment(directory))) throw new Error("corpus fileSelection.excludedDirectories contains an invalid directory name");
  return { ...manifest, manifestPath, manifestReportPath, manifestSha256: sha256(manifestBytes) };
}

async function setupCorpus(manifest, options) {
  await mkdir(repoCacheRoot, { recursive: true });
  const projects = selectProjects(manifest, options.project);
  for (const project of projects) {
    await ensureProjectCheckout(project);
  }
}

async function listCorpusFiles(manifest, options) {
  const projects = selectProjects(manifest, options.project);
  const files = await collectCorpusFiles(manifest, projects, options);
  for (const file of files) {
    console.log(`${file.project.name}\t${file.relativePath}`);
  }
  console.log(`files=${files.length}`);
}

async function runAstParity(manifest, options, executionConditions) {
  const projects = selectProjects(manifest, options.project);
  if (!options["no-setup"]) {
    await setupCorpus(manifest, options);
  }
  for (const project of projects) verifyProjectCheckout(project);
  const tstsBuild = await acquireCorpusTstsBuild(options["no-build"] === true);
  const helper = await ensureTsgoDumpBinary();
  const tstsDumper = await createTstsDumper(tstsBuild.path);
  const files = await collectCorpusFiles(manifest, projects, options);
  if (files.length === 0) {
    throw new Error("no corpus source files selected");
  }

  const evidence = buildCorpusEvidence(manifest, projects, files, helper, tstsBuild, options, executionConditions);
  const evidenceId = fingerprint(evidence, "tsts-corpus-ast-parity-v1");
  const runId = `${new Date().toISOString().replaceAll(":", "").replace(".", "-").replace("Z", "")}-${process.pid}-${randomUUID()}-${evidenceId.slice(0, 12)}`;
  const runDir = join(resultRoot, "runs", runId);
  const stagingDir = join(resultRoot, "staging", `${runId}.partial-${randomUUID()}`);
  await mkdir(stagingDir, { recursive: true });
  await writeDurableFileExclusive(join(stagingDir, "RUN.json"), `${JSON.stringify({ schemaVersion: 1, evidenceId, evidence }, null, 2)}\n`);

  const failures = [];
  const inputReceipts = [];
  const caseResults = [];
  const startedAt = Date.now();
  try {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const originalBytes = readCorpusBlob(file);
      const { sourceText, compilerInput } = normalizedCompilerInput(originalBytes);
      const inputReceipt = {
        project: file.project.name,
        file: file.relativePath,
        blobOid: file.blobOid,
        originalSha256: sha256(originalBytes),
        compilerInputSha256: sha256(compilerInput),
        compilerInputBytes: compilerInput.length,
      };
      inputReceipts.push(inputReceipt);
      const tsgoDump = runTsgoDump(helper.path, file, compilerInput);
      const tstsDump = await tstsDumper.dump(file, sourceText);
      assertDumpProducer(tsgoDump, "tsgo", file);
      assertDumpProducer(tstsDump, "tsts", file);
      const mismatch = firstMismatch(toComparableDump(tsgoDump), toComparableDump(tstsDump));
      const caseId = corpusCaseId(file.project.name, file.relativePath);
      const caseFingerprint = fingerprint({ evidenceId, caseIndex: index, caseId, input: inputReceipt }, "tsts-corpus-case-v1");
      let artifacts = null;
      if (mismatch !== undefined) {
        const mismatchStem = safeOutputName(file.relativePath);
        const mismatchBase = join(stagingDir, "mismatches", file.project.name, mismatchStem);
        await mkdir(dirname(mismatchBase), { recursive: true });
        const spacing = options.pretty ? 2 : 0;
        await writeDurableFileExclusive(`${mismatchBase}.tsgo.json`, JSON.stringify({ evidenceId, input: inputReceipt, dump: tsgoDump }, undefined, spacing) + "\n");
        await writeDurableFileExclusive(`${mismatchBase}.tsts.json`, JSON.stringify({ evidenceId, input: inputReceipt, dump: tstsDump }, undefined, spacing) + "\n");
        artifacts = {
          tsgo: `mismatches/${file.project.name}/${mismatchStem}.tsgo.json`,
          tsts: `mismatches/${file.project.name}/${mismatchStem}.tsts.json`,
        };
        failures.push({ project: file.project.name, file: file.relativePath, path: mismatch.path, expected: mismatch.expected, actual: mismatch.actual });
        console.error(`FAIL ${failures.length}: ${file.project.name}/${file.relativePath} ${mismatch.path}`);
        console.error(`  tsgo=${formatValue(mismatch.expected)}`);
        console.error(`  tsts=${formatValue(mismatch.actual)}`);
      }
      caseResults.push({
        caseIndex: index,
        caseId,
        caseFingerprint,
        input: inputReceipt,
        status: mismatch === undefined ? "pass" : "fail",
        mismatch: mismatch ?? null,
        artifacts,
      });

      const done = index + 1;
      if (done === 1 || done === files.length || done % 50 === 0) {
        const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
        console.log(`AST parity ${done}/${files.length} failures=${failures.length} elapsed=${elapsed}s`);
      }
    }
  } catch (error) {
    await writeDurableFileExclusive(join(stagingDir, "ERROR.json"), `${JSON.stringify({ schemaVersion: 1, evidenceId, message: error instanceof Error ? error.stack : String(error), completedInputs: inputReceipts.length }, null, 2)}\n`);
    throw error;
  }

  const finalEvidence = buildCorpusEvidence(
    readManifest(manifest.manifestReportPath),
    projects,
    files,
    await ensureTsgoDumpBinary(),
    await acquireCorpusTstsBuild(true),
    options,
    executionConditions,
  );
  if (canonicalJson(finalEvidence) !== canonicalJson(evidence)) throw new Error("Corpus parity inputs changed while the run was active; refusing to seal the report");
  const summary = {
    schemaVersion: 2,
    evidenceId,
    evidence,
    manifest: manifest.manifestReportPath,
    totalFiles: files.length,
    passedFiles: files.length - failures.length,
    failedFiles: failures.length,
    failures,
    inputDigest: fingerprint(inputReceipts, "tsts-corpus-input-receipts-v1"),
  };
  const results = { schemaVersion: 1, evidenceId, evidence, summary, caseResults };
  validateCorpusResultsDocument(results);
  const resultsText = `${JSON.stringify(results, null, 2)}\n`;
  const summaryText = renderCorpusSummary(summary);
  await writeDurableFileExclusive(join(stagingDir, "results.json"), resultsText);
  await writeDurableFileExclusive(join(stagingDir, "summary.md"), summaryText);
  await sealEvidenceDirectory(stagingDir, {
    evidenceId,
    outcome: failures.length === 0 ? "passed" : "failed",
    counts: { total: summary.totalFiles, passed: summary.passedFiles, failed: summary.failedFiles },
  });
  verifyCorpusReport(stagingDir);
  await publishCorpusReport(stagingDir, runDir);
  verifyCorpusReport(runDir);
  console.log(summaryText);
  console.log(`REPORT ${relative(repoRoot, runDir)}`);
  return summary;
}

function selectProjects(manifest, selectedName) {
  const projects = selectedName === undefined
    ? manifest.projects
    : manifest.projects.filter((project) => project.name === selectedName);
  if (projects.length === 0) {
    throw new Error(`no corpus project matched ${selectedName}`);
  }
  for (const project of projects) {
    if (!project.name || !project.repository || !project.commit) {
      throw new Error(`invalid corpus project entry: ${JSON.stringify(project)}`);
    }
  }
  return projects;
}

function readSourcePin() {
  return loadAndVerifyTsgoSourcePin({ repoRoot, packageRoot, vendorRoot });
}

function buildCorpusEvidence(manifest, projects, files, helper, tstsBuild, options, executionConditions) {
  const sourcePin = readSourcePin();
  const projectEvidence = projects.map((project) => ({
    name: project.name,
    repository: project.repository,
    expectedCommit: project.commit,
    checkout: verifyProjectCheckout(project),
  }));
  const selection = files.map((file) => ({ project: file.project.name, path: file.relativePath, gitPath: file.gitPath, blobOid: file.blobOid }));
  return {
    schemaVersion: 1,
    manifest: { path: manifest.manifestReportPath, sha256: manifest.manifestSha256 },
    sourcePin: { sha256: sourcePin.sha256, revision: sourcePin.pin.revision, nestedSources: sourcePin.nestedSources },
    invocation: {
      project: options.project ?? null,
      file: options.file === undefined ? null : normalizePath(options.file),
      limit: options.limit === undefined ? null : Number(options.limit),
      noSetup: options["no-setup"] === true,
      noBuild: options["no-build"] === true,
      pretty: options.pretty === true,
    },
    runtime: {
      executable: executableProvenance(process.execPath),
      version: process.version,
      versions: process.versions,
      execArgv: [...process.execArgv],
      platform: process.platform,
      arch: process.arch,
      locale: selectedLocaleProvenance(),
      environment: fixedEnvironment,
      conditions: executionConditions,
      git: canonicalGitProvenance(),
    },
    drivers: hashInputRoots([
      { label: "corpus-driver", path: scriptPath },
      { label: "tsgo-dump-helper", path: helperSourcePath },
      { label: "source-pin", path: sourcePinPath },
      { label: "corpus-manifest", path: manifest.manifestPath },
      { label: "provenance-helper", path: provenanceHelperPath },
      { label: "source-pin-verifier", path: sourcePinVerifierPath },
      { label: "pinned-producer-helper", path: producerHelperPath },
      { label: "sealed-evidence-helper", path: sealedEvidenceHelperPath },
    ]),
    projects: projectEvidence,
    selection,
    selectionDigest: fingerprint(selection, "tsts-corpus-selection-v1"),
    tsgoProducer: helper.provenance,
    tstsBuild: relocationSafeTstsBuildProvenance(tstsBuild),
  };
}

function readCorpusBlob(file) {
  const bytes = readVerifiedGitBlob(file.checkout, file.blobOid, file.checkoutProvenance.objectFormat);
  const current = gitTreeEntries(file.checkout, file.project.commit, file.gitPath, file.checkoutProvenance.objectFormat).find((entry) => entry.path === file.gitPath);
  if (current === undefined || current.oid !== file.blobOid) throw new Error(`corpus blob identity changed for ${file.project.name}/${file.relativePath}`);
  return bytes;
}

export function readVerifiedGitBlob(checkout, blobOid, objectFormat, options = {}) {
  assertObjectId(blobOid, objectFormat, "corpus blob");
  const bytes = gitCaptureBuffer(["-C", checkout, "cat-file", "blob", blobOid], repoRoot, options.environment ?? process.env);
  const actual = gitObjectId("blob", bytes, objectFormat);
  if (actual !== blobOid) throw new Error(`git cat-file bytes hash to ${actual}, expected declared blob ${blobOid}`);
  return bytes;
}

function assertDumpProducer(dump, compiler, file) {
  if (dump?.schemaVersion !== 1 || dump.compiler !== compiler || dump.fileName !== file.logicalPath) {
    throw new Error(`${compiler} produced an invalid AST parity envelope for ${file.project.name}/${file.relativePath}`);
  }
}

async function ensureProjectCheckout(project) {
  const checkout = projectCheckoutPath(project);
  await mkdir(dirname(checkout), { recursive: true });
  let freshlyCloned = false;
  if (!existsSync(join(checkout, ".git"))) {
    console.log(`Cloning ${project.name} ${project.repository}`);
    gitRun(["clone", "--no-checkout", "--filter=blob:none", project.repository, checkout], repoRoot);
    freshlyCloned = true;
  }

  const currentRemote = gitCapture(["-C", checkout, "config", "--local", "--no-includes", "--get", "remote.origin.url"], repoRoot).trim();
  if (currentRemote !== project.repository) {
    throw new Error(`${relative(repoRoot, checkout)} origin is ${currentRemote}, expected ${project.repository}`);
  }

  const hasCommit = gitStatus(["-C", checkout, "cat-file", "-e", `${project.commit}^{commit}`], repoRoot);
  if (hasCommit !== 0) {
    console.log(`Fetching ${project.name}@${project.commit}`);
    gitRun(["-C", checkout, "fetch", "--depth=1", "origin", project.commit], repoRoot);
  }

  const current = gitCapture(["-C", checkout, "rev-parse", "HEAD"], repoRoot).trim();
  if (!freshlyCloned) {
    const status = gitCapture(["-C", checkout, "status", "--porcelain=v1", "--untracked-files=all"], repoRoot).trim();
    if (status !== "") throw new Error(`${relative(repoRoot, checkout)} is dirty; corpus caches must remain immutable`);
  }
  if (freshlyCloned || current !== project.commit) {
    console.log(`Checking out ${project.name}@${project.commit}`);
    gitRun(["-C", checkout, "checkout", "--detach", project.commit], repoRoot);
  }
  verifyProjectCheckout(project);
}

function verifyProjectCheckout(project) {
  const checkout = projectCheckoutPath(project);
  if (!existsSync(join(checkout, ".git"))) throw new Error(`${project.name} has not been set up; run corpus:setup first`);
  const remote = gitCapture(["-C", checkout, "config", "--local", "--no-includes", "--get", "remote.origin.url"], repoRoot).trim();
  const provenance = canonicalGitCheckoutProvenance(checkout, `corpus ${project.name}`);
  const { revision } = provenance;
  const status = provenance.dirty ? "dirty" : "";
  if (remote !== project.repository) throw new Error(`${project.name} origin is ${remote}, expected ${project.repository}`);
  if (revision !== project.commit) throw new Error(`${project.name} checkout is ${revision}, expected ${project.commit}`);
  if (status !== "") throw new Error(`${project.name} checkout is dirty: ${status.split(/\r?\n/).slice(0, 5).join(", ")}`);
  return provenance;
}

function projectCheckoutPath(project) {
  return join(repoCacheRoot, project.name, project.commit);
}

async function collectCorpusFiles(manifest, projects, options) {
  const fileSelection = manifest.fileSelection ?? {};
  const extensions = new Set(fileSelection.extensions ?? [...sourceFileExtensions]);
  const excludedDirectories = new Set(fileSelection.excludedDirectories ?? [...defaultExcludedDirectories]);
  const excludedFileSuffixes = fileSelection.excludedFileSuffixes ?? [];
  const selected = [];

  for (const project of projects) {
    const checkout = projectCheckoutPath(project);
    const checkoutProvenance = verifyProjectCheckout(project);
    const sourceRoot = normalizedSourceRoot(project.sourceRoot ?? ".");
    const entries = gitTreeEntries(checkout, project.commit, sourceRoot, checkoutProvenance.objectFormat)
      .filter((entry) => corpusTreeEntrySelected(entry, sourceRoot, { extensions, excludedDirectories, excludedFileSuffixes }))
      .sort((left, right) => compareUtf8(left.path, right.path));
    for (const entry of entries) {
      const relativePath = sourceRoot === "." ? entry.path : entry.path.slice(sourceRoot.length + 1);
      if (options.file !== undefined && normalizePath(options.file) !== relativePath) {
        continue;
      }
      selected.push({
        project,
        checkout,
        checkoutProvenance,
        gitPath: entry.path,
        blobOid: entry.oid,
        relativePath,
        logicalPath: corpusCompilerPath(project.name, relativePath),
      });
    }
  }

  if (options.limit !== undefined) {
    const limit = Number(options.limit);
    if (!Number.isInteger(limit) || limit < 0) {
      throw new Error(`invalid --limit value: ${options.limit}`);
    }
    return selected.slice(0, limit);
  }
  return selected;
}

function gitTreeEntries(checkout, revision, sourceRoot, objectFormat) {
  const arguments_ = ["-C", checkout, "ls-tree", "-r", "-z", "--full-tree", revision];
  if (sourceRoot !== ".") arguments_.push("--", sourceRoot);
  const output = gitCaptureBuffer(arguments_, repoRoot);
  const text = output.toString("utf8");
  if (!Buffer.from(text, "utf8").equals(output)) throw new Error("git ls-tree emitted a non-UTF-8 corpus path");
  return text.split("\0").filter(Boolean).map((record) => {
    const match = /^(\d+)\s+(\S+)\s+([0-9a-f]+)\t(.+)$/.exec(record);
    if (match === null) throw new Error(`invalid git ls-tree record for corpus ${record}`);
    assertObjectId(match[3], objectFormat, `corpus tree entry '${match[4]}'`);
    const path = safeRelativePath(match[4], "corpus Git path");
    return { mode: match[1], type: match[2], oid: match[3], path };
  });
}

function corpusTreeEntrySelected(entry, sourceRoot, policy) {
  if (sourceRoot !== "." && !entry.path.startsWith(`${sourceRoot}/`)) return false;
  const relativePath = sourceRoot === "." ? entry.path : entry.path.slice(sourceRoot.length + 1);
  const parts = relativePath.split("/");
  if (parts.slice(0, -1).some((part) => policy.excludedDirectories.has(part))) return false;
  if (!policy.extensions.has(extname(parts.at(-1)))) return false;
  if (policy.excludedFileSuffixes.some((suffix) => relativePath.endsWith(suffix))) return false;
  if (entry.type !== "blob" || !new Set(["100644", "100755"]).has(entry.mode)) throw new Error(`unsupported corpus source entry '${entry.path}' (${entry.mode} ${entry.type})`);
  return true;
}

function assertExactObjectKeys(value, keys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  if (canonicalJson(Object.keys(value).sort(compareUtf8)) !== canonicalJson([...keys].sort(compareUtf8))) throw new Error(`${label} has invalid keys`);
}

function normalizedSourceRoot(value) {
  if (typeof value !== "string") throw new Error("corpus sourceRoot must be a string");
  const normalized = normalizePath(value).replace(/^\.\//, "").replace(/\/+$/, "") || ".";
  if (normalized !== ".") safeRelativePath(normalized, "corpus sourceRoot");
  return normalized;
}

export function corpusCaseId(project, path) {
  if (typeof project !== "string" || !projectNamePattern.test(project)) throw new Error(`invalid corpus project name '${project}'`);
  return `${project}/${safeRelativePath(normalizePath(path), "corpus case path")}`;
}

function corpusCompilerPath(project, path) {
  return `/corpus/${corpusCaseId(project, path)}`;
}

export async function acquireCorpusTstsBuild(noBuild, implementation = ensureTstsBuild) {
  if (typeof noBuild !== "boolean") throw new Error("corpus TSTS noBuild request must be boolean");
  return implementation({ repoRoot, packageRoot, buildRoot: tstsBuildRoot, noBuild });
}

export async function publishCorpusReport(staging, destination) {
  await mkdir(dirname(destination), { recursive: true });
  return publishSealedDirectory(staging, destination);
}

function relocationSafeTstsBuildProvenance(build) {
  return preparedTstsBuildEvidence(build);
}

async function ensureTsgoDumpBinary() {
  const sourcePin = readSourcePin();
  return ensurePinnedGoProducer({
    label: "TS-Go AST parity producer",
    sourceRoot: vendorRoot,
    expectedRevision: sourcePin.pin.revision,
    package: "./cmd/tsts-ast-dump",
    outputName: process.platform === "win32" ? "tsgo-ast-dump.exe" : "tsgo-ast-dump",
    cacheRoot: helperToolRoot,
    buildRoot: helperBuildRoot,
    overlayFiles: [{ source: helperSourcePath, destination: "cmd/tsts-ast-dump/main.go" }],
    additionalProvenance: { sourcePinSha256: sourcePin.sha256 },
  });
}

async function createTstsDumper(distDirectory) {
  const distRoot = join(distDirectory, "src");
  const parserPath = join(distRoot, "internal/parser/parser/statements-declarations.js");
  if (!existsSync(parserPath)) {
    throw new Error(`TSTS dist parser not found at ${relative(repoRoot, parserPath)}; run npx tsc -p packages/tsts/tsconfig.json`);
  }
  const jsdocModule = await import(pathToFileURL(join(distRoot, "internal/parser/jsdoc.js")).href);
  jsdocModule.init();
  const parserModule = await import(pathToFileURL(parserPath).href);
  const coreModule = await import(pathToFileURL(join(distRoot, "internal/core/core.js")).href);
  const scriptKindModule = await import(pathToFileURL(join(distRoot, "internal/core/scriptkind_stringer_generated.js")).href);
  const astModule = await import(pathToFileURL(join(distRoot, "internal/ast/ast.js")).href);
  const diagnosticModule = await import(pathToFileURL(join(distRoot, "internal/ast/diagnostic.js")).href);
  const kindModule = await import(pathToFileURL(join(distRoot, "internal/ast/generated/kinds.js")).href);

  return {
    async dump(file, sourceText) {
      const scriptKind = coreModule.GetScriptKindFromFileName(file.logicalPath);
      const sourceFile = parserModule.ParseSourceFile({
        FileName: file.logicalPath,
        Path: file.logicalPath,
      }, sourceText, scriptKind);
      return {
        schemaVersion: 1,
        compiler: "tsts",
        fileName: file.logicalPath,
        scriptKind: scriptKindModule.ScriptKind_String(scriptKind),
        scriptKindId: scriptKind,
        sourceFile: {
          isDeclarationFile: sourceFile.IsDeclarationFile,
          containsNonAscii: sourceFile.ContainsNonASCII,
          nodeCount: sourceFile.NodeCount,
          textCount: sourceFile.TextCount,
          identifierCount: sourceFile.IdentifierCount,
          path: astModule.SourceFile_Path(sourceFile),
        },
        diagnostics: {
          parse: dumpTstsDiagnosticList(astModule.SourceFile_Diagnostics(sourceFile), diagnosticModule),
          js: dumpTstsDiagnosticList(astModule.SourceFile_JSDiagnostics(sourceFile), diagnosticModule),
          jsdoc: dumpTstsDiagnosticList(astModule.SourceFile_JSDocDiagnostics(sourceFile), diagnosticModule),
        },
        root: dumpTstsNode(sourceFile, sourceFile, astModule, kindModule),
      };
    },
  };
}

function dumpTstsNode(node, sourceFile, astModule, kindModule) {
  if (node === undefined) {
    return undefined;
  }
  const result = {
    kind: kindModule.KindString(node.Kind),
    kindId: node.Kind,
    pos: node.Loc.pos,
    end: node.Loc.end,
    flags: node.Flags,
    children: [],
    childCount: 0,
  };

  const text = safeTstsText(() => astModule.Node_Text(node));
  if (text !== undefined) {
    result.text = text;
  }
  const rawText = safeTstsText(() => astModule.Node_RawText(node));
  if (rawText !== undefined) {
    result.rawText = rawText;
  }

  node.data.ForEachChild((child) => {
    result.children.push(dumpTstsNode(child, sourceFile, astModule, kindModule));
    return false;
  });
  result.childCount = result.children.length;

  const jsdoc = astModule.Node_JSDoc(node, sourceFile).map((child) => dumpTstsNode(child, sourceFile, astModule, kindModule));
  if (jsdoc.length > 0) {
    result.jsdoc = jsdoc;
    result.jsdocCount = jsdoc.length;
  }
  return result;
}

function safeTstsText(callback) {
  try {
    return callback();
  } catch {
    return undefined;
  }
}

function dumpTstsDiagnosticList(diags, diagnosticModule) {
  if (diags === undefined || diags.length === 0) {
    return null;
  }
  return diags.map((diag) => ({
    code: diagnosticModule.Diagnostic_Code(diag),
    pos: diagnosticModule.Diagnostic_Pos(diag),
    end: diagnosticModule.Diagnostic_End(diag),
  }));
}

function runTsgoDump(binary, file, sourceBytes) {
  const result = spawnSync(binary, ["--stdin", "--logical", file.logicalPath], {
    cwd: repoRoot,
    input: sourceBytes,
    env: fixedNodeEnvironment(),
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error !== undefined) {
    throw result.error;
  }
  if (result.status !== 0 || result.signal !== null) {
    throw new Error(`TS-Go AST dump failed for ${file.project.name}/${file.relativePath}\n${result.stderr}`);
  }
  return JSON.parse(result.stdout);
}

async function prepareExecutionEnvironment() {
  if (process.execArgv.length !== 0) throw new Error(`corpus execution rejects Node execArgv: ${process.execArgv.join(" ")}`);
  const rejected = rejectedRuntimeEnvironment.filter((key) => process.env[key] !== undefined && process.env[key] !== "");
  if (rejected.length !== 0) throw new Error(`corpus execution rejects ambient environment: ${rejected.join(", ")}`);

  preparedGitExecutable = resolveExecutable("git", process.env);
  const runtimeDirectory = join(tempRoot, "runtime");
  const controlledPaths = process.platform === "win32"
    ? {
        HOME: join(runtimeDirectory, "home"),
        USERPROFILE: join(runtimeDirectory, "home"),
        TEMP: join(runtimeDirectory, "tmp"),
        TMP: join(runtimeDirectory, "tmp"),
        GOPATH: join(runtimeDirectory, "go/path"),
        GOMODCACHE: join(runtimeDirectory, "go/mod"),
        GOCACHE: join(runtimeDirectory, "go/cache"),
        XDG_CACHE_HOME: join(runtimeDirectory, "xdg/cache"),
        XDG_CONFIG_HOME: join(runtimeDirectory, "xdg/config"),
      }
    : {
        HOME: join(runtimeDirectory, "home"),
        TMPDIR: join(runtimeDirectory, "tmp"),
        GOPATH: join(runtimeDirectory, "go/path"),
        GOMODCACHE: join(runtimeDirectory, "go/mod"),
        GOCACHE: join(runtimeDirectory, "go/cache"),
        XDG_CACHE_HOME: join(runtimeDirectory, "xdg/cache"),
        XDG_CONFIG_HOME: join(runtimeDirectory, "xdg/config"),
      };
  await Promise.all([...new Set(Object.values(controlledPaths))].map((directory) => mkdir(directory, { recursive: true })));

  const originalPath = process.env.PATH ?? "";
  process.env.PATH = prependSearchPath(originalPath, [dirname(preparedGitExecutable), dirname(process.execPath)]);
  for (const key of Object.keys(process.env)) if (key.startsWith("GIT_")) delete process.env[key];
  Object.assign(process.env, fixedEnvironment, controlledPaths, materializedCanonicalGitEnvironment());
  process.umask(0o022);

  const controlledEnvironment = Object.fromEntries(Object.keys(controlledPaths).sort(compareUtf8).map((key) => [key, `<runtime-${key.toLowerCase().replaceAll("_", "-")}>`]));
  return {
    schemaVersion: 1,
    umask: "0022",
    searchPath: byteDigest(Buffer.from(process.env.PATH, "utf8")),
    controlledEnvironment,
    rejectedEnvironment: [...rejectedRuntimeEnvironment],
    networkEnvironment: hashedEnvironment(["ALL_PROXY", "HTTPS_PROXY", "HTTP_PROXY", "NO_PROXY", "all_proxy", "https_proxy", "http_proxy", "no_proxy"]),
    systemEnvironment: hashedEnvironment(process.platform === "win32" ? ["ComSpec", "PATHEXT", "SystemRoot"] : []),
  };
}

function selectedLocaleProvenance() {
  const locale = Intl.DateTimeFormat().resolvedOptions();
  return { locale: locale.locale, calendar: locale.calendar, numberingSystem: locale.numberingSystem, timeZone: locale.timeZone };
}

function canonicalGitProvenance() {
  const executable = preparedGitExecutable ?? resolveExecutable("git", process.env);
  const version = gitCapture(["--version"], repoRoot).trim();
  return {
    schemaVersion: 1,
    executable: executableProvenance(executable),
    version,
    arguments: canonicalGitArgumentEvidence,
    environment: canonicalGitEnvironmentEvidence,
  };
}

function toComparableDump(dump) {
  return {
    schemaVersion: dump.schemaVersion,
    fileName: dump.fileName,
    scriptKind: dump.scriptKind,
    scriptKindId: dump.scriptKindId,
    sourceFile: dump.sourceFile,
    diagnostics: normalizeNullArrays(dump.diagnostics),
    root: normalizeNullArrays(dump.root),
  };
}

function normalizeNullArrays(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeNullArrays);
  }
  if (value === null || value === undefined) {
    return [];
  }
  if (typeof value !== "object") {
    return value;
  }
  const result = {};
  for (const key of Object.keys(value).sort()) {
    const child = value[key];
    if ((key === "jsdoc" || key === "children" || key === "parse" || key === "js") && child === undefined) {
      result[key] = [];
    } else {
      result[key] = normalizeNullArrays(child);
    }
  }
  return result;
}

function firstMismatch(expected, actual, path = "$") {
  if (Object.is(expected, actual)) {
    return undefined;
  }
  if (typeof expected !== typeof actual) {
    return { path, expected, actual };
  }
  if (expected === null || actual === null || typeof expected !== "object") {
    return { path, expected, actual };
  }
  if (Array.isArray(expected) || Array.isArray(actual)) {
    if (!Array.isArray(expected) || !Array.isArray(actual)) {
      return { path, expected, actual };
    }
    if (expected.length !== actual.length) {
      return { path: `${path}.length`, expected: expected.length, actual: actual.length };
    }
    for (let index = 0; index < expected.length; index++) {
      const mismatch = firstMismatch(expected[index], actual[index], `${path}[${index}]`);
      if (mismatch !== undefined) {
        return mismatch;
      }
    }
    return undefined;
  }

  const expectedKeys = Object.keys(expected).sort();
  const actualKeys = Object.keys(actual).sort();
  const keyMismatch = firstMismatch(expectedKeys, actualKeys, `${path}.keys`);
  if (keyMismatch !== undefined) {
    return keyMismatch;
  }
  for (const key of expectedKeys) {
    const mismatch = firstMismatch(expected[key], actual[key], `${path}.${key}`);
    if (mismatch !== undefined) {
      return mismatch;
    }
  }
  return undefined;
}

export function renderCorpusSummary(summary) {
  const lines = [
    "# Corpus AST Parity Summary",
    "",
    `- Manifest: ${summary.manifest}`,
    `- Total files: ${summary.totalFiles}`,
    `- Passed files: ${summary.passedFiles}`,
    `- Failed files: ${summary.failedFiles}`,
    "",
  ];
  if (summary.failures.length > 0) {
    lines.push("## Failures", "");
    for (const failure of summary.failures.slice(0, 50)) {
      lines.push(`- ${failure.project}/${failure.file}: ${failure.path}`);
      lines.push(`  - TS-Go: ${formatValue(failure.expected)}`);
      lines.push(`  - TSTS: ${formatValue(failure.actual)}`);
    }
    if (summary.failures.length > 50) {
      lines.push(`- ... ${summary.failures.length - 50} more failures`);
    }
  }
  return lines.join("\n") + "\n";
}

export function validateCorpusCaseResults(evidenceId, selection, caseResults, summary) {
  assertSha256(evidenceId, "corpus evidenceId");
  validateCorpusSelection(selection);
  if (!Array.isArray(caseResults) || caseResults.length !== selection.length) throw new Error("corpus result coverage is incomplete");
  const caseIds = new Set();
  const failures = [];
  for (let index = 0; index < selection.length; index += 1) {
    const expected = selection[index];
    const result = caseResults[index];
    assertExactObjectKeys(result, ["artifacts", "caseFingerprint", "caseId", "caseIndex", "input", "mismatch", "status"], `corpus result ${index}`);
    const caseId = corpusCaseId(expected.project, expected.path);
    if (result.caseIndex !== index || result.caseId !== caseId || caseIds.has(caseId)) throw new Error(`invalid corpus result identity at index ${index}`);
    validateInputReceipt(result.input, expected, `corpus result ${index} input`);
    const expectedFingerprint = fingerprint({ evidenceId, caseIndex: index, caseId, input: result.input }, "tsts-corpus-case-v1");
    assertSha256(result.caseFingerprint, `corpus result ${index} caseFingerprint`);
    if (result.caseFingerprint !== expectedFingerprint) throw new Error(`corpus case fingerprint mismatch at index ${index}`);
    if (result.status !== "pass" && result.status !== "fail") throw new Error(`invalid corpus result status at index ${index}`);
    if (result.status === "pass") {
      if (result.mismatch !== null || result.artifacts !== null) throw new Error(`corpus passing result carries failure evidence at index ${index}`);
    } else {
      validateMismatch(result.mismatch, `corpus result ${index} mismatch`);
      validateArtifactReferences(result.artifacts, expected, `corpus result ${index} artifacts`);
      failures.push({ project: expected.project, file: expected.path, path: result.mismatch.path, expected: result.mismatch.expected, actual: result.mismatch.actual });
    }
    caseIds.add(caseId);
  }
  validateCorpusSummary(summary, evidenceId, selection, caseResults, failures);
}

export function verifyCorpusReport(reportPath) {
  if (typeof reportPath !== "string" || reportPath === "") throw new Error("verify requires --report path");
  const directory = resolve(repoRoot, reportPath);
  const seal = verifyEvidenceDirectory(directory);
  const resultsFile = readSealedJson(directory, "results.json", seal, "corpus results");
  const results = resultsFile.value;
  validateCorpusResultsDocument(results);
  assertSerializedJson(resultsFile.text, { schemaVersion: 1, evidenceId: results.evidenceId, evidence: results.evidence, summary: results.summary, caseResults: results.caseResults }, 2, "corpus results");

  const runFile = readSealedJson(directory, "RUN.json", seal, "corpus RUN.json");
  const run = runFile.value;
  assertExactObjectKeys(run, ["evidence", "evidenceId", "schemaVersion"], "corpus RUN.json");
  if (run.schemaVersion !== 1 || run.evidenceId !== results.evidenceId || canonicalJson(run.evidence) !== canonicalJson(results.evidence)) throw new Error("corpus RUN.json does not match results evidence");
  assertSerializedJson(runFile.text, { schemaVersion: 1, evidenceId: run.evidenceId, evidence: run.evidence }, 2, "corpus RUN.json");

  const summaryBytes = readSealedFile(directory, "summary.md", seal, "corpus summary");
  const summaryText = summaryBytes.toString("utf8");
  if (!Buffer.from(summaryText, "utf8").equals(summaryBytes)) throw new Error("corpus summary is not valid UTF-8");
  if (summaryText !== renderCorpusSummary(results.summary)) throw new Error("corpus summary markdown does not match results");
  verifyFailureArtifacts(directory, seal, results);
  verifyCorpusInventory(seal, results.caseResults);

  assertExactObjectKeys(seal.metadata, ["counts", "evidenceId", "outcome"], "corpus seal metadata");
  assertExactObjectKeys(seal.metadata.counts, ["failed", "passed", "total"], "corpus seal counts");
  const expectedOutcome = results.summary.failedFiles === 0 ? "passed" : "failed";
  if (seal.metadata.evidenceId !== results.evidenceId || seal.metadata.outcome !== expectedOutcome || canonicalJson(seal.metadata.counts) !== canonicalJson({ total: results.summary.totalFiles, passed: results.summary.passedFiles, failed: results.summary.failedFiles })) {
    throw new Error("corpus seal metadata does not match results");
  }
  return { directory, seal, results };
}

function validateCorpusResultsDocument(results) {
  assertExactObjectKeys(results, ["caseResults", "evidence", "evidenceId", "schemaVersion", "summary"], "corpus results");
  if (results.schemaVersion !== 1) throw new Error("unsupported corpus results schemaVersion");
  assertSha256(results.evidenceId, "corpus results evidenceId");
  validateCorpusEvidence(results.evidence);
  if (results.evidenceId !== fingerprint(results.evidence, "tsts-corpus-ast-parity-v1")) throw new Error("corpus evidence fingerprint mismatch");
  if (canonicalJson(results.summary?.evidence) !== canonicalJson(results.evidence)) throw new Error("corpus summary evidence does not match results evidence");
  validateCorpusCaseResults(results.evidenceId, results.evidence.selection, results.caseResults, results.summary);
}

function validateCorpusSummary(summary, evidenceId, selection, caseResults, expectedFailures) {
  assertExactObjectKeys(summary, ["evidence", "evidenceId", "failedFiles", "failures", "inputDigest", "manifest", "passedFiles", "schemaVersion", "totalFiles"], "corpus summary");
  if (summary.schemaVersion !== 2) throw new Error("unsupported corpus summary schemaVersion");
  assertSha256(summary.evidenceId, "corpus summary evidenceId");
  assertSha256(summary.inputDigest, "corpus summary inputDigest");
  assertNonNegativeInteger(summary.totalFiles, "corpus summary totalFiles");
  assertNonNegativeInteger(summary.passedFiles, "corpus summary passedFiles");
  assertNonNegativeInteger(summary.failedFiles, "corpus summary failedFiles");
  if (summary.evidenceId !== evidenceId || canonicalJson(summary.evidence?.selection) !== canonicalJson(selection)) throw new Error("corpus summary evidence does not match results evidence");
  if (typeof summary.manifest !== "string" || summary.manifest !== summary.evidence.manifest.path) throw new Error("corpus summary manifest does not match evidence");
  if (summary.totalFiles !== selection.length || summary.failedFiles !== expectedFailures.length || summary.passedFiles !== selection.length - expectedFailures.length) throw new Error("corpus summary counts do not match case results");
  if (summary.passedFiles + summary.failedFiles !== summary.totalFiles) throw new Error("corpus summary counts are contradictory");
  if (canonicalJson(summary.failures) !== canonicalJson(expectedFailures)) throw new Error("corpus summary failures do not match case results");
  if (summary.inputDigest !== fingerprint(caseResults.map((result) => result.input), "tsts-corpus-input-receipts-v1")) throw new Error("corpus summary input digest mismatch");
}

function validateInputReceipt(input, selection, label) {
  assertExactObjectKeys(input, ["blobOid", "compilerInputBytes", "compilerInputSha256", "file", "originalSha256", "project"], label);
  if (input.project !== selection.project || input.file !== selection.path || input.blobOid !== selection.blobOid) throw new Error(`${label} does not match corpus selection`);
  assertSha256(input.originalSha256, `${label} originalSha256`);
  assertSha256(input.compilerInputSha256, `${label} compilerInputSha256`);
  assertNonNegativeInteger(input.compilerInputBytes, `${label} compilerInputBytes`);
}

function validateMismatch(mismatch, label) {
  assertExactObjectKeys(mismatch, ["actual", "expected", "path"], label);
  if (typeof mismatch.path !== "string" || !mismatch.path.startsWith("$") || /[\r\n\0]/.test(mismatch.path)) throw new Error(`${label} has an invalid path`);
  canonicalJson(mismatch.expected);
  canonicalJson(mismatch.actual);
  if (canonicalJson(mismatch.expected) === canonicalJson(mismatch.actual)) throw new Error(`${label} does not describe differing values`);
}

function validateArtifactReferences(artifacts, selection, label) {
  assertExactObjectKeys(artifacts, ["tsgo", "tsts"], label);
  const stem = safeOutputName(selection.path);
  const base = `mismatches/${selection.project}/${stem}`;
  const expected = { tsgo: `${base}.tsgo.json`, tsts: `${base}.tsts.json` };
  if (canonicalJson(artifacts) !== canonicalJson(expected)) throw new Error(`${label} does not use the exact case artifact paths`);
}

function validateCorpusEvidence(evidence) {
  assertExactObjectKeys(evidence, ["drivers", "invocation", "manifest", "projects", "runtime", "schemaVersion", "selection", "selectionDigest", "sourcePin", "tsgoProducer", "tstsBuild"], "corpus evidence");
  if (evidence.schemaVersion !== 1) throw new Error("unsupported corpus evidence schemaVersion");

  assertExactObjectKeys(evidence.manifest, ["path", "sha256"], "corpus evidence manifest");
  safeRelativePath(evidence.manifest.path, "corpus evidence manifest path");
  assertSha256(evidence.manifest.sha256, "corpus evidence manifest sha256");

  validateSourcePinEvidence(evidence.sourcePin);
  validateCorpusInvocation(evidence.invocation);
  validateCorpusRuntime(evidence.runtime);
  validateInputRoots(evidence.drivers, "corpus evidence drivers");
  const expectedDriverLabels = ["corpus-driver", "corpus-manifest", "pinned-producer-helper", "provenance-helper", "sealed-evidence-helper", "source-pin", "source-pin-verifier", "tsgo-dump-helper"];
  if (canonicalJson(evidence.drivers.roots.map((root) => root.label).sort(compareUtf8)) !== canonicalJson(expectedDriverLabels)) throw new Error("corpus evidence driver coverage is incomplete");

  const projects = validateCorpusProjects(evidence.projects);
  validateCorpusSelection(evidence.selection, projects);
  assertSha256(evidence.selectionDigest, "corpus evidence selectionDigest");
  if (evidence.selectionDigest !== fingerprint(evidence.selection, "tsts-corpus-selection-v1")) throw new Error("corpus selection digest mismatch");

  validateTsgoProducerEvidence(evidence.tsgoProducer, evidence.sourcePin);
  validateTstsBuildEvidence(evidence.tstsBuild);
}

function validateSourcePinEvidence(sourcePin) {
  assertExactObjectKeys(sourcePin, ["nestedSources", "revision", "sha256"], "corpus source pin evidence");
  assertSha256(sourcePin.sha256, "corpus source pin sha256");
  assertAnyObjectId(sourcePin.revision, "corpus source pin revision");
  if (!Array.isArray(sourcePin.nestedSources)) throw new Error("corpus source pin nestedSources must be an array");
  const names = new Set();
  for (const [index, nested] of sourcePin.nestedSources.entries()) {
    assertExactObjectKeys(nested, ["checkout", "gitObjectFormat", "goPolicy", "name", "path", "revision"], `corpus nested source ${index}`);
    if (typeof nested.name !== "string" || nested.name === "" || names.has(nested.name)) throw new Error(`invalid corpus nested source name at index ${index}`);
    safeRelativePath(nested.path, `corpus nested source ${index} path`);
    validateCheckoutProvenance(nested.checkout, `corpus nested source ${index} checkout`);
    if (nested.gitObjectFormat !== nested.checkout.objectFormat || nested.revision !== nested.checkout.revision) throw new Error(`corpus nested source ${index} checkout identity mismatch`);
    if (typeof nested.goPolicy !== "string" || nested.goPolicy === "") throw new Error(`corpus nested source ${index} goPolicy is invalid`);
    names.add(nested.name);
  }
}

function validateCorpusInvocation(invocation) {
  assertExactObjectKeys(invocation, ["file", "limit", "noBuild", "noSetup", "pretty", "project"], "corpus invocation");
  if (invocation.project !== null && (typeof invocation.project !== "string" || !projectNamePattern.test(invocation.project))) throw new Error("corpus invocation project is invalid");
  if (invocation.file !== null) safeRelativePath(invocation.file, "corpus invocation file");
  if (invocation.limit !== null) assertNonNegativeInteger(invocation.limit, "corpus invocation limit");
  for (const key of ["noBuild", "noSetup", "pretty"]) if (typeof invocation[key] !== "boolean") throw new Error(`corpus invocation ${key} must be boolean`);
}

function validateCorpusRuntime(runtime) {
  assertExactObjectKeys(runtime, ["arch", "conditions", "environment", "execArgv", "executable", "git", "locale", "platform", "version", "versions"], "corpus runtime");
  validateExecutableProvenance(runtime.executable, "corpus Node executable");
  if (typeof runtime.version !== "string" || runtime.version === "") throw new Error("corpus Node version is invalid");
  validateStringMap(runtime.versions, "corpus Node versions");
  if (!Array.isArray(runtime.execArgv) || runtime.execArgv.length !== 0) throw new Error("corpus runtime execArgv must be empty");
  if (typeof runtime.platform !== "string" || runtime.platform === "" || typeof runtime.arch !== "string" || runtime.arch === "") throw new Error("corpus runtime platform is invalid");
  assertExactObjectKeys(runtime.locale, ["calendar", "locale", "numberingSystem", "timeZone"], "corpus runtime locale");
  for (const value of Object.values(runtime.locale)) if (typeof value !== "string" || value === "") throw new Error("corpus runtime locale contains an invalid value");
  if (runtime.locale.timeZone !== "UTC") throw new Error("corpus runtime timezone is not UTC");
  if (canonicalJson(runtime.environment) !== canonicalJson(fixedEnvironment)) throw new Error("corpus runtime semantic environment is invalid");
  validateExecutionConditions(runtime.conditions);
  validateGitProvenance(runtime.git);
}

function validateExecutionConditions(conditions) {
  assertExactObjectKeys(conditions, ["controlledEnvironment", "networkEnvironment", "rejectedEnvironment", "schemaVersion", "searchPath", "systemEnvironment", "umask"], "corpus execution conditions");
  if (conditions.schemaVersion !== 1 || conditions.umask !== "0022") throw new Error("corpus execution conditions are unsupported");
  validateByteDigest(conditions.searchPath, "corpus execution searchPath");
  validateStringMap(conditions.controlledEnvironment, "corpus controlled environment");
  for (const value of Object.values(conditions.controlledEnvironment)) if (!/^<runtime-[a-z0-9-]+>$/.test(value)) throw new Error("corpus controlled environment contains an absolute path");
  if (canonicalJson(conditions.rejectedEnvironment) !== canonicalJson(rejectedRuntimeEnvironment)) throw new Error("corpus rejected environment policy mismatch");
  assertPlainObject(conditions.networkEnvironment, "corpus network environment");
  for (const [key, digest] of Object.entries(conditions.networkEnvironment)) {
    if (!new Set(["ALL_PROXY", "HTTPS_PROXY", "HTTP_PROXY", "NO_PROXY", "all_proxy", "https_proxy", "http_proxy", "no_proxy"]).has(key)) throw new Error(`unsupported corpus network environment '${key}'`);
    validateByteDigest(digest, `corpus network environment ${key}`);
  }
  assertPlainObject(conditions.systemEnvironment, "corpus system environment");
  for (const [key, digest] of Object.entries(conditions.systemEnvironment)) {
    if (!new Set(["ComSpec", "PATHEXT", "SystemRoot"]).has(key)) throw new Error(`unsupported corpus system environment '${key}'`);
    validateByteDigest(digest, `corpus system environment ${key}`);
  }
}

function validateGitProvenance(git) {
  assertExactObjectKeys(git, ["arguments", "environment", "executable", "schemaVersion", "version"], "corpus Git provenance");
  if (git.schemaVersion !== 1 || typeof git.version !== "string" || !/^git version \S+/.test(git.version)) throw new Error("corpus Git version is invalid");
  validateExecutableProvenance(git.executable, "corpus Git executable");
  if (canonicalJson(git.arguments) !== canonicalJson(canonicalGitArgumentEvidence) || canonicalJson(git.environment) !== canonicalJson(canonicalGitEnvironmentEvidence)) throw new Error("corpus Git invocation is not canonical");
}

function validateCorpusProjects(projects) {
  if (!Array.isArray(projects) || projects.length === 0) throw new Error("corpus evidence projects must be non-empty");
  const byName = new Map();
  for (const [index, project] of projects.entries()) {
    assertExactObjectKeys(project, ["checkout", "expectedCommit", "name", "repository"], `corpus evidence project ${index}`);
    if (typeof project.name !== "string" || !projectNamePattern.test(project.name) || byName.has(project.name)) throw new Error(`invalid corpus evidence project name at index ${index}`);
    if (typeof project.repository !== "string" || !/^https:\/\//.test(project.repository)) throw new Error(`invalid corpus evidence repository at index ${index}`);
    validateCheckoutProvenance(project.checkout, `corpus evidence project ${index} checkout`);
    assertObjectId(project.expectedCommit, project.checkout.objectFormat, `corpus evidence project ${index} expectedCommit`);
    if (project.expectedCommit !== project.checkout.revision) throw new Error(`corpus evidence project ${index} checkout revision mismatch`);
    byName.set(project.name, project);
  }
  return byName;
}

function validateCheckoutProvenance(checkout, label) {
  assertExactObjectKeys(checkout, ["dirty", "objectFormat", "revision", "tree"], label);
  if (checkout.objectFormat !== "sha1" && checkout.objectFormat !== "sha256") throw new Error(`${label} object format is invalid`);
  assertObjectId(checkout.revision, checkout.objectFormat, `${label} revision`);
  assertObjectId(checkout.tree, checkout.objectFormat, `${label} tree`);
  if (checkout.dirty !== false) throw new Error(`${label} must be clean`);
}

function validateCorpusSelection(selection, projects) {
  if (!Array.isArray(selection) || selection.length === 0) throw new Error("corpus selection must be a non-empty array");
  const caseIds = new Set();
  const gitIdentities = new Set();
  for (const [index, entry] of selection.entries()) {
    assertExactObjectKeys(entry, ["blobOid", "gitPath", "path", "project"], `corpus selection ${index}`);
    if (typeof entry.project !== "string" || !projectNamePattern.test(entry.project)) throw new Error(`corpus selection ${index} has invalid project`);
    safeRelativePath(entry.path, `corpus selection ${index} path`);
    safeRelativePath(entry.gitPath, `corpus selection ${index} gitPath`);
    const project = projects?.get(entry.project);
    if (projects !== undefined && project === undefined) throw new Error(`corpus selection ${index} references an unknown project`);
    if (project === undefined) assertAnyObjectId(entry.blobOid, `corpus selection ${index} blobOid`);
    else assertObjectId(entry.blobOid, project.checkout.objectFormat, `corpus selection ${index} blobOid`);
    const caseId = corpusCaseId(entry.project, entry.path);
    const gitIdentity = `${entry.project}\0${entry.gitPath}`;
    if (caseIds.has(caseId) || gitIdentities.has(gitIdentity)) throw new Error(`duplicate corpus selection identity at index ${index}`);
    caseIds.add(caseId);
    gitIdentities.add(gitIdentity);
  }
}

function validateInputRoots(inputRoots, label) {
  assertExactObjectKeys(inputRoots, ["digest", "roots", "schemaVersion"], label);
  if (inputRoots.schemaVersion !== 1 || !Array.isArray(inputRoots.roots)) throw new Error(`${label} is invalid`);
  assertSha256(inputRoots.digest, `${label} digest`);
  const labels = new Set();
  for (const [index, root] of inputRoots.roots.entries()) {
    validateInputRoot(root, `${label} root ${index}`);
    if (labels.has(root.label)) throw new Error(`${label} contains duplicate root label '${root.label}'`);
    labels.add(root.label);
  }
  if (inputRoots.digest !== fingerprint(inputRoots.roots, "tsts-input-roots-v1")) throw new Error(`${label} digest mismatch`);
}

function validateInputRoot(root, label) {
  assertExactObjectKeys(root, ["bytes", "digest", "fileCount", "kind", "label", "mode", "symlinkCount", "symlinkPolicy"], label);
  if (typeof root.label !== "string" || root.label === "") throw new Error(`${label} has invalid label`);
  if (root.kind !== "file" && root.kind !== "directory") throw new Error(`${label} has invalid kind`);
  if (root.symlinkPolicy !== "reject" && root.symlinkPolicy !== "resolved-contained") throw new Error(`${label} has invalid symlink policy`);
  assertNonNegativeInteger(root.mode, `${label} mode`);
  if (root.mode > 0o777) throw new Error(`${label} mode is out of range`);
  assertNonNegativeInteger(root.fileCount, `${label} fileCount`);
  assertNonNegativeInteger(root.symlinkCount, `${label} symlinkCount`);
  assertNonNegativeInteger(root.bytes, `${label} bytes`);
  assertSha256(root.digest, `${label} digest`);
}

function validateTsgoProducerEvidence(producer, sourcePin) {
  assertExactObjectKeys(producer, ["binary", "buildMetadata", "producerId", "request", "schemaVersion"], "corpus TS-Go producer");
  if (producer.schemaVersion !== 2) throw new Error("unsupported corpus TS-Go producer schemaVersion");
  assertSha256(producer.producerId, "corpus TS-Go producerId");
  if (producer.producerId !== fingerprint(producer.request, "tsts-pinned-go-producer-v2")) throw new Error("corpus TS-Go producerId mismatch");

  const request = producer.request;
  assertExactObjectKeys(request, ["additionalProvenance", "build", "git", "label", "outputName", "overlays", "producerDriver", "schemaVersion", "source", "sourceModule", "sourceTree"], "corpus TS-Go producer request");
  if (request.schemaVersion !== 2 || typeof request.label !== "string" || request.label === "") throw new Error("corpus TS-Go producer request is invalid");
  if (typeof request.outputName !== "string" || !/^[a-zA-Z0-9._-]+$/.test(request.outputName)) throw new Error("corpus TS-Go producer outputName is invalid");
  validateProducerCheckoutProvenance(request.source, "corpus TS-Go producer source");
  if (request.source.revision !== sourcePin.revision) throw new Error("corpus TS-Go producer source does not match source pin");
  assertExactObjectKeys(request.additionalProvenance, ["sourcePinSha256"], "corpus TS-Go additional provenance");
  if (request.additionalProvenance.sourcePinSha256 !== sourcePin.sha256) throw new Error("corpus TS-Go producer source pin digest mismatch");
  validateByteDigest(request.producerDriver, "corpus TS-Go producer driver");
  if (!Array.isArray(request.overlays)) throw new Error("corpus TS-Go producer overlays must be an array");
  const overlayDestinations = new Set();
  for (const [index, overlay] of request.overlays.entries()) {
    assertExactObjectKeys(overlay, ["destination", "input"], `corpus TS-Go overlay ${index}`);
    safeRelativePath(overlay.destination, `corpus TS-Go overlay ${index} destination`);
    validateByteDigest(overlay.input, `corpus TS-Go overlay ${index} input`);
    if (overlayDestinations.has(overlay.destination)) throw new Error(`duplicate corpus TS-Go overlay '${overlay.destination}'`);
    overlayDestinations.add(overlay.destination);
  }
  assertExactObjectKeys(request.sourceTree, ["bytes", "digest", "directoryCount", "fileCount", "gitlinkCount", "vcsStatus"], "corpus TS-Go source tree");
  for (const key of ["bytes", "directoryCount", "fileCount", "gitlinkCount"]) assertNonNegativeInteger(request.sourceTree[key], `corpus TS-Go source tree ${key}`);
  assertSha256(request.sourceTree.digest, "corpus TS-Go source tree digest");
  assertExactObjectKeys(request.sourceTree.vcsStatus, ["bytes", "modified", "sha256"], "corpus TS-Go source status");
  validateByteDigest({ bytes: request.sourceTree.vcsStatus.bytes, sha256: request.sourceTree.vcsStatus.sha256 }, "corpus TS-Go source status");
  if (typeof request.sourceTree.vcsStatus.modified !== "boolean") throw new Error("corpus TS-Go source status modified flag is invalid");
  if (typeof request.sourceModule !== "string" || request.sourceModule === "") throw new Error("corpus TS-Go source module is invalid");
  assertPlainObject(request.git, "corpus TS-Go Git provenance");
  validateTsgoBuildRequest(request.build);
  validateSemanticIntegrity(request, "corpus TS-Go producer request");

  assertExactObjectKeys(producer.binary, ["bytes", "name", "sha256"], "corpus TS-Go producer binary");
  if (producer.binary.name !== request.outputName) throw new Error("corpus TS-Go producer binary name mismatch");
  assertNonNegativeInteger(producer.binary.bytes, "corpus TS-Go producer binary bytes");
  if (producer.binary.bytes === 0) throw new Error("corpus TS-Go producer binary is empty");
  assertSha256(producer.binary.sha256, "corpus TS-Go producer binary sha256");
  assertExactObjectKeys(producer.buildMetadata, ["dependencies", "goVersion", "main", "path", "settings"], "corpus TS-Go build metadata");
  if (typeof producer.buildMetadata.goVersion !== "string" || producer.buildMetadata.goVersion === "" || typeof producer.buildMetadata.path !== "string" || producer.buildMetadata.path === "") throw new Error("corpus TS-Go build metadata is invalid");
  if (!Array.isArray(producer.buildMetadata.dependencies)) throw new Error("corpus TS-Go build metadata dependencies are invalid");
  assertPlainObject(producer.buildMetadata.main, "corpus TS-Go build metadata main module");
  validateStringMap(producer.buildMetadata.settings, "corpus TS-Go build settings");
  if (producer.buildMetadata.main.path !== request.sourceModule || producer.buildMetadata.settings["vcs.revision"] !== request.source.revision) throw new Error("corpus TS-Go build metadata source identity mismatch");
  validateSemanticIntegrity(producer.buildMetadata, "corpus TS-Go build metadata");
}

function validateTsgoBuildRequest(build) {
  assertExactObjectKeys(build, ["arguments", "dependencies", "environment", "package", "toolchain"], "corpus TS-Go build request");
  if (typeof build.package !== "string" || build.package === "" || !Array.isArray(build.arguments) || build.arguments.length === 0 || !build.arguments.every((value) => typeof value === "string" && value !== "")) throw new Error("corpus TS-Go build request is invalid");
  validateStringMap(build.environment, "corpus TS-Go build environment");
  assertPlainObject(build.toolchain, "corpus TS-Go toolchain");
  assertPlainObject(build.dependencies, "corpus TS-Go dependencies");
}

function validateProducerCheckoutProvenance(checkout, label) {
  assertExactObjectKeys(checkout, ["commitTime", "dirty", "objectFormat", "revision", "tree"], label);
  if (typeof checkout.commitTime !== "string" || Number.isNaN(Date.parse(checkout.commitTime))) throw new Error(`${label} commitTime is invalid`);
  validateCheckoutProvenance({ revision: checkout.revision, tree: checkout.tree, objectFormat: checkout.objectFormat, dirty: checkout.dirty }, label);
}

function validateTstsBuildEvidence(build) {
  assertExactObjectKeys(build, ["buildId", "evidenceDigest", "output", "request", "schemaVersion"], "corpus TSTS build");
  if (build.schemaVersion !== 3) throw new Error("unsupported corpus TSTS build schemaVersion");
  assertSha256(build.buildId, "corpus TSTS buildId");
  assertSha256(build.evidenceDigest, "corpus TSTS build evidenceDigest");
  if (build.buildId !== fingerprint(build.request, "tsts-prepared-build-v1")) throw new Error("corpus TSTS buildId mismatch");
  assertExactObjectKeys(build.request, ["command", "compiler", "environment", "inputs", "runtime", "schemaVersion"], "corpus TSTS build request");
  if (build.request.schemaVersion !== 3) throw new Error("unsupported corpus TSTS build request schemaVersion");
  const expectedCommand = ["<node>", "node_modules/typescript/bin/tsc", "-p", "packages/tsts/tsconfig.json", "--outDir", "<dist>", "--pretty", "false"];
  if (canonicalJson(build.request.command) !== canonicalJson(expectedCommand)) throw new Error("corpus TSTS build command is invalid or path-dependent");
  if (canonicalJson(build.request.environment) !== canonicalJson({ LANG: "C.UTF-8", LC_ALL: "C.UTF-8", NODE_OPTIONS: "", NODE_PATH: "", TZ: "UTC" })) throw new Error("corpus TSTS build environment is invalid");
  validateInputRoots(build.request.inputs, "corpus TSTS build inputs");
  assertExactObjectKeys(build.request.compiler, ["executable", "logicalPath"], "corpus TSTS build compiler");
  if (build.request.compiler.logicalPath !== "node_modules/typescript/bin/tsc") throw new Error("corpus TSTS build compiler path is invalid");
  validateExecutableProvenance(build.request.compiler.executable, "corpus TypeScript compiler executable");
  assertExactObjectKeys(build.request.runtime, ["execArgv", "executable", "startupNodeOptions", "version", "versions"], "corpus TSTS build runtime");
  validateExecutableProvenance(build.request.runtime.executable, "corpus TSTS build Node executable");
  if (typeof build.request.runtime.version !== "string" || build.request.runtime.version === "") throw new Error("corpus TSTS build Node version is invalid");
  if (!Array.isArray(build.request.runtime.execArgv) || build.request.runtime.execArgv.length !== 0 || build.request.runtime.startupNodeOptions !== "") throw new Error("corpus TSTS build startup conditions are invalid");
  validateStringMap(build.request.runtime.versions, "corpus TSTS build Node versions");
  validateInputRoot(build.output, "corpus TSTS build output");
}

function verifyFailureArtifacts(directory, seal, results) {
  const spacing = results.evidence.invocation.pretty ? 2 : 0;
  for (const [index, result] of results.caseResults.entries()) {
    if (result.status === "pass") continue;
    const envelopes = {};
    for (const compiler of ["tsgo", "tsts"]) {
      const artifact = readSealedJson(directory, result.artifacts[compiler], seal, `corpus result ${index} ${compiler} artifact`);
      const envelope = artifact.value;
      assertExactObjectKeys(envelope, ["dump", "evidenceId", "input"], `corpus result ${index} ${compiler} artifact`);
      if (envelope.evidenceId !== results.evidenceId || canonicalJson(envelope.input) !== canonicalJson(result.input)) throw new Error(`corpus result ${index} ${compiler} artifact identity mismatch`);
      const file = { project: { name: result.input.project }, relativePath: result.input.file, logicalPath: corpusCompilerPath(result.input.project, result.input.file) };
      assertDumpProducer(envelope.dump, compiler, file);
      assertSerializedJson(artifact.text, { evidenceId: envelope.evidenceId, input: envelope.input, dump: envelope.dump }, spacing, `corpus result ${index} ${compiler} artifact`);
      envelopes[compiler] = envelope;
    }
    const mismatch = firstMismatch(toComparableDump(envelopes.tsgo.dump), toComparableDump(envelopes.tsts.dump));
    if (mismatch === undefined || canonicalJson(mismatch) !== canonicalJson(result.mismatch)) throw new Error(`corpus result ${index} failure artifacts do not prove its mismatch`);
  }
}

function verifyCorpusInventory(seal, caseResults) {
  const expected = [
    { path: "RUN.json", kind: "file" },
    { path: "results.json", kind: "file" },
    { path: "summary.md", kind: "file" },
  ];
  const directories = new Set();
  for (const result of caseResults) {
    if (result.artifacts === null) continue;
    for (const path of [result.artifacts.tsgo, result.artifacts.tsts]) {
      const parts = path.split("/");
      for (let count = 1; count < parts.length; count += 1) directories.add(parts.slice(0, count).join("/"));
      expected.push({ path, kind: "file" });
    }
  }
  for (const path of directories) expected.push({ path, kind: "directory" });
  expected.sort((left, right) => compareUtf8(left.path, right.path));
  const actual = seal.inventory.records.map((record) => ({ path: record.path, kind: record.kind }));
  if (canonicalJson(actual) !== canonicalJson(expected)) throw new Error("corpus report inventory does not match case results exactly");
}

function readSealedJson(directory, path, seal, label) {
  const bytes = readSealedFile(directory, path, seal, label);
  const text = bytes.toString("utf8");
  if (!Buffer.from(text, "utf8").equals(bytes)) throw new Error(`${label} is not valid UTF-8`);
  let value;
  try {
    value = JSON.parse(text);
  } catch (error) {
    throw new Error(`${label} is not valid JSON`, { cause: error });
  }
  return { bytes, text, value };
}

function readSealedFile(directory, path, seal, label) {
  safeRelativePath(path, `${label} path`);
  const verified = readVerifiedEvidenceFile(directory, path);
  if (canonicalJson(verified.seal) !== canonicalJson(seal)) throw new Error(`${label} seal changed while reading verified bytes`);
  return verified.bytes;
}

function assertSerializedJson(text, value, spacing, label) {
  if (text !== `${JSON.stringify(value, undefined, spacing)}\n`) throw new Error(`${label} is not in the exact serialized form`);
}

export function safeOutputName(path) {
  const normalized = safeRelativePath(normalizePath(path), "corpus artifact source path");
  const base = normalized.split("/").at(-1).replace(/[^a-zA-Z0-9_.-]/g, "_");
  return `${sha256(Buffer.from(normalized, "utf8"))}-${base}`;
}

export function normalizedCompilerInput(originalBytes) {
  const sourceText = Buffer.from(originalBytes).toString("utf8");
  return { sourceText, compilerInput: Buffer.from(sourceText, "utf8") };
}

function formatValue(value) {
  const text = JSON.stringify(value);
  if (text === undefined) {
    return "undefined";
  }
  return text.length > 300 ? `${text.slice(0, 300)}...` : text;
}

function normalizePath(path) {
  if (typeof path !== "string") throw new Error("path must be a string");
  return path.replaceAll("\\", "/").split(sep).join("/");
}

function safeRelativePath(value, label) {
  if (typeof value !== "string") throw new Error(`${label} must be a string`);
  if (value === "" || value.startsWith("/") || /^[a-zA-Z]:/.test(value) || value.includes("\\") || /[\0-\x1f\x7f]/.test(value)) throw new Error(`${label} is not a safe relative path`);
  if (value.split("/").some((part) => part === "" || part === "." || part === "..")) throw new Error(`${label} is not a canonical relative path`);
  return value;
}

function repoRelativePath(absolutePath, label) {
  const relativePath = normalizePath(relative(repoRoot, absolutePath));
  if (relativePath === "" || relativePath === ".." || relativePath.startsWith("../")) throw new Error(`${label} must be contained in the repository`);
  return safeRelativePath(relativePath, `${label} report path`);
}

function safePathSegment(value) {
  return typeof value === "string" && value !== "" && value !== "." && value !== ".." && !value.includes("/") && !value.includes("\\") && !/[\0-\x1f\x7f]/.test(value);
}

function assertPlainObject(value, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value) || (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null)) throw new Error(`${label} must be an object`);
}

function assertSha256(value, label) {
  if (typeof value !== "string" || !sha256Pattern.test(value)) throw new Error(`${label} must be a lowercase SHA-256 digest`);
}

function assertAnyObjectId(value, label) {
  if (typeof value !== "string" || !/^(?:[0-9a-f]{40}|[0-9a-f]{64})$/.test(value)) throw new Error(`${label} must be a full lowercase Git object id`);
}

function assertObjectId(value, objectFormat, label) {
  const length = objectFormat === "sha1" ? 40 : objectFormat === "sha256" ? 64 : 0;
  if (length === 0 || typeof value !== "string" || !new RegExp(`^[0-9a-f]{${length}}$`).test(value)) throw new Error(`${label} must be a full lowercase ${objectFormat} object id`);
}

function assertNonNegativeInteger(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${label} must be a non-negative safe integer`);
}

function validateStringMap(value, label) {
  assertPlainObject(value, label);
  for (const [key, entry] of Object.entries(value)) if (key === "" || typeof entry !== "string") throw new Error(`${label} must contain only string values`);
}

function validateSemanticIntegrity(value, label) {
  if (value === null || typeof value === "string" || typeof value === "boolean") return;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error(`${label} contains a non-finite number`);
    return;
  }
  if (Array.isArray(value)) {
    for (const [index, entry] of value.entries()) validateSemanticIntegrity(entry, `${label}[${index}]`);
    return;
  }
  assertPlainObject(value, label);
  for (const [key, entry] of Object.entries(value)) {
    if (key === "sha256" || key === "digest") assertSha256(entry, `${label}.${key}`);
    else if (key === "revision" || key === "tree" || key === "gitObjectId") assertAnyObjectId(entry, `${label}.${key}`);
    else if (key === "bytes" || key.endsWith("Count")) assertNonNegativeInteger(entry, `${label}.${key}`);
    validateSemanticIntegrity(entry, `${label}.${key}`);
  }
}

function validateByteDigest(value, label) {
  assertExactObjectKeys(value, ["bytes", "sha256"], label);
  assertNonNegativeInteger(value.bytes, `${label} bytes`);
  assertSha256(value.sha256, `${label} sha256`);
}

function validateExecutableProvenance(value, label) {
  validateByteDigest(value, label);
  if (value.bytes === 0) throw new Error(`${label} must not be empty`);
}

function byteDigest(bytes) {
  return { bytes: bytes.length, sha256: sha256(bytes) };
}

function hashedEnvironment(keys) {
  const result = {};
  for (const key of keys) if (process.env[key] !== undefined) result[key] = byteDigest(Buffer.from(process.env[key], "utf8"));
  return result;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function gitObjectId(kind, bytes, objectFormat) {
  const algorithm = objectFormat === "sha1" ? "sha1" : objectFormat === "sha256" ? "sha256" : undefined;
  if (algorithm === undefined) throw new Error(`unsupported Git object format '${objectFormat}'`);
  return createHash(algorithm).update(Buffer.from(`${kind} ${bytes.length}\0`, "utf8")).update(bytes).digest("hex");
}

function canonicalGitCheckoutProvenance(root, label) {
  const revision = gitCapture(["-C", root, "rev-parse", "HEAD"], repoRoot).trim();
  const tree = gitCapture(["-C", root, "rev-parse", "HEAD^{tree}"], repoRoot).trim();
  const objectFormat = gitCapture(["-C", root, "rev-parse", "--show-object-format"], repoRoot).trim();
  assertObjectId(revision, objectFormat, `${label} revision`);
  assertObjectId(tree, objectFormat, `${label} tree`);
  const status = gitCapture(["-C", root, "status", "--porcelain=v1", "--untracked-files=all"], repoRoot).trim();
  if (status !== "") throw new Error(`${label} checkout is dirty: ${status.split(/\r?\n/).slice(0, 5).join(", ")}`);
  return { revision, tree, objectFormat, dirty: false };
}

function gitRun(args, cwd, environment = process.env) {
  const result = spawnCanonicalGit(args, cwd, environment, { stdio: "inherit" });
  assertGitSuccess(result, args);
}

function gitCapture(args, cwd, environment = process.env) {
  const result = spawnCanonicalGit(args, cwd, environment, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  assertGitSuccess(result, args);
  return result.stdout;
}

function gitCaptureBuffer(args, cwd, environment = process.env) {
  const result = spawnCanonicalGit(args, cwd, environment, { maxBuffer: 256 * 1024 * 1024 });
  assertGitSuccess(result, args);
  return result.stdout;
}

function gitStatus(args, cwd, environment = process.env) {
  const result = spawnCanonicalGit(args, cwd, environment, { stdio: "ignore" });
  if (result.error !== undefined) throw result.error;
  if (result.signal !== null || result.status === null) throw new Error(`canonical Git ${args.join(" ")} terminated by ${result.signal ?? "unknown status"}`);
  return result.status;
}

function spawnCanonicalGit(args, cwd, environment, options) {
  const executable = environment === process.env && preparedGitExecutable !== undefined ? preparedGitExecutable : resolveExecutable("git", environment);
  return spawnSync(executable, [...canonicalGitArguments, ...args], { cwd, env: canonicalGitEnvironment(environment), ...options });
}

function assertGitSuccess(result, args) {
  if (result.error !== undefined) throw result.error;
  if (result.status !== 0 || result.signal !== null) {
    const stderr = Buffer.isBuffer(result.stderr) ? result.stderr.toString("utf8") : result.stderr ?? "";
    throw new Error(`canonical Git ${args.join(" ")} failed\n${stderr}`);
  }
}

function canonicalGitEnvironment(base) {
  const inheritedKeys = process.platform === "win32"
    ? ["PATH", "HOME", "USERPROFILE", "TEMP", "TMP", "SystemRoot", "ComSpec", "PATHEXT"]
    : ["PATH", "HOME", "TMPDIR"];
  inheritedKeys.push("ALL_PROXY", "HTTPS_PROXY", "HTTP_PROXY", "NO_PROXY", "all_proxy", "https_proxy", "http_proxy", "no_proxy");
  const environment = {};
  for (const key of inheritedKeys) if (base[key] !== undefined) environment[key] = base[key];
  return { ...environment, ...materializedCanonicalGitEnvironment() };
}

function materializedCanonicalGitEnvironment() {
  return Object.fromEntries(Object.entries(canonicalGitEnvironmentEvidence).map(([key, value]) => [key, value.replace("<null-device>", devNull)]));
}

function resolveExecutable(command, environment) {
  if (command.includes("/") || command.includes("\\")) return realpathSync(command);
  const extensions = process.platform === "win32" ? (environment.PATHEXT ?? ".EXE;.CMD;.BAT;.COM").split(";") : [""];
  for (const directory of (environment.PATH ?? "").split(delimiter)) {
    if (directory === "") continue;
    for (const extension of extensions) {
      const candidate = join(directory, process.platform === "win32" ? `${command}${extension}` : command);
      try {
        accessSync(candidate, fsConstants.X_OK);
        const stat = lstatSync(candidate);
        if (stat.isFile() || stat.isSymbolicLink()) return realpathSync(candidate);
      } catch {
        continue;
      }
    }
  }
  throw new Error(`cannot resolve executable '${command}' from PATH`);
}

function prependSearchPath(searchPath, directories) {
  const entries = [...directories, ...searchPath.split(delimiter)].filter((value) => value !== "");
  const seen = new Set();
  return entries.filter((value) => {
    const key = process.platform === "win32" ? value.toLowerCase() : value;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).join(delimiter);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().then((exitCode) => {
    process.exitCode = exitCode;
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack : String(error));
    process.exitCode = 1;
  });
}
