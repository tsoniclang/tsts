#!/usr/bin/env node
import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

import { publishSealedDirectory, sealEvidenceDirectory } from "../sealed-evidence.mjs";
import { canonicalJson, executableProvenance } from "../test-provenance.mjs";
import {
  aggregateSamples,
  assertBaselineCompatibility,
  buildInterleavedSchedule,
  evaluatePerformanceGate,
  exactWorkReceipt,
  runTimedCompiler,
} from "./benchmark-core.mjs";
import {
  acquireBenchmarkCompilers,
  assertCanonicalBenchmarkProcess,
  canonicalBenchmarkEnvironment,
  collectHarnessEvidence,
  collectHostEvidence,
  repositoryPaths,
} from "./benchmark-evidence.mjs";
import {
  assertCorpusSourcesUnchanged,
  assertStagedWorkloadsUnchanged,
  loadBenchmarkCorpus,
  removeBenchmarkStaging,
  stageBenchmarkCorpus,
  workloadReportEvidence,
} from "./benchmark-workload.mjs";
import { collectWorkloadSelection, exactWorkloadSelection } from "./benchmark-selection.mjs";
import { loadPerformancePolicy, requireCalibratedPolicy } from "./performance-policy.mjs";
import {
  createPerformanceReport,
  performanceReportSealMetadata,
  readVerifiedPerformanceReport,
  validatePerformanceReport,
} from "./performance-report.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const { repoRoot } = repositoryPaths();
const defaultPolicyPath = join(here, "performance-policy.json");
const attributePath = join(here, "attribute.mjs");
const compilerIds = Object.freeze(["tsts", "tsgo", "tsc"]);

export function parseBenchmarkArguments(argv) {
  const options = { policy: defaultPolicyPath, gate: false, profile: false, noBuild: false, output: null, baselineOutput: null, verifyReport: null };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--policy") options.policy = requiredValue(argv, ++index, argument);
    else if (argument === "--output") options.output = requiredValue(argv, ++index, argument);
    else if (argument === "--record-baseline") options.baselineOutput = requiredValue(argv, ++index, argument);
    else if (argument === "--verify-report") options.verifyReport = requiredValue(argv, ++index, argument);
    else if (argument === "--gate") options.gate = true;
    else if (argument === "--profile") options.profile = true;
    else if (argument === "--no-build") options.noBuild = true;
    else throw new Error(`unknown performance benchmark argument: ${argument}`);
  }
  const modes = Number(options.gate) + Number(options.baselineOutput !== null) + Number(options.verifyReport !== null);
  if (modes > 1) throw new Error("--gate, --record-baseline, and --verify-report are mutually exclusive");
  if (options.baselineOutput !== null && options.output !== null) throw new Error("--record-baseline supplies its own output and cannot be combined with --output");
  if (options.verifyReport !== null && (options.profile || options.noBuild || options.output !== null)) throw new Error("--verify-report cannot be combined with measurement options");
  return options;
}

export async function runBenchmarkCli(argv = process.argv.slice(2)) {
  const options = parseBenchmarkArguments(argv);
  const policyPath = resolveFromCwd(options.policy);
  const policyContext = loadPerformancePolicy(policyPath);
  const contract = reportContract(policyContext);

  if (options.verifyReport !== null) {
    const verified = readVerifiedPerformanceReport(resolveFromCwd(options.verifyReport), contract);
    process.stdout.write(`verified performance report ${verified.report.reportId} evidence=${verified.seal.evidenceDigest}\n`);
    return { destination: resolveFromCwd(options.verifyReport), report: verified.report, seal: verified.seal };
  }

  assertCanonicalBenchmarkProcess();
  let acceptedBaseline;
  if (options.gate) {
    const baselinePath = requireCalibratedPolicy(policyContext);
    acceptedBaseline = readVerifiedPerformanceReport(baselinePath, contract);
    if (acceptedBaseline.seal.evidenceDigest !== policyContext.policy.baseline.evidenceDigest) throw new Error("accepted performance baseline seal digest does not match policy");
    if (acceptedBaseline.report.reportId !== policyContext.policy.baseline.acceptedReportId) throw new Error("accepted performance baseline reportId does not match policy");
    if (acceptedBaseline.report.role !== "baseline-candidate" || acceptedBaseline.report.outcome !== "measurement-complete") throw new Error("accepted performance baseline is not a complete baseline candidate");
  }

  const role = options.gate ? "gate" : options.baselineOutput !== null ? "baseline-candidate" : "measurement";
  const destination = outputDestination(options, role);
  assertOutputScope(destination, role, policyContext);
  if (existsSync(destination)) throw new Error(`refusing to replace existing performance report: ${destination}`);
  const reportStagingRoot = join(repoRoot, ".temp/profiling/report-staging");
  await mkdir(reportStagingRoot, { recursive: true, mode: 0o700 });
  const reportStaging = await mkdtemp(join(reportStagingRoot, "report-"));
  const workloadRoot = await mkdtemp("/tmp/tsts-performance-workload-");
  assertDisjointPaths(reportStaging, destination, "report staging and destination");
  assertDisjointPaths(workloadRoot, destination, "workload staging and report destination");
  const runtimeRoot = join(workloadRoot, "runtime");
  let published = false;
  try {
    const environment = canonicalBenchmarkEnvironment(runtimeRoot);
    const hostBefore = collectHostEvidence(environment.recorded);
    const corpus = loadBenchmarkCorpus(policyContext.corpusPath);
    const harness = collectHarnessEvidence();
    const stagedProjects = stageBenchmarkCorpus(corpus, join(workloadRoot, "projects"));
    const compilerContext = await acquireBenchmarkCompilers({ noBuild: options.noBuild });

    const schedule = buildInterleavedSchedule({
      projectNames: stagedProjects.map((project) => project.name),
      compilerIds,
      ...policyContext.policy.sampling,
    });
    const results = initializeResults(stagedProjects);
    const projectByName = new Map(stagedProjects.map((project) => [project.name, project]));
    const compilerById = new Map(compilerContext.compilers.map((compiler) => [compiler.id, compiler]));
    collectInitialWorkloadSelections({ results, projects: stagedProjects, compilers: compilerContext.compilers, environment: environment.actual, timeoutMs: policyContext.policy.sampling.timeoutMs });
    assertStagedWorkloadsUnchanged(stagedProjects);
    assertCorpusSourcesUnchanged(corpus);
    for (const entry of schedule) {
      const project = projectByName.get(entry.project);
      const compiler = compilerById.get(entry.compiler);
      const sample = runTimedCompiler({
        id: `${entry.project}/${entry.compiler}/${entry.phase}/${entry.round}`,
        argv: compiler.argv,
        args: project.args,
        cwd: project.cwd,
        environment: environment.actual,
        requiredMetrics: policyContext.policy.requiredMetrics,
        timeExecutable: compilerContext.timeExecutable,
        timeoutMs: policyContext.policy.sampling.timeoutMs,
      });
      const compilerResult = results.get(entry.project).byCompiler[entry.compiler];
      if (entry.phase === "measured") compilerResult.measuredSamples.push(sample);
      else compilerResult.systemCacheWarmupSamples.push(sample);
      assertStagedWorkloadsUnchanged(stagedProjects);
      assertCorpusSourcesUnchanged(corpus);
    }

    const finalizedResults = finalizeResults(results, policyContext.policy);
    const profiles = options.profile
      ? captureProfiles({
        reportStaging,
        projects: stagedProjects,
        tsts: compilerById.get("tsts"),
        environment: environment.actual,
        timeoutMs: policyContext.policy.sampling.timeoutMs,
        assertUnchanged: () => {
          assertStagedWorkloadsUnchanged(stagedProjects);
          assertCorpusSourcesUnchanged(corpus);
        },
      })
      : [];
    assertStagedWorkloadsUnchanged(stagedProjects);
    assertCorpusSourcesUnchanged(corpus);
    reverifyWorkloadSelections({ results, projects: stagedProjects, compilers: compilerContext.compilers, environment: environment.actual, timeoutMs: policyContext.policy.sampling.timeoutMs });
    assertStagedWorkloadsUnchanged(stagedProjects);
    assertCorpusSourcesUnchanged(corpus);
    await compilerContext.reverify();
    const harnessAfter = collectHarnessEvidence();
    if (canonicalJson(harnessAfter) !== canonicalJson(harness)) throw new Error("performance harness changed during benchmark execution");
    const policyAfter = loadPerformancePolicy(policyContext.path);
    if (canonicalJson(policyAfter.policy) !== canonicalJson(policyContext.policy) || canonicalJson(policyAfter.file) !== canonicalJson(policyContext.file)) throw new Error("performance policy changed during benchmark execution");
    if (acceptedBaseline !== undefined) {
      const baselineAfter = readVerifiedPerformanceReport(policyContext.baselinePath, contract);
      if (canonicalJson(baselineAfter.report) !== canonicalJson(acceptedBaseline.report) || canonicalJson(baselineAfter.seal) !== canonicalJson(acceptedBaseline.seal)) throw new Error("accepted performance baseline changed during benchmark execution");
    }
    const hostAfter = collectHostEvidence(environment.recorded);
    if (canonicalJson(hostAfter.compatibility) !== canonicalJson(hostBefore.compatibility)) throw new Error("benchmark host compatibility evidence changed during execution");

    const body = {
      role,
      outcome: role === "gate" ? "pass" : "measurement-complete",
      createdAt: new Date().toISOString(),
      policy: policyReportEvidence(policyContext),
      sampling: policyContext.policy.sampling,
      corpus: workloadReportEvidence(corpus, stagedProjects),
      harness,
      host: {
        compatibility: hostBefore.compatibility,
        compatibilityDigest: hostBefore.compatibilityDigest,
        observedBefore: hostBefore.observed,
        observedAfter: hostAfter.observed,
      },
      compilers: compilerContext.evidence,
      schedule,
      results: finalizedResults,
      profiles,
      gate: { requested: role === "gate", baselineEvidenceDigest: null, baselineReportId: null, failures: [] },
    };

    if (role === "gate") {
      body.gate.baselineEvidenceDigest = acceptedBaseline.seal.evidenceDigest;
      body.gate.baselineReportId = acceptedBaseline.report.reportId;
      try {
        assertBaselineCompatibility(body, acceptedBaseline.report);
      } catch (error) {
        body.gate.failures.push(error.message);
      }
      if (body.gate.failures.length === 0) body.gate.failures.push(...evaluatePerformanceGate({ currentReport: body, baselineReport: acceptedBaseline.report, policy: policyContext.policy }));
      body.outcome = body.gate.failures.length === 0 ? "pass" : "fail";
    }

    const report = createPerformanceReport(body);
    validatePerformanceReport(report, contract);
    const summary = renderPerformanceSummary(report);
    await writeFile(join(reportStaging, "report.json"), `${JSON.stringify(report, null, 2)}\n`, { flag: "wx", mode: 0o644 });
    await writeFile(join(reportStaging, "summary.md"), summary, { flag: "wx", mode: 0o644 });
    const seal = await sealEvidenceDirectory(reportStaging, performanceReportSealMetadata(report));
    await mkdir(dirname(destination), { recursive: true, mode: 0o755 });
    const publishedSeal = await publishSealedDirectory(reportStaging, destination);
    if (canonicalJson(publishedSeal) !== canonicalJson(seal)) throw new Error("published performance report seal changed");
    published = true;
    process.stdout.write(summary);
    process.stdout.write(`report: ${destination}\nevidence: ${seal.evidenceDigest}\n`);
    if (report.outcome === "fail") throw new Error(`performance gate failed; sealed report: ${destination}`);
    return { destination, report, seal };
  } finally {
    await removeBenchmarkStaging(workloadRoot);
    if (!published) await rm(reportStaging, { recursive: true, force: true });
  }
}

export function renderPerformanceSummary(report) {
  const lines = [
    "# TSTS Performance Evidence",
    "",
    `- Role: ${report.role}`,
    `- Outcome: ${report.outcome}`,
    `- Policy: ${report.policy.policyId}`,
    `- Measurement contract: ${report.policy.measurementContractDigest}`,
    `- Workload: ${report.corpus.workloadDigest}`,
    `- Host: ${report.host.compatibilityDigest}`,
    `- Sampling: ${report.sampling.systemCacheWarmupRounds} system-cache warmup + ${report.sampling.measuredRounds} measured interleaved rounds`,
    "",
  ];
  for (const result of report.results) {
    lines.push(`## ${result.name}`, "", `Equivalent work: ${result.work.metrics.Files} files / ${result.work.metrics.Lines} lines`, `Exact selected inputs: ${result.work.selection.files.length} files / ${result.work.selection.digest}`, "", "| metric | tsgo median | tsc median | TSTS median | TSTS CV | TSTS/tsgo | TSTS/tsc |", "|---|---:|---:|---:|---:|---:|---:|");
    for (const metric of report.policy.measurementContract.gatedMetrics) {
      const tsts = result.byCompiler.tsts.aggregate[metric];
      const tsgo = result.byCompiler.tsgo.aggregate[metric];
      const tsc = result.byCompiler.tsc.aggregate[metric];
      lines.push(`| ${metric} | ${formatMetric(tsgo.median)} | ${formatMetric(tsc.median)} | ${formatMetric(tsts.median)} | ${formatPercent(tsts.coefficientOfVariation)} | ${formatRatio(tsts.median, tsgo.median)} | ${formatRatio(tsts.median, tsc.median)} |`);
    }
    lines.push("");
  }
  if (report.role === "gate") {
    lines.push("## Regression Gate", "", report.gate.failures.length === 0 ? "PASS" : "FAIL");
    for (const failure of report.gate.failures) lines.push(`- ${failure}`);
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

function initializeResults(projects) {
  return new Map(projects.map((project) => [project.name, {
    name: project.name,
    byCompiler: Object.fromEntries(compilerIds.map((id) => [id, { selection: undefined, systemCacheWarmupSamples: [], measuredSamples: [] }])),
  }]));
}

function collectInitialWorkloadSelections({ results, projects, compilers, environment, timeoutMs }) {
  for (const project of projects) {
    for (const compiler of compilers) {
      results.get(project.name).byCompiler[compiler.id].selection = workloadSelection({ project, compiler, environment, timeoutMs });
    }
    exactWorkloadSelection(results.get(project.name).byCompiler);
  }
}

function reverifyWorkloadSelections({ results, projects, compilers, environment, timeoutMs }) {
  for (const project of projects) {
    for (const compiler of compilers) {
      const before = results.get(project.name).byCompiler[compiler.id].selection;
      const after = workloadSelection({ project, compiler, environment, timeoutMs });
      if (canonicalJson(after) !== canonicalJson(before)) throw new Error(`${project.name}/${compiler.id} workload selection changed during benchmark execution`);
    }
  }
}

function workloadSelection({ project, compiler, environment, timeoutMs }) {
  return collectWorkloadSelection({
    id: `${project.name}/${compiler.id}`,
    argv: compiler.argv,
    args: project.args,
    projectRoot: project.root,
    cwd: project.cwd,
    environment,
    timeoutMs,
  });
}

function finalizeResults(results, policy) {
  return [...results.values()].map((result) => {
    for (const compiler of compilerIds) result.byCompiler[compiler].aggregate = aggregateSamples(result.byCompiler[compiler].measuredSamples, policy.requiredMetrics);
    const metrics = exactWorkReceipt(result.byCompiler, policy.workloadEquivalence);
    const selection = exactWorkloadSelection(result.byCompiler);
    if (metrics.Files !== selection.files.length) throw new Error(`benchmark selected-file receipt does not match compiler Files metric: selected=${selection.files.length} reported=${metrics.Files}`);
    return {
      ...result,
      work: {
        metrics,
        selection,
      },
    };
  });
}

function captureProfiles({ reportStaging, projects, tsts, environment, timeoutMs, assertUnchanged }) {
  const records = [];
  const [nodeExecutable, ...tstsArgs] = tsts.argv;
  for (const project of projects) {
    const directory = join(reportStaging, "profiles", project.name);
    mkdirSyncChecked(directory);
    const cpuPath = join(directory, "cpu.cpuprofile");
    const heapPath = join(directory, "heap.heapprofile");
    runProfile(nodeExecutable, ["--cpu-prof", `--cpu-prof-dir=${directory}`, "--cpu-prof-name=cpu.cpuprofile", ...tstsArgs, ...project.args, "--pretty", "false"], project.cwd, environment, timeoutMs, `${project.name} CPU`);
    assertUnchanged();
    runProfile(nodeExecutable, ["--heap-prof", `--heap-prof-dir=${directory}`, "--heap-prof-name=heap.heapprofile", ...tstsArgs, ...project.args, "--pretty", "false"], project.cwd, environment, timeoutMs, `${project.name} heap`);
    assertUnchanged();
    const attribution = spawnSync(process.execPath, [attributePath, "--cpu", cpuPath, "--heap", heapPath, "--label", `TSTS ${project.name}`, "--top", "8"], {
      cwd: reportStaging,
      env: environment,
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
      timeout: timeoutMs,
      killSignal: "SIGKILL",
    });
    if (attribution.error !== undefined || attribution.status !== 0 || attribution.signal !== null) throw new Error(`${project.name} profile attribution failed: ${attribution.error?.message ?? attribution.stderr ?? attribution.signal}`);
    assertUnchanged();
    const attributionPath = join(directory, "attribution.txt");
    writeFileSyncChecked(attributionPath, String(attribution.stdout));
    records.push({
      project: project.name,
      commands: {
        cpu: ["<node>", "--cpu-prof", `--cpu-prof-dir=<report>/profiles/${project.name}`, "--cpu-prof-name=cpu.cpuprofile", "--expose-gc", "<prepared-tsts>/src/cli/index.js", ...project.args, "--pretty", "false"],
        heap: ["<node>", "--heap-prof", `--heap-prof-dir=<report>/profiles/${project.name}`, "--heap-prof-name=heap.heapprofile", "--expose-gc", "<prepared-tsts>/src/cli/index.js", ...project.args, "--pretty", "false"],
        attribution: ["<node>", "profiling/attribute.mjs", "--cpu", `profiles/${project.name}/cpu.cpuprofile`, "--heap", `profiles/${project.name}/heap.heapprofile`, "--label", `TSTS ${project.name}`, "--top", "8"],
      },
      cpu: { path: `profiles/${project.name}/cpu.cpuprofile`, ...executableProvenance(cpuPath) },
      heap: { path: `profiles/${project.name}/heap.heapprofile`, ...executableProvenance(heapPath) },
      attribution: { path: `profiles/${project.name}/attribution.txt`, ...executableProvenance(attributionPath) },
    });
  }
  return records;
}

function runProfile(command, args, cwd, environment, timeoutMs, label) {
  const result = spawnSync(command, args, { cwd, env: environment, encoding: "utf8", maxBuffer: 256 * 1024 * 1024, timeout: timeoutMs, killSignal: "SIGKILL" });
  if (result.error !== undefined || result.status !== 0 || result.signal !== null) throw new Error(`${label} profile failed status=${String(result.status)} signal=${String(result.signal)}: ${result.error?.message ?? result.stderr ?? ""}`);
}

function policyReportEvidence(context) {
  return {
    policyId: context.policy.policyId,
    file: context.file,
    measurementContract: context.measurementContract,
    measurementContractDigest: context.measurementContractDigest,
    limits: context.policy.limits,
  };
}

function reportContract(context) {
  return {
    sampling: context.policy.sampling,
    requiredMetrics: context.policy.requiredMetrics,
    workloadEquivalence: context.policy.workloadEquivalence,
    measurementContract: context.measurementContract,
    measurementContractDigest: context.measurementContractDigest,
  };
}

function outputDestination(options, role) {
  if (options.baselineOutput !== null) return resolveFromCwd(options.baselineOutput);
  if (options.output !== null) return resolveFromCwd(options.output);
  const timestamp = new Date().toISOString().replaceAll(":", "").replaceAll(".", "-");
  return join(repoRoot, ".tests/profiling/runs", `${timestamp}-${role}-${process.pid}-${randomUUID()}`);
}

function assertOutputScope(destination, role, policyContext) {
  const allowedRoot = role === "baseline-candidate"
    ? join(policyContext.directory, "baselines")
    : join(repoRoot, ".tests/profiling/runs");
  if (resolve(destination) === resolve(allowedRoot) || !isContainedPath(resolve(allowedRoot), resolve(destination))) {
    throw new Error(`${role} report destination must be a new child of ${allowedRoot}`);
  }
}

function formatMetric(value) {
  return Number.isFinite(value) ? value.toFixed(3) : "invalid";
}

function formatPercent(value) {
  return Number.isFinite(value) ? `${(value * 100).toFixed(1)}%` : "invalid";
}

function formatRatio(left, right) {
  return Number.isFinite(left) && Number.isFinite(right) && right > 0 ? `${(left / right).toFixed(2)}x` : "invalid";
}

function requiredValue(argv, index, option) {
  const value = argv[index];
  if (typeof value !== "string" || value === "") throw new Error(`${option} requires a value`);
  return value;
}

function resolveFromCwd(value) {
  return isAbsolute(value) ? resolve(value) : resolve(process.cwd(), value);
}

function mkdirSyncChecked(path) {
  if (existsSync(path)) throw new Error(`refusing to reuse profile directory: ${path}`);
  mkdirSync(path, { recursive: true, mode: 0o700 });
}

function writeFileSyncChecked(path, contents) {
  writeFileSync(path, contents, { flag: "wx", mode: 0o644 });
}

function assertDisjointPaths(left, right, label) {
  const absoluteLeft = resolve(left);
  const absoluteRight = resolve(right);
  if (isContainedPath(absoluteLeft, absoluteRight) || isContainedPath(absoluteRight, absoluteLeft)) throw new Error(`${label} must not overlap`);
}

function isContainedPath(parent, candidate) {
  const local = relative(parent, candidate);
  return local === "" || local !== ".." && !local.startsWith(`..${sep}`) && !isAbsolute(local);
}

const invokedPath = process.argv[1] === undefined ? null : pathToFileURL(resolve(process.argv[1])).href;
if (import.meta.url === invokedPath) await runBenchmarkCli();
