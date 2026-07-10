#!/usr/bin/env node
import process from "node:process";

import { main } from "./core/commands.mjs";
import { fail } from "./core/runtime.mjs";

export { buildGeneratedSourcePolicyStatus } from "./generated-source.mjs";
export { matchGlob } from "./path-policy.mjs";
export { main };
export {
  activePortCategories,
  expectedTsPath,
  isActivePortPolicy,
  policyFor,
  policyForUnit,
  tsFilePolicyFor,
} from "./core/policies.mjs";
export {
  assertDirectory,
  configPath,
  countsByModule,
  escapeMd,
  fail,
  findRepoRoot,
  hashText,
  increment,
  loadConfig,
  moduleNameFor,
  parseArgs,
  repoRoot,
  resolveRepo,
  walk,
  writeJson,
  writeJsonSafely,
  writeText,
  writeTextSafely,
} from "./core/runtime.mjs";
export { runScan, validatePorterSnapshot } from "./core/snapshot.mjs";
export {
  buildSchemaSourceSyncStatus,
  buildStatus,
  collectSchemaSourceSyncFailures,
  emptySchemaSourceSyncStatus,
} from "./core/status.mjs";
export {
  buildEmbeddedGoSourceUpdates,
  scanTsUnits,
  validateTsgoUnitMetadata,
} from "./core/ts-units.mjs";
export { collectMechanicalPortRisks } from "./core/mechanical-risks.mjs";
export { buildLocalOverrideStatus, emptyLocalOverrideStatus } from "./core/local-overrides.mjs";
export {
  authoredFacadePathSet,
  renderExpectedGeneratedArtifacts,
  renderExternalFacadeModules,
} from "./core/facade-artifacts.mjs";
export { buildGeneratedArtifactStatus, emptyGeneratedArtifactStatus } from "./core/generated-artifacts.mjs";
export { buildDraftLargeFileSplitPlan, buildLargeFileSplitStatus } from "./core/large-files.mjs";
export { checkSkeletons, renderStub, scaffoldMissing } from "./core/scaffolding.mjs";
export { buildRenderIndexes, renderUnitGroup } from "./core/type-renderer.mjs";
export { buildExternalFacadeMap } from "./core/external-facades.mjs";
export { localTsName } from "./core/names.mjs";
export {
  collectGeneratedArtifactFailures,
  collectLocalOverrideFailures,
  collectVerifyFailures,
  verifyStatus,
} from "./core/verification.mjs";
export { printScanSummary, printStatus, renderStatusMarkdown } from "./core/reporting.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  Promise.resolve()
    .then(() => main())
    .catch((error) => fail(error?.message ?? String(error)));
}
