import { createHash } from "node:crypto";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";

import { canonicalJson, compareUtf8, fingerprint, readStableRegularFile } from "../test-provenance.mjs";
import { WORKLOAD_SELECTION_CONTRACT } from "./benchmark-selection.mjs";

export const PERFORMANCE_POLICY_SCHEMA_VERSION = 1;
export const PERFORMANCE_REPORT_SCHEMA_VERSION = 3;
export const PERFORMANCE_REPORT_KIND = "tsts-performance-report";
export const SUPPORTED_METRICS = Object.freeze([
  "Files",
  "Lines",
  "Parse",
  "Bind",
  "Check",
  "Total",
  "MemReportedKB",
  "wallSecs",
  "userSecs",
  "systemSecs",
  "cpuSecs",
  "cpuPercent",
  "maxRssKB",
]);

export function loadPerformancePolicy(file) {
  const path = resolve(file);
  const bytes = readStableRegularFile(path, "performance policy");
  let policy;
  try {
    policy = JSON.parse(bytes.toString("utf8"));
  } catch (error) {
    throw new Error(`performance policy is not valid JSON: ${path}`, { cause: error });
  }
  validatePerformancePolicy(policy);

  const directory = dirname(path);
  const corpusPath = resolveContained(directory, policy.corpus, "performance policy corpus");
  const baselinePath = policy.baseline.path === null
    ? null
    : resolveContained(directory, policy.baseline.path, "performance policy baseline");
  const measurementContract = {
    schemaVersion: PERFORMANCE_POLICY_SCHEMA_VERSION,
    policyId: policy.policyId,
    corpus: policy.corpus,
    sampling: policy.sampling,
    requiredMetrics: policy.requiredMetrics,
    gatedMetrics: policy.gatedMetrics,
    workloadEquivalence: policy.workloadEquivalence,
    workloadSelection: WORKLOAD_SELECTION_CONTRACT,
  };
  return {
    path,
    directory,
    corpusPath,
    baselinePath,
    policy,
    file: { bytes: bytes.length, sha256: sha256(bytes) },
    measurementContract,
    measurementContractDigest: fingerprint(measurementContract, "tsts-performance-measurement-contract-v1"),
  };
}

export function validatePerformancePolicy(policy) {
  assertExactKeys(policy, [
    "baseline",
    "corpus",
    "gatedMetrics",
    "limits",
    "policyId",
    "requiredMetrics",
    "sampling",
    "schemaVersion",
    "workloadEquivalence",
  ], "performance policy");
  if (policy.schemaVersion !== PERFORMANCE_POLICY_SCHEMA_VERSION) throw new Error(`unsupported performance policy schemaVersion '${policy.schemaVersion}'`);
  if (typeof policy.policyId !== "string" || !/^[a-z0-9][a-z0-9._-]*$/.test(policy.policyId)) throw new Error("performance policyId must be a safe stable identifier");
  assertSafeRelativePath(policy.corpus, "performance policy corpus");

  assertExactKeys(policy.sampling, ["measuredRounds", "systemCacheWarmupRounds", "timeoutMs"], "performance policy sampling");
  if (!Number.isSafeInteger(policy.sampling.systemCacheWarmupRounds) || policy.sampling.systemCacheWarmupRounds < 1) throw new Error("performance policy requires at least one system-cache warmup round");
  if (!Number.isSafeInteger(policy.sampling.measuredRounds) || policy.sampling.measuredRounds < 5) throw new Error("performance policy requires at least five measured rounds");
  if (!Number.isSafeInteger(policy.sampling.timeoutMs) || policy.sampling.timeoutMs < 1_000 || policy.sampling.timeoutMs > 30 * 60 * 1_000) throw new Error("performance policy timeoutMs is invalid");

  assertMetricList(policy.requiredMetrics, "performance policy requiredMetrics");
  if (canonicalJson([...policy.requiredMetrics].sort(compareUtf8)) !== canonicalJson([...SUPPORTED_METRICS].sort(compareUtf8))) {
    throw new Error("performance policy requiredMetrics must contain the complete supported metric contract");
  }
  assertMetricList(policy.gatedMetrics, "performance policy gatedMetrics");
  for (const metric of policy.gatedMetrics) if (!policy.requiredMetrics.includes(metric) || new Set(["Files", "Lines", "cpuPercent"]).has(metric)) throw new Error(`performance policy cannot gate metric '${metric}'`);
  assertMetricList(policy.workloadEquivalence, "performance policy workloadEquivalence");
  if (canonicalJson(policy.workloadEquivalence) !== canonicalJson(["Files", "Lines"])) throw new Error("performance policy workloadEquivalence must require exact Files and Lines");

  assertExactKeys(policy.baseline, ["acceptedReportId", "evidenceDigest", "path", "status"], "performance policy baseline");
  if (!new Set(["calibration-required", "calibrated"]).has(policy.baseline.status)) throw new Error("performance policy baseline status is invalid");
  assertExactKeys(policy.limits, policy.gatedMetrics, "performance policy limits");
  for (const metric of policy.gatedMetrics) {
    const limit = policy.limits[metric];
    assertExactKeys(limit, ["maxCoefficientOfVariation", "maxRegressionRatio"], `performance policy limit '${metric}'`);
  }

  if (policy.baseline.status === "calibration-required") {
    for (const key of ["acceptedReportId", "evidenceDigest", "path"]) if (policy.baseline[key] !== null) throw new Error(`uncalibrated performance baseline '${key}' must be null`);
    for (const metric of policy.gatedMetrics) {
      const limit = policy.limits[metric];
      if (limit.maxRegressionRatio !== null || limit.maxCoefficientOfVariation !== null) throw new Error(`uncalibrated performance limit '${metric}' must remain null`);
    }
    return;
  }

  assertSafeRelativePath(policy.baseline.path, "performance baseline path");
  if (!policy.baseline.path.startsWith("baselines/") || policy.baseline.path === "baselines/") throw new Error("performance baseline path must name a child of baselines/");
  if (typeof policy.baseline.evidenceDigest !== "string" || !/^[0-9a-f]{64}$/.test(policy.baseline.evidenceDigest)) throw new Error("performance baseline evidenceDigest is invalid");
  if (typeof policy.baseline.acceptedReportId !== "string" || !/^[0-9a-f]{64}$/.test(policy.baseline.acceptedReportId)) throw new Error("performance baseline acceptedReportId is invalid");
  for (const metric of policy.gatedMetrics) {
    const limit = policy.limits[metric];
    if (!Number.isFinite(limit.maxRegressionRatio) || limit.maxRegressionRatio < 1) throw new Error(`performance maxRegressionRatio for '${metric}' must be at least 1`);
    if (!Number.isFinite(limit.maxCoefficientOfVariation) || limit.maxCoefficientOfVariation <= 0 || limit.maxCoefficientOfVariation > 1) throw new Error(`performance maxCoefficientOfVariation for '${metric}' must be in (0, 1]`);
  }
}

export function requireCalibratedPolicy(policyContext) {
  if (policyContext.policy.baseline.status !== "calibrated") {
    throw new Error("performance gate is fail-closed: policy baseline calibration is required before --gate can run");
  }
  return policyContext.baselinePath;
}

function assertMetricList(value, label) {
  if (!Array.isArray(value) || value.length === 0) throw new Error(`${label} must be a non-empty array`);
  const seen = new Set();
  for (const metric of value) {
    if (typeof metric !== "string" || !SUPPORTED_METRICS.includes(metric) || seen.has(metric)) throw new Error(`${label} contains invalid or duplicate metric '${metric}'`);
    seen.add(metric);
  }
}

function assertSafeRelativePath(value, label) {
  if (typeof value !== "string" || value === "" || isAbsolute(value) || value.includes("\\")) throw new Error(`${label} must be a safe relative POSIX path`);
  const parts = value.split("/");
  if (parts.some((part) => part === "" || part === "." || part === "..")) throw new Error(`${label} must be a safe relative POSIX path`);
}

function resolveContained(root, value, label) {
  assertSafeRelativePath(value, label);
  const absoluteRoot = resolve(root);
  const candidate = resolve(absoluteRoot, value);
  const local = relative(absoluteRoot, candidate);
  if (local === ".." || local.startsWith(`..${sep}`) || isAbsolute(local)) throw new Error(`${label} escapes its policy directory`);
  return candidate;
}

function assertExactKeys(value, expected, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  if (canonicalJson(Object.keys(value).sort(compareUtf8)) !== canonicalJson([...expected].sort(compareUtf8))) throw new Error(`${label} has invalid keys`);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
