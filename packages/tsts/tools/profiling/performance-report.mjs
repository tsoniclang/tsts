import { canonicalJson, compareUtf8, fingerprint } from "../test-provenance.mjs";
import { readVerifiedEvidenceJson } from "../sealed-evidence.mjs";
import { aggregateSamples, assertCompleteSample, buildInterleavedSchedule, exactWorkReceipt } from "./benchmark-core.mjs";
import { exactWorkloadSelection, validateWorkloadSelection } from "./benchmark-selection.mjs";
import { PERFORMANCE_REPORT_KIND, PERFORMANCE_REPORT_SCHEMA_VERSION } from "./performance-policy.mjs";

const REPORT_KEYS = [
  "compilers",
  "corpus",
  "createdAt",
  "gate",
  "harness",
  "host",
  "kind",
  "outcome",
  "policy",
  "profiles",
  "reportId",
  "results",
  "role",
  "sampling",
  "schedule",
  "schemaVersion",
];

export function createPerformanceReport(body) {
  const unsigned = {
    schemaVersion: PERFORMANCE_REPORT_SCHEMA_VERSION,
    kind: PERFORMANCE_REPORT_KIND,
    ...body,
  };
  if (Object.hasOwn(unsigned, "reportId")) throw new Error("performance report body must not supply reportId");
  const report = { ...unsigned, reportId: fingerprint(unsigned, "tsts-performance-report-v3") };
  assertExactKeys(report, REPORT_KEYS, "performance report");
  return report;
}

export function performanceReportSealMetadata(report) {
  return {
    kind: PERFORMANCE_REPORT_KIND,
    schemaVersion: PERFORMANCE_REPORT_SCHEMA_VERSION,
    role: report.role,
    reportId: report.reportId,
    outcome: report.outcome,
  };
}

export function readVerifiedPerformanceReport(directory, contract) {
  const verified = readVerifiedEvidenceJson(directory, "report.json");
  validatePerformanceReport(verified.value, contract);
  if (canonicalJson(verified.seal.metadata) !== canonicalJson(performanceReportSealMetadata(verified.value))) throw new Error("performance report seal metadata mismatch");
  return { report: verified.value, seal: verified.seal };
}

export function validatePerformanceReport(report, contract) {
  assertExactKeys(report, REPORT_KEYS, "performance report");
  if (report.schemaVersion !== PERFORMANCE_REPORT_SCHEMA_VERSION || report.kind !== PERFORMANCE_REPORT_KIND) throw new Error("unsupported performance report identity");
  if (!new Set(["measurement", "baseline-candidate", "gate"]).has(report.role)) throw new Error("performance report role is invalid");
  if (!new Set(["measurement-complete", "pass", "fail"]).has(report.outcome)) throw new Error("performance report outcome is invalid");
  if (report.role === "gate" && !new Set(["pass", "fail"]).has(report.outcome)) throw new Error("gate report outcome is invalid");
  if (report.role !== "gate" && report.outcome !== "measurement-complete") throw new Error("measurement report outcome is invalid");
  if (typeof report.createdAt !== "string" || Number.isNaN(Date.parse(report.createdAt))) throw new Error("performance report createdAt is invalid");
  if (typeof report.reportId !== "string" || !/^[0-9a-f]{64}$/.test(report.reportId)) throw new Error("performance reportId is invalid");
  const { reportId, ...unsigned } = report;
  if (fingerprint(unsigned, "tsts-performance-report-v3") !== reportId) throw new Error("performance reportId mismatch");

  assertExactKeys(report.sampling, ["measuredRounds", "systemCacheWarmupRounds", "timeoutMs"], "performance report sampling");
  if (canonicalJson(report.sampling) !== canonicalJson(contract.sampling)) throw new Error("performance report sampling does not match its policy contract");
  assertExactKeys(report.compilers, ["tsc", "tsgo", "tsts"], "performance report compilers");
  validateCompilerEvidence(report.compilers);
  validatePolicyEvidence(report.policy, contract);
  validateCorpusEvidence(report.corpus);
  validateHarnessEvidence(report.harness);
  validateHostEvidence(report.host);
  assertExactKeys(report.gate, ["baselineEvidenceDigest", "baselineReportId", "failures", "requested"], "performance report gate");
  if (typeof report.gate.requested !== "boolean" || !Array.isArray(report.gate.failures) || !report.gate.failures.every((entry) => typeof entry === "string" && entry !== "")) throw new Error("performance report gate result is invalid");
  if (report.gate.requested !== (report.role === "gate")) throw new Error("performance report gate role mismatch");
  if (report.role === "gate") {
    if (!/^[0-9a-f]{64}$/.test(report.gate.baselineEvidenceDigest) || !/^[0-9a-f]{64}$/.test(report.gate.baselineReportId)) throw new Error("performance gate baseline binding is invalid");
    if ((report.outcome === "pass") !== (report.gate.failures.length === 0)) throw new Error("performance gate outcome does not match failures");
  } else if (report.gate.baselineEvidenceDigest !== null || report.gate.baselineReportId !== null || report.gate.failures.length !== 0) {
    throw new Error("non-gate performance report contains gate state");
  }

  if (!Array.isArray(report.results) || report.results.length === 0) throw new Error("performance report results are empty");
  const names = new Set();
  for (const result of report.results) {
    assertExactKeys(result, ["byCompiler", "name", "work"], "performance project result");
    if (typeof result.name !== "string" || !/^[a-z0-9][a-z0-9._-]*$/.test(result.name) || names.has(result.name)) throw new Error("performance project result name is unsafe or duplicate");
    names.add(result.name);
    assertExactKeys(result.byCompiler, ["tsc", "tsgo", "tsts"], `performance project '${result.name}' compilers`);
    for (const [compiler, value] of Object.entries(result.byCompiler)) validateCompilerResult(value, compiler, result.name, contract);
    assertExactKeys(result.work, ["metrics", "selection"], `performance project '${result.name}' work receipt`);
    const metrics = exactWorkReceipt(result.byCompiler, contract.workloadEquivalence);
    const selection = exactWorkloadSelection(result.byCompiler);
    if (metrics.Files !== selection.files.length) throw new Error(`performance project '${result.name}' selected-file count does not match its Files metric`);
    if (canonicalJson({ metrics, selection }) !== canonicalJson(result.work)) throw new Error(`performance project '${result.name}' work receipt mismatch`);
  }
  const stagedNames = report.corpus.stagedProjects.map((project) => project.name).sort(compareUtf8);
  const resultNames = [...names].sort(compareUtf8);
  const definitionNames = report.corpus.definition.projects.map((project) => project.name).sort(compareUtf8);
  if (canonicalJson(stagedNames) !== canonicalJson(resultNames) || canonicalJson(definitionNames) !== canonicalJson(resultNames)) throw new Error("performance corpus and result project sets do not match");
  validateSchedule(report.schedule, [...names], report.sampling);
  validateProfiles(report.profiles, names);
  return report;
}

function validatePolicyEvidence(policy, contract) {
  assertExactKeys(policy, ["file", "limits", "measurementContract", "measurementContractDigest", "policyId"], "performance report policy");
  assertExactKeys(policy.file, ["bytes", "sha256"], "performance policy file evidence");
  if (!Number.isSafeInteger(policy.file.bytes) || policy.file.bytes <= 0 || !isSha256(policy.file.sha256)) throw new Error("performance policy file evidence is invalid");
  if (typeof policy.policyId !== "string" || policy.policyId !== policy.measurementContract?.policyId) throw new Error("performance report policyId mismatch");
  if (fingerprint(policy.measurementContract, "tsts-performance-measurement-contract-v1") !== policy.measurementContractDigest || policy.measurementContractDigest !== contract.measurementContractDigest || canonicalJson(policy.measurementContract) !== canonicalJson(contract.measurementContract)) throw new Error("performance report measurement contract digest mismatch");
  assertExactKeys(policy.limits, policy.measurementContract.gatedMetrics, "performance report policy limits");
}

function validateCompilerEvidence(compilers) {
  const tsts = compilers.tsts;
  assertExactKeys(tsts, ["argv", "cli", "id", "preparedBuild"], "TSTS performance compiler evidence");
  if (tsts.id !== "tsts" || canonicalJson(tsts.argv) !== canonicalJson(["<node>", "--expose-gc", "<prepared-tsts>/src/cli/index.js"])) throw new Error("TSTS performance compiler command is invalid");
  validateByteIdentity(tsts.cli, "TSTS performance CLI");
  const build = tsts.preparedBuild;
  assertExactKeys(build, ["buildId", "evidenceDigest", "output", "request", "schemaVersion"], "TSTS prepared-build evidence");
  if (build.schemaVersion !== 3 || !isSha256(build.buildId) || !isSha256(build.evidenceDigest) || build.buildId !== fingerprint(build.request, "tsts-prepared-build-v1") || build.request?.schemaVersion !== 3) throw new Error("TSTS prepared-build evidence is invalid");
  validateInputRoot(build.output, "TSTS prepared-build output");

  const tsgo = compilers.tsgo;
  assertExactKeys(tsgo, ["argv", "id", "producer", "sourcePin"], "TS-Go performance compiler evidence");
  if (tsgo.id !== "tsgo" || canonicalJson(tsgo.argv) !== canonicalJson(["<pinned-tsgo>"])) throw new Error("TS-Go performance compiler command is invalid");
  assertExactKeys(tsgo.sourcePin, ["nestedSources", "path", "primary", "schemaVersion", "sha256"], "TS-Go performance source pin");
  if (tsgo.sourcePin.schemaVersion !== 1 || typeof tsgo.sourcePin.path !== "string" || tsgo.sourcePin.path === "" || !isSha256(tsgo.sourcePin.sha256) || !Array.isArray(tsgo.sourcePin.nestedSources)) throw new Error("TS-Go performance source pin is invalid");
  validateCheckout(tsgo.sourcePin.primary, "TS-Go performance primary checkout");
  const producer = tsgo.producer;
  assertExactKeys(producer, ["binary", "buildMetadata", "producerId", "request", "schemaVersion"], "TS-Go performance producer");
  if (producer.schemaVersion !== 2 || !isSha256(producer.producerId) || producer.producerId !== fingerprint(producer.request, "tsts-pinned-go-producer-v2") || producer.request?.schemaVersion !== 2) throw new Error("TS-Go performance producer identity is invalid");
  assertExactKeys(producer.binary, ["bytes", "name", "sha256"], "TS-Go performance producer binary");
  if (typeof producer.binary.name !== "string" || producer.binary.name === "" || !Number.isSafeInteger(producer.binary.bytes) || producer.binary.bytes <= 0 || !isSha256(producer.binary.sha256)) throw new Error("TS-Go performance producer binary is invalid");

  const tsc = compilers.tsc;
  assertExactKeys(tsc, ["argv", "entry", "id", "package"], "tsc performance compiler evidence");
  if (tsc.id !== "tsc" || canonicalJson(tsc.argv) !== canonicalJson(["<node>", "node_modules/typescript/bin/tsc"])) throw new Error("tsc performance compiler command is invalid");
  validateByteIdentity(tsc.entry, "tsc performance entry");
  validateInputRootsEvidence(tsc.package, "tsc performance package");
}

function validateCorpusEvidence(corpus) {
  assertExactKeys(corpus, ["definition", "definitionDigest", "schemaVersion", "sourceEvidence", "stagedProjects", "workloadDigest"], "performance report corpus");
  if (corpus.schemaVersion !== 2) throw new Error("performance report corpus schemaVersion is invalid");
  if (fingerprint(corpus.definition, "tsts-performance-corpus-definition-v2") !== corpus.definitionDigest) throw new Error("performance corpus definition digest mismatch");
  validateInputRootsEvidence(corpus.sourceEvidence, "performance corpus source evidence");
  if (fingerprint({ definitionDigest: corpus.definitionDigest, sourceEvidence: corpus.sourceEvidence }, "tsts-performance-workload-v1") !== corpus.workloadDigest) throw new Error("performance workload digest mismatch");
  if (!Array.isArray(corpus.stagedProjects) || corpus.stagedProjects.length === 0) throw new Error("performance staged project evidence is empty");
  for (const project of corpus.stagedProjects) {
    assertExactKeys(project, ["args", "copies", "name", "stagedEvidence"], "performance staged project");
    if (typeof project.name !== "string" || !/^[a-z0-9][a-z0-9._-]*$/.test(project.name) || !Array.isArray(project.args) || !Array.isArray(project.copies)) throw new Error("performance staged project evidence is invalid");
    validateInputRootsEvidence(project.stagedEvidence, `performance staged project '${project.name}' evidence`);
  }
}

function validateHarnessEvidence(harness) {
  assertExactKeys(harness, ["digest", "inputs", "schemaVersion"], "performance harness evidence");
  if (harness.schemaVersion !== 1) throw new Error("performance harness evidence schemaVersion is invalid");
  validateInputRootsEvidence(harness.inputs, "performance harness inputs");
  if (fingerprint(harness.inputs, "tsts-performance-harness-v1") !== harness.digest) throw new Error("performance harness digest mismatch");
}

function validateHostEvidence(host) {
  assertExactKeys(host, ["compatibility", "compatibilityDigest", "observedAfter", "observedBefore"], "performance host evidence");
  if (fingerprint(host.compatibility, "tsts-performance-host-v1") !== host.compatibilityDigest) throw new Error("performance host compatibility digest mismatch");
  for (const [label, observation] of [["before", host.observedBefore], ["after", host.observedAfter]]) {
    assertExactKeys(observation, ["capturedAt", "cpuSpeedsMHz", "freeMemoryBytes", "loadAverage", "uptimeSeconds"], `performance host ${label} observation`);
    if (typeof observation.capturedAt !== "string" || Number.isNaN(Date.parse(observation.capturedAt)) || !Array.isArray(observation.cpuSpeedsMHz) || !Array.isArray(observation.loadAverage)) throw new Error(`performance host ${label} observation is invalid`);
  }
}

function validateProfiles(profiles, projectNames) {
  if (!Array.isArray(profiles)) throw new Error("performance report profiles must be an array");
  const names = new Set();
  for (const profile of profiles) {
    assertExactKeys(profile, ["attribution", "commands", "cpu", "heap", "project"], "performance profile evidence");
    if (!projectNames.has(profile.project) || names.has(profile.project)) throw new Error("performance profile project is invalid or duplicate");
    names.add(profile.project);
    assertExactKeys(profile.commands, ["attribution", "cpu", "heap"], "performance profile commands");
    for (const command of Object.values(profile.commands)) if (!Array.isArray(command) || command.length === 0 || !command.every((entry) => typeof entry === "string" && entry !== "")) throw new Error("performance profile command evidence is invalid");
    for (const [kind, evidence] of [["cpu", profile.cpu], ["heap", profile.heap], ["attribution", profile.attribution]]) {
      assertExactKeys(evidence, ["bytes", "path", "sha256"], `performance ${kind} profile evidence`);
      const expectedPrefix = `profiles/${profile.project}/`;
      if (typeof evidence.path !== "string" || !evidence.path.startsWith(expectedPrefix) || evidence.path.split("/").some((part) => part === "" || part === "." || part === "..") || !Number.isSafeInteger(evidence.bytes) || evidence.bytes <= 0 || !isSha256(evidence.sha256)) throw new Error(`performance ${kind} profile evidence is invalid`);
    }
  }
}

function validateInputRootsEvidence(evidence, label) {
  assertExactKeys(evidence, ["digest", "roots", "schemaVersion"], label);
  if (evidence.schemaVersion !== 1 || !Array.isArray(evidence.roots) || evidence.roots.length === 0 || evidence.digest !== fingerprint(evidence.roots, "tsts-input-roots-v1")) throw new Error(`${label} is invalid`);
}

function validateInputRoot(root, label) {
  assertExactKeys(root, ["bytes", "digest", "fileCount", "kind", "label", "mode", "symlinkCount", "symlinkPolicy"], label);
  if (typeof root.label !== "string" || root.label === "" || !new Set(["file", "directory", "symlink"]).has(root.kind) || !Number.isSafeInteger(root.mode) || !Number.isSafeInteger(root.fileCount) || !Number.isSafeInteger(root.symlinkCount) || !Number.isSafeInteger(root.bytes) || !isSha256(root.digest)) throw new Error(`${label} is invalid`);
}

function validateByteIdentity(identity, label) {
  assertExactKeys(identity, ["bytes", "sha256"], label);
  if (!Number.isSafeInteger(identity.bytes) || identity.bytes <= 0 || !isSha256(identity.sha256)) throw new Error(`${label} is invalid`);
}

function validateCheckout(checkout, label) {
  assertExactKeys(checkout, ["dirty", "objectFormat", "revision", "tree"], label);
  const length = checkout.objectFormat === "sha1" ? 40 : checkout.objectFormat === "sha256" ? 64 : 0;
  if (length === 0 || checkout.dirty !== false || typeof checkout.revision !== "string" || typeof checkout.tree !== "string" || !new RegExp(`^[0-9a-f]{${length}}$`).test(checkout.revision) || !new RegExp(`^[0-9a-f]{${length}}$`).test(checkout.tree)) throw new Error(`${label} is invalid`);
}

function isSha256(value) {
  return typeof value === "string" && /^[0-9a-f]{64}$/.test(value);
}

function validateCompilerResult(value, compiler, project, contract) {
  assertExactKeys(value, ["aggregate", "measuredSamples", "selection", "systemCacheWarmupSamples"], `performance ${project}/${compiler}`);
  validateWorkloadSelection(value.selection, `performance ${project}/${compiler} workload selection`);
  if (!Array.isArray(value.systemCacheWarmupSamples) || value.systemCacheWarmupSamples.length !== contract.sampling.systemCacheWarmupRounds) throw new Error(`performance ${project}/${compiler} warmup sample count mismatch`);
  if (!Array.isArray(value.measuredSamples) || value.measuredSamples.length !== contract.sampling.measuredRounds) throw new Error(`performance ${project}/${compiler} measured sample count mismatch`);
  for (const [index, sample] of [...value.systemCacheWarmupSamples, ...value.measuredSamples].entries()) {
    assertExactKeys(sample, contract.requiredMetrics, `performance ${project}/${compiler} sample ${index}`);
    assertCompleteSample(sample, contract.requiredMetrics, `${project}/${compiler}/${index}`);
  }
  assertExactKeys(value.aggregate, contract.requiredMetrics, `performance ${project}/${compiler} aggregate`);
  const expected = aggregateSamples(value.measuredSamples, contract.requiredMetrics);
  if (canonicalJson(expected) !== canonicalJson(value.aggregate)) throw new Error(`performance ${project}/${compiler} aggregate does not match samples`);
}

function validateSchedule(schedule, projectNames, sampling) {
  if (!Array.isArray(schedule)) throw new Error("performance report schedule must be an array");
  const expectedLength = (sampling.systemCacheWarmupRounds + sampling.measuredRounds) * projectNames.length * 3;
  if (schedule.length !== expectedLength) throw new Error("performance report schedule length mismatch");
  for (const [index, entry] of schedule.entries()) {
    assertExactKeys(entry, ["compiler", "ordinal", "phase", "project", "round"], `performance schedule entry ${index}`);
    if (entry.ordinal !== index || !projectNames.includes(entry.project) || !new Set(["tsts", "tsgo", "tsc"]).has(entry.compiler)) throw new Error(`performance schedule entry ${index} is invalid`);
    const rounds = entry.phase === "system-cache-warmup" ? sampling.systemCacheWarmupRounds : entry.phase === "measured" ? sampling.measuredRounds : 0;
    if (!Number.isSafeInteger(entry.round) || entry.round < 0 || entry.round >= rounds) throw new Error(`performance schedule entry ${index} round is invalid`);
  }
  const expected = buildInterleavedSchedule({ projectNames, compilerIds: ["tsts", "tsgo", "tsc"], ...sampling });
  if (canonicalJson(schedule) !== canonicalJson(expected)) throw new Error("performance report schedule does not match the interleaving contract");
}

function assertExactKeys(value, expected, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  if (canonicalJson(Object.keys(value).sort(compareUtf8)) !== canonicalJson([...expected].sort(compareUtf8))) throw new Error(`${label} has invalid keys`);
}
