import { spawnSync } from "node:child_process";

import { canonicalJson } from "../test-provenance.mjs";

export const diagnosticPhases = Object.freeze(["Parse", "Bind", "Check", "Emit"]);

export function parseExtendedDiagnostics(output) {
  const text = String(output ?? "");
  const result = {};
  for (const phase of diagnosticPhases) {
    const matches = [...text.matchAll(new RegExp(`^${phase} time:\\s+([\\d.]+)s\\s*$`, "gmi"))];
    result[phase] = matches.length === 0 ? undefined : sum(matches.map((match) => Number(match[1])));
  }
  result.Files = sumRows(text, /^Files:\s+(\d+)\s*$/gmi);
  result.Lines = sumRows(text, /^Lines(?: of [^:]+)?:\s+(\d+)\s*$/gmi);
  result.Total = sumRows(text, /^Total time:\s+([\d.]+)s\s*$/gmi);
  result.MemReportedKB = sumRows(text, /^Memory used:\s+(\d+)K\s*$/gmi);
  return result;
}

export function parseVerboseTime(stderr) {
  const text = String(stderr ?? "");
  const wall = /Elapsed \(wall clock\) time[^\n]*:\s+([\d:.]+)/.exec(text);
  const user = /User time \(seconds\):\s+([\d.]+)/.exec(text);
  const system = /System time \(seconds\):\s+([\d.]+)/.exec(text);
  const cpuPercent = /Percent of CPU this job got:\s+(\d+)%/.exec(text);
  const rss = /Maximum resident set size \(kbytes\):\s+(\d+)/.exec(text);
  let wallSecs;
  if (wall !== null) {
    const parts = wall[1].split(":").map(Number);
    wallSecs = parts.length === 3
      ? parts[0] * 3600 + parts[1] * 60 + parts[2]
      : parts.length === 2
        ? parts[0] * 60 + parts[1]
        : parts[0];
  }
  const userSecs = user === null ? undefined : Number(user[1]);
  const systemSecs = system === null ? undefined : Number(system[1]);
  return {
    wallSecs,
    userSecs,
    systemSecs,
    cpuSecs: userSecs === undefined || systemSecs === undefined ? undefined : userSecs + systemSecs,
    cpuPercent: cpuPercent === null ? undefined : Number(cpuPercent[1]),
    maxRssKB: rss === null ? undefined : Number(rss[1]),
  };
}

export function runTimedCompiler({
  id,
  argv,
  args,
  cwd,
  environment,
  requiredMetrics,
  timeExecutable = "/usr/bin/time",
  timeoutMs,
}) {
  if (!Array.isArray(argv) || argv.length === 0 || !argv.every((entry) => typeof entry === "string" && entry !== "")) throw new Error(`${id} compiler argv is invalid`);
  if (!Array.isArray(args) || !args.every((entry) => typeof entry === "string" && entry !== "")) throw new Error(`${id} compiler arguments are invalid`);
  if (!Array.isArray(requiredMetrics) || requiredMetrics.length === 0) throw new Error(`${id} compiler required metric contract is empty`);
  const controlled = new Set(args.map((entry) => entry.toLowerCase()));
  if (controlled.has("--extendeddiagnostics") || controlled.has("--pretty")) throw new Error(`${id} compiler arguments override harness-controlled diagnostics options`);
  const result = spawnSync(timeExecutable, ["-v", ...argv, ...args, "--extendedDiagnostics", "--pretty", "false"], {
    cwd,
    env: environment,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
    timeout: timeoutMs,
    killSignal: "SIGKILL",
  });
  if (result.error !== undefined) throw new Error(`${id} benchmark could not complete: ${result.error.message}`, { cause: result.error });
  if (result.status !== 0 || result.signal !== null) {
    const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim();
    throw new Error(`${id} benchmark failed status=${String(result.status)} signal=${String(result.signal)}\n${output}`);
  }
  const sample = {
    ...parseExtendedDiagnostics(`${result.stdout ?? ""}\n${result.stderr ?? ""}`),
    ...parseVerboseTime(result.stderr),
  };
  assertCompleteSample(sample, requiredMetrics, id);
  return Object.fromEntries(requiredMetrics.map((metric) => [metric, sample[metric]]));
}

export function assertCompleteSample(sample, requiredMetrics, label = "benchmark") {
  if (sample === null || typeof sample !== "object" || Array.isArray(sample)) throw new Error(`${label} sample must be an object`);
  for (const metric of requiredMetrics) {
    const value = sample[metric];
    if (!Number.isFinite(value) || value < 0) throw new Error(`${label} benchmark did not report a valid ${metric} metric`);
  }
  for (const metric of ["Files", "Lines"]) {
    if (requiredMetrics.includes(metric) && (!Number.isSafeInteger(sample[metric]) || sample[metric] <= 0)) throw new Error(`${label} benchmark reported invalid work metric ${metric}`);
  }
  for (const metric of ["Parse", "Bind", "Check", "Total", "wallSecs", "cpuSecs", "maxRssKB", "MemReportedKB"]) {
    if (requiredMetrics.includes(metric) && sample[metric] <= 0) throw new Error(`${label} benchmark reported non-positive metric ${metric}`);
  }
}

export function aggregateSamples(samples, requiredMetrics) {
  if (!Array.isArray(samples) || samples.length < 1) throw new Error("benchmark aggregation requires measured samples");
  for (const [index, sample] of samples.entries()) assertCompleteSample(sample, requiredMetrics, `benchmark sample ${index}`);
  return Object.fromEntries(requiredMetrics.map((metric) => [metric, dispersion(samples.map((sample) => sample[metric]))]));
}

export function dispersion(values) {
  if (!Array.isArray(values) || values.length === 0 || !values.every((value) => Number.isFinite(value) && value >= 0)) throw new Error("dispersion requires finite non-negative values");
  const ordered = [...values].sort((left, right) => left - right);
  const mean = sum(ordered) / ordered.length;
  const medianValue = median(ordered);
  const squaredDeviation = sum(ordered.map((value) => (value - mean) ** 2));
  const standardDeviation = ordered.length === 1 ? 0 : Math.sqrt(squaredDeviation / (ordered.length - 1));
  const medianAbsoluteDeviation = median(ordered.map((value) => Math.abs(value - medianValue)).sort((left, right) => left - right));
  return {
    count: ordered.length,
    min: ordered[0],
    max: ordered[ordered.length - 1],
    mean,
    median: medianValue,
    standardDeviation,
    medianAbsoluteDeviation,
    coefficientOfVariation: mean === 0 ? 0 : standardDeviation / mean,
  };
}

export function buildInterleavedSchedule({ projectNames, compilerIds, systemCacheWarmupRounds, measuredRounds }) {
  assertUniqueNames(projectNames, "project");
  assertUniqueNames(compilerIds, "compiler");
  if (!Number.isSafeInteger(systemCacheWarmupRounds) || systemCacheWarmupRounds < 1) throw new Error("schedule requires system-cache warmup rounds");
  if (!Number.isSafeInteger(measuredRounds) || measuredRounds < 1) throw new Error("schedule requires measured rounds");
  const schedule = [];
  let ordinal = 0;
  for (const [phase, rounds, phaseOffset] of [["system-cache-warmup", systemCacheWarmupRounds, 0], ["measured", measuredRounds, systemCacheWarmupRounds]]) {
    for (let round = 0; round < rounds; round += 1) {
      const globalRound = phaseOffset + round;
      const projects = rotate(projectNames, globalRound % projectNames.length);
      for (const [projectIndex, project] of projects.entries()) {
        const compilers = rotate(compilerIds, (globalRound + projectIndex) % compilerIds.length);
        for (const compiler of compilers) schedule.push({ ordinal: ordinal++, phase, round, project, compiler });
      }
    }
  }
  return schedule;
}

export function exactWorkReceipt(byCompiler, equivalenceMetrics) {
  const receipt = {};
  for (const metric of equivalenceMetrics) {
    const observed = [];
    for (const [compiler, result] of Object.entries(byCompiler)) {
      for (const [phase, samples] of [["system-cache-warmup", result.systemCacheWarmupSamples], ["measured", result.measuredSamples]]) {
        for (const [index, sample] of samples.entries()) observed.push({ compiler, phase, index, value: sample[metric] });
      }
    }
    if (observed.length === 0 || !observed.every((entry) => Number.isSafeInteger(entry.value) && entry.value > 0)) throw new Error(`benchmark work metric '${metric}' is incomplete`);
    const expected = observed[0].value;
    const mismatch = observed.find((entry) => entry.value !== expected);
    if (mismatch !== undefined) throw new Error(`benchmark compilers performed non-equivalent work for ${metric}: expected=${expected} ${mismatch.compiler}/${mismatch.phase}/${mismatch.index}=${mismatch.value}`);
    receipt[metric] = expected;
  }
  return receipt;
}

export function evaluatePerformanceGate({ currentReport, baselineReport, policy }) {
  const failures = [];
  for (const project of currentReport.results) {
    const baselineProject = baselineReport.results.find((entry) => entry.name === project.name);
    if (baselineProject === undefined) {
      failures.push(`${project.name}: missing from accepted baseline`);
      continue;
    }
    for (const metric of policy.gatedMetrics) {
      const current = project.byCompiler.tsts.aggregate[metric];
      const baseline = baselineProject.byCompiler.tsts.aggregate[metric];
      const currentMedian = current?.median;
      const baselineMedian = baseline?.median;
      const ratio = currentMedian / baselineMedian;
      const limit = policy.limits[metric];
      if (!Number.isFinite(currentMedian) || currentMedian <= 0 || !Number.isFinite(baselineMedian) || baselineMedian <= 0 || !Number.isFinite(ratio)) {
        failures.push(`${project.name}/${metric}: incomplete or non-positive baseline comparison`);
        continue;
      }
      if (current.coefficientOfVariation > limit.maxCoefficientOfVariation) failures.push(`${project.name}/${metric}: current coefficientOfVariation=${current.coefficientOfVariation} limit=${limit.maxCoefficientOfVariation}`);
      if (baseline.coefficientOfVariation > limit.maxCoefficientOfVariation) failures.push(`${project.name}/${metric}: baseline coefficientOfVariation=${baseline.coefficientOfVariation} limit=${limit.maxCoefficientOfVariation}`);
      if (ratio > limit.maxRegressionRatio) failures.push(`${project.name}/${metric}: regressionRatio=${ratio} limit=${limit.maxRegressionRatio}`);
    }
  }
  for (const baselineProject of baselineReport.results) if (!currentReport.results.some((entry) => entry.name === baselineProject.name)) failures.push(`${baselineProject.name}: accepted baseline project is absent from current report`);
  return failures;
}

export function assertBaselineCompatibility(currentReport, baselineReport) {
  const comparisons = [
    ["measurement contract", currentReport.policy.measurementContractDigest, baselineReport.policy.measurementContractDigest],
    ["corpus definition", currentReport.corpus.definitionDigest, baselineReport.corpus.definitionDigest],
    ["workload", currentReport.corpus.workloadDigest, baselineReport.corpus.workloadDigest],
    ["benchmark harness", currentReport.harness.digest, baselineReport.harness.digest],
    ["host", currentReport.host.compatibilityDigest, baselineReport.host.compatibilityDigest],
    ["sampling", currentReport.sampling, baselineReport.sampling],
    ["tsgo reference producer", currentReport.compilers.tsgo, baselineReport.compilers.tsgo],
    ["tsc reference producer", currentReport.compilers.tsc, baselineReport.compilers.tsc],
  ];
  for (const [label, current, baseline] of comparisons) {
    if (canonicalJson(current) !== canonicalJson(baseline)) throw new Error(`accepted performance baseline is incompatible with current ${label}`);
  }
}

export function median(values) {
  if (!Array.isArray(values) || values.length === 0 || !values.every(Number.isFinite)) throw new Error("median requires finite values");
  const ordered = [...values].sort((left, right) => left - right);
  const middle = Math.floor(ordered.length / 2);
  return ordered.length % 2 === 1 ? ordered[middle] : (ordered[middle - 1] + ordered[middle]) / 2;
}

function sumRows(text, pattern) {
  const matches = [...text.matchAll(pattern)];
  return matches.length === 0 ? undefined : sum(matches.map((match) => Number(match[1])));
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function rotate(values, offset) {
  return [...values.slice(offset), ...values.slice(0, offset)];
}

function assertUniqueNames(values, label) {
  if (!Array.isArray(values) || values.length === 0 || !values.every((value) => typeof value === "string" && value !== "")) throw new Error(`schedule ${label} names are invalid`);
  if (new Set(values).size !== values.length) throw new Error(`schedule ${label} names must be unique`);
}
