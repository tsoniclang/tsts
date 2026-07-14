import { computeSignatureReport, requireSignatureOperationEvidence } from "../sig-check.mjs";
import {
  buildGoValueOperationGeneratedArtifactStatus,
  collectGoValueOperationArtifactFailures,
  writeGoValueOperationGenerated,
} from "./value-operations/generated-artifacts.mjs";
import { buildGoValueOperationPlan } from "./value-operations/operation-plan.mjs";
import { prepareDeclarationAuditPrerequisites } from "./declaration-prerequisites.mjs";
import { compareText } from "./deterministic-order.mjs";
import { fail, repoRoot } from "./runtime.mjs";
import { runPinnedScan } from "./scan-runner.mjs";
import { preparePorterWorkspaceState, requirePreparedPorterWorkspaceState } from "./workspace-state.mjs";

const artifactInputKeys = Object.freeze(["signatureReport", "workspace"]);

export function buildGoValueOperationArtifactInput(input) {
  requireExactInput(input, artifactInputKeys, "Go value-operation workflow input");
  const workspace = requirePreparedPorterWorkspaceState(input.workspace);
  const evidence = requireSignatureOperationEvidence(input.signatureReport);
  const plan = buildGoValueOperationPlan({
    auditedStorage: evidence.auditedTypeStorage,
    config: workspace.config,
    generatorOwnedProviders: evidence.generatorOwnedProviders,
    largeFileSplits: workspace.largeFileSplits,
    reviewedProviders: evidence.reviewedProviders,
    snapshot: workspace.snapshot,
    tsUnits: workspace.tsUnits,
    unitOwnership: evidence.unitOwnership,
  });
  return Object.freeze({
    config: workspace.config,
    externalFacadeCatalog: workspace.externalFacadeCatalog,
    largeFileSplits: workspace.largeFileSplits,
    plan,
    snapshot: workspace.snapshot,
  });
}

export async function runGoValueOperations(config, options = {}) {
  const snapshot = runPinnedScan(config);
  const workspace = await preparePorterWorkspaceState({
    config,
    repositoryRoot: repoRoot,
    snapshot,
    unicodeMode: "metadata",
  });
  const prerequisites = await prepareDeclarationAuditPrerequisites(workspace);
  const signatureReport = await computeSignatureReport(prerequisites);
  const artifactInput = buildGoValueOperationArtifactInput({ signatureReport, workspace });
  if (options.write === true) {
    const results = writeGoValueOperationGenerated(artifactInput, { force: options.force === true });
    for (const result of results) console.log(`${result.outcome}: ${result.path}`);
    console.log(`Go value-operation generated files written (${results.length})`);
    return;
  }
  const status = buildGoValueOperationGeneratedArtifactStatus(artifactInput);
  const failures = collectGoValueOperationArtifactFailures(status);
  if (failures.length > 0) fail(`Go value-operation generated artifact check failed: ${failures.join(", ")}`);
  console.log(`Go value-operation generated artifact check passed (${artifactInput.plan.generatedCount} generated providers)`);
}

function requireExactInput(value, expectedKeys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const actual = Object.keys(value).sort(compareText);
  const expected = [...expectedKeys].sort(compareText);
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
  for (const key of expected) if (value[key] === undefined) throw new Error(`${label}.${key} must be defined`);
}
