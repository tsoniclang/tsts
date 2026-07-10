import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { chmod, cp, lstat, mkdir, open, readFile, readdir, rename, writeFile } from "node:fs/promises";
import { basename, dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";

import { ensurePinnedGoProducer } from "../pinned-go-producer.mjs";
import { publishSealedDirectory, sealEvidenceDirectory } from "../sealed-evidence.mjs";
import { canonicalJson, compareUtf8, executableProvenance, fingerprint, hashInputRoots } from "../test-provenance.mjs";
import { loadAndVerifyTsgoSourcePin } from "../tsgo-source-pin.mjs";
import {
  ACCEPTED_OVERLAY_ABSENT_MARKER,
  ACCEPTED_OVERLAY_SCHEMA_VERSION,
  acceptedOverlayPlanIdentity,
  acceptedOverlaySha256,
  acceptedOverlaySourcePinIdentity,
  loadAcceptedOverlayPlan,
  verifyAcceptedOverlayBinding,
  verifyAcceptedOverlayCapture,
} from "./accepted-overlay-contract.mjs";
import {
  compilerCommandLineArgsForMaterializedCase,
  decodeSourceText,
  diagnosticHeadlineText,
  materializeTranspileCaseInputs,
  parseBaselineSections,
  parseFileBasedTest,
} from "./run.mjs";

const driverPath = fileURLToPath(import.meta.url);
const cliPath = fileURLToPath(new URL("./capture-tsgo-accepted.mjs", import.meta.url));
const contractPath = fileURLToPath(new URL("./accepted-overlay-contract.mjs", import.meta.url));
const runPath = fileURLToPath(new URL("./run.mjs", import.meta.url));
const producerPath = fileURLToPath(new URL("../pinned-go-producer.mjs", import.meta.url));
const provenancePath = fileURLToPath(new URL("../test-provenance.mjs", import.meta.url));
const sourcePinPath = fileURLToPath(new URL("../tsgo-source-pin.mjs", import.meta.url));
const sealPath = fileURLToPath(new URL("../sealed-evidence.mjs", import.meta.url));
const resolvedTypeScriptRoot = dirname(dirname(fileURLToPath(import.meta.resolve("typescript"))));

export async function captureAcceptedOverlays(paths) {
  const context = await buildCaptureContext(paths);
  const captureId = fingerprint(context.request, "tsts-accepted-overlay-capture-v1");
  const captureDestination = join(paths.acceptedRoot, "captures", captureId);
  const staging = join(paths.tempRoot, `capture-${captureId}.partial-${process.pid}-${randomUUID()}`);
  await mkdir(join(staging, "raw"), { recursive: true });
  const cases = [];
  for (const [index, entry] of context.plan.value.entries.entries()) {
    cases.push(await captureEntry({ context, entry, index, staging }));
  }
  const refreshed = await buildCaptureContext(paths, context.producer);
  if (canonicalJson(refreshed.request) !== canonicalJson(context.request)) throw new Error(`accepted-overlay inputs changed during capture at ${firstDifference(context.request, refreshed.request)}`);
  await writeFile(join(staging, "capture.json"), `${JSON.stringify({
    schemaVersion: ACCEPTED_OVERLAY_SCHEMA_VERSION,
    captureId,
    request: context.request,
    cases,
  }, null, 2)}\n`);
  await normalizeEvidenceModes(staging);
  const stagedSeal = await sealEvidenceDirectory(staging, { kind: "tsgo-accepted-capture", captureId });
  let capture;
  if (existsSync(captureDestination)) {
    capture = verifyAcceptedOverlayCapture({ root: paths.acceptedRoot, captureId, expectedSourcePin: context.sourcePinIdentity, expectedPlan: context.plan });
    if (capture.seal.evidenceDigest !== stagedSeal.evidenceDigest) throw new Error(`accepted-overlay capture replay is nondeterministic; retained evidence: ${staging}`);
    await retainVerifiedReplay(paths, staging, `capture-${captureId}`);
  } else {
    await mkdir(dirname(captureDestination), { recursive: true });
    await publishSealedDirectory(staging, captureDestination);
    capture = verifyAcceptedOverlayCapture({ root: paths.acceptedRoot, captureId, expectedSourcePin: context.sourcePinIdentity, expectedPlan: context.plan });
  }
  const binding = await bindAcceptedOverlayCapture(paths, capture, context);
  return { capture, binding, context };
}

export function acceptedOverlayPaths(repoRoot) {
  const packageRoot = join(repoRoot, "packages/tsts");
  const vendorRoot = join(packageRoot, "_vendor/typescript-go");
  return {
    repoRoot,
    packageRoot,
    vendorRoot,
    acceptedRoot: join(packageRoot, "tools/tsgo-suite/tsgo-accepted"),
    tempRoot: join(repoRoot, ".temp/tsgo-accepted"),
    caseRoot: join(vendorRoot, "_submodules/TypeScript/tests/cases"),
    baselineRoot: join(vendorRoot, "_submodules/TypeScript/tests/baselines/reference"),
  };
}

async function buildCaptureContext(paths, knownProducer) {
  const sourcePin = loadAndVerifyTsgoSourcePin(paths);
  const sourcePinIdentity = acceptedOverlaySourcePinIdentity(sourcePin);
  const plan = loadAcceptedOverlayPlan(paths.acceptedRoot);
  await mkdir(paths.tempRoot, { recursive: true });
  const producer = knownProducer ?? await ensurePinnedGoProducer({
    label: "pinned TS-Go accepted-overlay compiler",
    sourceRoot: paths.vendorRoot,
    expectedRevision: sourcePin.pin.revision,
    package: "./cmd/tsgo",
    outputName: process.platform === "win32" ? "tsgo.exe" : "tsgo",
    cacheRoot: join(paths.tempRoot, "producers"),
    buildRoot: join(paths.tempRoot, "producer-builds"),
    additionalProvenance: { sourcePin: sourcePinIdentity },
  });
  const api = await import(join(paths.packageRoot, "dist/src/index.js"));
  if (typeof api.barebonesLibContent !== "string") throw new Error("TSTS dist does not export barebonesLibContent; run npm run build");
  const barebonesBytes = Buffer.from(api.barebonesLibContent);
  const inputRoots = [
    { label: "accepted-overlay-plan", path: join(paths.acceptedRoot, plan.path) },
    { label: "accepted-overlay-capture-driver", path: driverPath },
    { label: "accepted-overlay-capture-cli", path: cliPath },
    { label: "accepted-overlay-contract", path: contractPath },
    { label: "accepted-overlay-suite-runner", path: runPath },
    { label: "accepted-overlay-producer", path: producerPath },
    { label: "accepted-overlay-provenance", path: provenancePath },
    { label: "accepted-overlay-source-pin-verifier", path: sourcePinPath },
    { label: "accepted-overlay-seal", path: sealPath },
    { label: "accepted-overlay-tsbaseline", path: join(paths.packageRoot, "tools/tsgo-suite/tsbaseline") },
    { label: "accepted-overlay-tsts-dist", path: join(paths.packageRoot, "dist") },
    { label: "accepted-overlay-typescript-package", path: resolvedTypeScriptRoot },
    { label: "accepted-overlay-workspace-package", path: join(paths.repoRoot, "package.json") },
    { label: "accepted-overlay-workspace-lock", path: join(paths.repoRoot, "package-lock.json") },
    { label: "accepted-overlay-tsts-package", path: join(paths.packageRoot, "package.json") },
  ];
  for (const [index, entry] of plan.value.entries.entries()) {
    inputRoots.push({ label: `case:${index}`, path: join(paths.caseRoot, entry.caseFile) });
    for (const [artifactIndex, artifact] of entry.referenceArtifacts.entries()) {
      inputRoots.push({ label: `baseline:${index}:${artifactIndex}`, path: join(paths.baselineRoot, entry.suite, artifact) });
    }
  }
  const environment = captureEnvironment();
  const request = {
    schemaVersion: ACCEPTED_OVERLAY_SCHEMA_VERSION,
    plan: acceptedOverlayPlanIdentity(plan),
    sourcePin: sourcePinIdentity,
    producer: producer.provenance,
    barebonesLib: byteDigest(barebonesBytes),
    inputs: hashInputRoots(inputRoots),
    execution: {
      runtime: {
        executable: executableProvenance(process.execPath),
        version: process.version,
        versions: process.versions,
        execArgv: [...process.execArgv],
        startupNodeOptions: process.env.NODE_OPTIONS ?? "",
      },
      platform: process.platform,
      arch: process.arch,
      environment: semanticCaptureEnvironment(environment),
    },
  };
  return { paths, sourcePin, sourcePinIdentity, plan, producer, barebonesContent: api.barebonesLibContent, environment, request };
}

async function captureEntry({ context, entry, index, staging }) {
  const sourcePath = join(context.paths.caseRoot, entry.caseFile);
  const sourceBytes = await readFile(sourcePath);
  const baselineInputs = await Promise.all(entry.referenceArtifacts.map(async (artifact) => ({
    artifact,
    bytes: await readFile(join(context.paths.baselineRoot, entry.suite, artifact)),
  })));
  const parsed = parseFileBasedTest(decodeSourceText(sourceBytes), basename(entry.caseFile));
  const settings = settingsForEntry(parsed, entry.configuration);

  const caseRelative = `raw/case-${String(index).padStart(3, "0")}`;
  const caseRoot = join(staging, ...caseRelative.split("/"));
  const inputWorkspace = join(caseRoot, "input");
  await mkdir(join(caseRoot, "invocations"), { recursive: true });
  await mkdir(join(caseRoot, "sections"), { recursive: true });
  await mkdir(join(caseRoot, "workspaces"), { recursive: true });
  const materialized = await materializeTranspileCaseInputs({ caseDir: inputWorkspace, parsed, configuration: settings });
  if (materialized.invocations.length === 0) throw new Error(`accepted-overlay case '${entry.caseFile}' has no transpile invocations`);
  await writeFile(join(inputWorkspace, "lib.d.ts"), context.barebonesContent);
  await normalizeEvidenceModes(inputWorkspace);
  const inputFiles = await snapshotRegularFiles(inputWorkspace);
  const inputWorkspaceDigest = hashInputRoots([{ label: `capture-input-${index}`, path: inputWorkspace }]).roots[0];

  const invocationRecords = [];
  const diagnosticLines = [];
  for (const [invocationIndex, invocation] of materialized.invocations.entries()) {
    const workspaceRelative = `${caseRelative}/workspaces/${String(invocationIndex).padStart(3, "0")}`;
    const workspace = join(staging, ...workspaceRelative.split("/"));
    await cp(inputWorkspace, workspace, { recursive: true, force: false, errorOnExist: true });
    const { cliArgs, inputs } = serviceEquivalentArgs(invocation);
    const args = [...cliArgs, ...inputs];
    const result = spawnSync(context.producer.path, args, {
      cwd: workspace,
      env: context.environment,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      timeout: 120000,
      killSignal: "SIGKILL",
    });
    if (result.error !== undefined) throw result.error;
    if (result.status === null || result.signal !== null || !new Set([0, 1, 2]).has(result.status)) {
      throw new Error(`pinned TS-Go invocation '${invocation.label}' did not produce a compiler result: status=${result.status} signal=${result.signal}`);
    }
    const stdout = Buffer.from(result.stdout ?? "");
    const stderr = Buffer.from(result.stderr ?? "");
    const stdoutPath = `${caseRelative}/invocations/${String(invocationIndex).padStart(3, "0")}.stdout`;
    const stderrPath = `${caseRelative}/invocations/${String(invocationIndex).padStart(3, "0")}.stderr`;
    await writeFile(join(staging, ...stdoutPath.split("/")), stdout);
    await writeFile(join(staging, ...stderrPath.split("/")), stderr);
    for (const output of [stdout, stderr]) {
      for (const line of output.toString("utf8").split(/\r?\n/)) {
        if (/^.+\(\d+,\d+\): error TS\d+:/.test(line)) diagnosticLines.push(line);
      }
    }

    await normalizeEvidenceModes(workspace);
    const afterFiles = await snapshotRegularFiles(workspace);
    assertInputFilesUnchanged(inputFiles, afterFiles, invocation.label);
    const expectedPaths = [...new Set(invocation.expectedOutputFiles.map((path) => normalizeCapturePath(path, `invocation '${invocation.label}' output`)))];
    const unexpected = [...afterFiles.keys()].filter((path) => !inputFiles.has(path) && !expectedPaths.includes(path));
    if (unexpected.length !== 0) throw new Error(`pinned TS-Go invocation '${invocation.label}' emitted undeclared files: ${unexpected.join(", ")}`);
    const outputs = expectedPaths.map((path) => {
      const record = afterFiles.get(path);
      return record === undefined
        ? { path, present: false, bytes: null, sha256: null }
        : { path, present: true, bytes: record.bytes, sha256: record.sha256 };
    });
    const workspaceDigest = hashInputRoots([{ label: `capture-invocation-${index}-${invocationIndex}`, path: workspace }]).roots[0];
    invocationRecords.push({
      index: invocationIndex,
      label: invocation.label,
      kind: invocation.kind,
      args: args.map((value) => String(value)),
      status: result.status,
      signal: null,
      stdout: { path: stdoutPath, ...byteDigest(stdout) },
      stderr: { path: stderrPath, ...byteDigest(stderr) },
      workspace: { path: workspaceRelative, digest: workspaceDigest },
      outputs,
    });
  }
  diagnosticLines.sort(compareDiagnosticLines);

  const baselineSections = baselineInputs.flatMap((baseline) => parseBaselineSections(baseline.bytes.toString("utf8")));
  const { comparisons, differences } = compareCompleteTranspileResult({
    baselineSections,
    diagnosticLines,
    invocationRecords,
    captureRoot: staging,
    writtenFileSet: new Set([...materialized.writtenFileSet].map((path) => normalizeCapturePath(path, "materialized input"))),
  });
  const plannedKeys = new Set(entry.divergences.map(divergenceKey));
  const observedKeys = new Set(differences.map(divergenceKey));
  const missing = [...plannedKeys].filter((key) => !observedKeys.has(key));
  const undeclared = [...observedKeys].filter((key) => !plannedKeys.has(key));
  if (missing.length !== 0 || undeclared.length !== 0) {
    throw new Error(`accepted-overlay plan is not the exact divergence set for '${entry.artifact}': missing=[${missing.join(", ")}] undeclared=[${undeclared.join(", ")}]`);
  }

  const differencesByKey = new Map(differences.map((difference) => [divergenceKey(difference), difference]));
  const sectionRecords = [];
  for (const [sectionIndex, declaration] of entry.divergences.entries()) {
    const difference = differencesByKey.get(divergenceKey(declaration));
    if (difference === undefined || difference.action !== declaration.action) {
      throw new Error(`accepted-overlay action mismatch for '${entry.artifact}#${declaration.section}'`);
    }
    const content = difference.action === "absent" ? ACCEPTED_OVERLAY_ABSENT_MARKER : difference.content;
    const contentPath = `${caseRelative}/sections/${String(sectionIndex).padStart(3, "0")}.txt`;
    const contentBytes = Buffer.from(content);
    await writeFile(join(staging, ...contentPath.split("/")), contentBytes);
    sectionRecords.push({
      name: declaration.section,
      action: declaration.action,
      occurrence: declaration.occurrence,
      reason: declaration.reason,
      contentPath,
      sha256: acceptedOverlaySha256(contentBytes),
      baselineSha256: difference.baselineSha256 ?? acceptedOverlaySha256(Buffer.from(ACCEPTED_OVERLAY_ABSENT_MARKER)),
    });
  }
  return {
    index,
    corpus: entry.corpus,
    suite: entry.suite,
    caseFile: entry.caseFile,
    configuration: entry.configuration,
    artifact: entry.artifact,
    input: byteDigest(sourceBytes),
    baselines: baselineInputs.map(({ artifact, bytes }) => ({ artifact, ...byteDigest(bytes) })),
    inputWorkspace: { path: `${caseRelative}/input`, digest: inputWorkspaceDigest },
    invocations: invocationRecords,
    comparisons,
    sections: sectionRecords,
  };
}

function compareCompleteTranspileResult({ baselineSections, diagnosticLines, invocationRecords, captureRoot, writtenFileSet }) {
  const comparisons = [];
  const differences = [];
  const actualDiagnostics = diagnosticLines.join("\n");
  const baselineDiagnostics = baselineSections
    .filter((section) => section.name === "Diagnostics reported")
    .map((section) => diagnosticHeadlineText(section.content))
    .filter((text) => text !== "")
    .join("\n");
  const diagnosticComparison = comparisonRecord("Diagnostics reported", "aggregate", actualDiagnostics, baselineDiagnostics);
  comparisons.push(diagnosticComparison.record);
  if (diagnosticComparison.difference !== undefined) differences.push(diagnosticComparison.difference);

  const occurrences = new Map();
  for (const invocation of invocationRecords) {
    for (const output of invocation.outputs) {
      const occurrence = (occurrences.get(output.path) ?? 0) + 1;
      occurrences.set(output.path, occurrence);
      const baselineMatches = baselineSections.filter((section) => normalizeCapturePath(section.name, "baseline output") === output.path);
      const sourceOwned = writtenFileSet.has(output.path);
      const baselineSection = sourceOwned && baselineMatches.length > 1 ? baselineMatches.at(-1) : baselineMatches[occurrence - 1];
      const baselineContent = baselineSection === undefined ? undefined : normalizeText(baselineSection.content);
      const actualContent = output.present
        ? normalizeText(readFileSync(join(captureRoot, ...invocation.workspace.path.split("/"), ...output.path.split("/")), "utf8"))
        : undefined;
      const comparison = comparisonRecord(output.path, occurrence, actualContent, baselineContent);
      comparisons.push(comparison.record);
      if (comparison.difference !== undefined) differences.push(comparison.difference);
    }
  }
  return { comparisons, differences };
}

function comparisonRecord(section, occurrence, actualContent, baselineContent) {
  const actualSha256 = actualContent === undefined ? null : acceptedOverlaySha256(Buffer.from(actualContent));
  const baselineSha256 = baselineContent === undefined ? null : acceptedOverlaySha256(Buffer.from(baselineContent));
  if (actualContent === baselineContent) return { record: { section, occurrence, action: "equal", actualSha256, baselineSha256 } };
  const action = actualContent === undefined ? "absent" : "content";
  return {
    record: { section, occurrence, action, actualSha256, baselineSha256 },
    difference: { section, occurrence, action, content: actualContent, actualSha256, baselineSha256 },
  };
}

function divergenceKey(value) {
  return `${value.section}\0${value.occurrence}`;
}

async function snapshotRegularFiles(root) {
  const records = new Map();
  await collectRegularFiles(root, "", records);
  return records;
}

async function collectRegularFiles(root, relativeDirectory, records) {
  const directory = relativeDirectory === "" ? root : join(root, ...relativeDirectory.split("/"));
  const entries = await readdir(directory, { withFileTypes: true });
  entries.sort((left, right) => compareUtf8(left.name, right.name));
  for (const entry of entries) {
    const relativePath = relativeDirectory === "" ? entry.name : posix.join(relativeDirectory, entry.name);
    const path = join(directory, entry.name);
    const stat = await lstat(path);
    if (stat.isSymbolicLink()) throw new Error(`symlink is forbidden in accepted-overlay workspace: ${relativePath}`);
    if (stat.isDirectory()) await collectRegularFiles(root, relativePath, records);
    else if (stat.isFile()) {
      const bytes = await readFile(path);
      records.set(relativePath, { bytes: bytes.length, sha256: acceptedOverlaySha256(bytes), mode: stat.mode & 0o777 });
    } else {
      throw new Error(`unsupported accepted-overlay workspace entry: ${relativePath}`);
    }
  }
}

function assertInputFilesUnchanged(before, after, label) {
  for (const [path, record] of before) {
    const current = after.get(path);
    if (current === undefined || canonicalJson(current) !== canonicalJson(record)) throw new Error(`pinned TS-Go invocation '${label}' mutated input '${path}'`);
  }
}

async function bindAcceptedOverlayCapture(paths, capture, context) {
  const overlays = [];
  const rendered = [];
  for (const capturedCase of capture.capture.cases) {
    const sections = capturedCase.sections.map((section) => ({
      name: section.name,
      action: section.action,
      occurrence: section.occurrence,
      reason: section.reason,
      content: readFileSync(join(capture.directory, ...section.contentPath.split("/")), "utf8"),
      sha256: section.sha256,
    }));
    const relativePath = `overlays/${capturedCase.corpus}/${capturedCase.suite}/${capturedCase.artifact}`;
    const text = renderOverlay(capturedCase, sections, capture.capture.captureId, context.sourcePinIdentity.revision);
    const bytes = Buffer.from(text);
    overlays.push({
      corpus: capturedCase.corpus,
      suite: capturedCase.suite,
      artifact: capturedCase.artifact,
      path: relativePath,
      sha256: acceptedOverlaySha256(bytes),
      sections: sections.map(({ name, action, occurrence, reason, sha256 }) => ({ name, action, occurrence, reason, sha256 })),
    });
    rendered.push({ relativePath, bytes });
  }
  const unsigned = {
    schemaVersion: ACCEPTED_OVERLAY_SCHEMA_VERSION,
    plan: acceptedOverlayPlanIdentity(context.plan),
    sourcePin: context.sourcePinIdentity,
    capture: {
      captureId: capture.capture.captureId,
      path: capture.relativePath,
      evidenceDigest: capture.seal.evidenceDigest,
    },
    overlays,
  };
  const bindingId = fingerprint(unsigned, "tsts-accepted-overlay-binding-v1");
  const destination = join(paths.acceptedRoot, "bindings", bindingId);
  const staging = join(paths.tempRoot, `binding-${bindingId}.partial-${process.pid}-${randomUUID()}`);
  await mkdir(staging, { recursive: true });
  for (const overlay of rendered) {
    const output = join(staging, ...overlay.relativePath.split("/"));
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, overlay.bytes);
  }
  await writeFile(join(staging, "binding.json"), `${JSON.stringify({ ...unsigned, bindingId }, null, 2)}\n`);
  await normalizeEvidenceModes(staging);
  const stagedSeal = await sealEvidenceDirectory(staging, { kind: "tsgo-accepted-binding", bindingId });
  if (existsSync(destination)) {
    const existing = verifyAcceptedOverlayBinding({ root: paths.acceptedRoot, bindingId, capture, expectedSourcePin: context.sourcePinIdentity, expectedPlan: context.plan });
    if (existing.seal.evidenceDigest !== stagedSeal.evidenceDigest) throw new Error(`accepted-overlay binding replay is nondeterministic; retained evidence: ${staging}`);
    await retainVerifiedReplay(paths, staging, `binding-${bindingId}`);
  } else {
    await mkdir(dirname(destination), { recursive: true });
    await publishSealedDirectory(staging, destination);
  }
  return verifyAcceptedOverlayBinding({
    root: paths.acceptedRoot,
    bindingId,
    capture,
    expectedSourcePin: context.sourcePinIdentity,
    expectedPlan: context.plan,
  });
}

async function retainVerifiedReplay(paths, staging, label) {
  const directory = join(paths.tempRoot, "verified-replays", label);
  await mkdir(directory, { recursive: true });
  await rename(staging, join(directory, `${process.pid}-${randomUUID()}`));
  await syncDirectory(directory);
}

function renderOverlay(capturedCase, sections, captureId, revision) {
  const header = [
    `Generated from immutable accepted-overlay capture ${captureId}.`,
    `Pinned TS-Go revision ${revision}; case '${capturedCase.caseFile}'.`,
    "Do not hand-edit. The active binding and evidence seals verify every section below.",
    "",
  ].join("\n");
  return `${header}${sections.map((section) => `//// [${section.name}] ////\n${section.content}\n`).join("")}`;
}

function settingsForEntry(parsed, configuration) {
  const settings = new Map(parsed.globalOptions ?? []);
  for (const [option, value] of parsed.settings ?? []) settings.set(option, value);
  if (configuration !== null && configuration !== undefined && configuration !== "") {
    for (const part of configuration.split(",")) {
      const [option, ...valueParts] = part.split("=");
      settings.set(option.toLowerCase(), valueParts.join("="));
    }
  }
  return settings;
}

function serviceEquivalentArgs(invocation) {
  const cliArgs = compilerCommandLineArgsForMaterializedCase(invocation.compilerOptions, []);
  cliArgs.push("--noResolve");
  if (invocation.compilerOptions.verbatimModuleSyntax !== true) cliArgs.push("--isolatedModules");
  if (invocation.kind === "declaration") {
    cliArgs.push("--noLib");
    return { cliArgs, inputs: ["lib.d.ts", invocation.inputFile] };
  }
  cliArgs.push("--declaration", "false", "--declarationMap", "false", "--noLib");
  return { cliArgs, inputs: [invocation.inputFile] };
}

function compareDiagnosticLines(left, right) {
  const a = diagnosticSortKey(left);
  const b = diagnosticSortKey(right);
  return compareUtf8(a.file, b.file) || a.line - b.line || a.column - b.column || a.code - b.code;
}

function diagnosticSortKey(line) {
  const match = /^(.*?)\((\d+),(\d+)\): error TS(\d+):/.exec(line);
  return match === null
    ? { file: line, line: 0, column: 0, code: 0 }
    : { file: match[1], line: Number(match[2]), column: Number(match[3]), code: Number(match[4]) };
}

function captureEnvironment() {
  const environment = { LANG: "C.UTF-8", LC_ALL: "C.UTF-8", TZ: "UTC" };
  if (process.platform === "win32") {
    for (const key of ["SystemRoot", "ComSpec", "PATHEXT", "TEMP", "TMP"]) if (process.env[key] !== undefined) environment[key] = process.env[key];
  }
  return environment;
}

function semanticCaptureEnvironment(environment) {
  return Object.fromEntries(Object.entries(environment).sort(([left], [right]) => compareUtf8(left, right)));
}

function normalizeCapturePath(value, label) {
  const normalized = value.replaceAll("\\", "/").replace(/^\/[A-Za-z]:\//, "").replace(/^\/+/, "");
  if (normalized === "" || normalized.split("/").some((part) => part === "" || part === "." || part === "..")) throw new Error(`${label} has unsafe path '${value}'`);
  return normalized;
}

function byteDigest(bytes) {
  return { bytes: bytes.length, sha256: acceptedOverlaySha256(bytes) };
}

function normalizeText(text) {
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n$/, "");
}

function firstDifference(left, right, path = "request") {
  if (canonicalJson(left) === canonicalJson(right)) return "<none>";
  if (left === null || right === null || typeof left !== "object" || typeof right !== "object" || Array.isArray(left) !== Array.isArray(right)) {
    return `${path}: ${canonicalJson(left)} != ${canonicalJson(right)}`;
  }
  const keys = [...new Set([...Object.keys(left), ...Object.keys(right)])].sort(compareUtf8);
  for (const key of keys) {
    if (!(key in left) || !(key in right)) return `${path}.${key}: missing on ${key in left ? "right" : "left"}`;
    if (canonicalJson(left[key]) !== canonicalJson(right[key])) return firstDifference(left[key], right[key], `${path}.${key}`);
  }
  return path;
}

async function syncDirectory(directory) {
  const handle = await open(directory, "r");
  try {
    await handle.sync();
  } finally {
    await handle.close();
  }
}

async function normalizeEvidenceModes(root) {
  await chmod(root, 0o755);
  const entries = await readdir(root, { withFileTypes: true });
  entries.sort((left, right) => compareUtf8(left.name, right.name));
  for (const entry of entries) {
    const path = join(root, entry.name);
    const stat = await lstat(path);
    if (stat.isSymbolicLink()) throw new Error(`symlink is forbidden in accepted-overlay evidence: ${path}`);
    if (stat.isDirectory()) await normalizeEvidenceModes(path);
    else if (stat.isFile()) await chmod(path, 0o644);
    else throw new Error(`unsupported accepted-overlay evidence entry: ${path}`);
  }
}
