import { main } from "./core/commands.mjs";

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
export { runScan } from "./core/scan-runner.mjs";
export { validatePorterSnapshot } from "./core/snapshot.mjs";
export {
  buildSchemaSourceSyncStatus,
  buildStatus,
  collectSchemaSourceSyncFailures,
  emptySchemaSourceSyncStatus,
} from "./core/status.mjs";
export { scanTsUnits, validateTsgoUnitMetadata } from "./core/ts-units.mjs";
export { buildLocalOverrideStatus, emptyLocalOverrideStatus } from "./core/local-overrides.mjs";
export {
  authoredFacadePathSet,
  renderCoreRuntimeGeneratedArtifacts,
  renderExpectedGeneratedArtifacts,
  renderExternalFacadeModules,
} from "./core/facade-artifacts.mjs";
export { buildCoreRuntimeArtifactStatus, buildGeneratedArtifactStatus, emptyGeneratedArtifactStatus } from "./core/generated-artifacts.mjs";
export { buildDraftLargeFileSplitPlan, buildLargeFileSplitStatus } from "./core/large-files.mjs";
export { checkSkeletons, scaffoldMissing } from "./core/scaffolding.mjs";
export { renderUnitGroup } from "./core/type-renderer.mjs";
export { prepareExternalFacadeStorageCatalog } from "./core/authored-facade-selections.mjs";
export { localTsName } from "./core/names.mjs";
export {
  collectGeneratedArtifactFailures,
  collectLocalOverrideFailures,
  collectVerifyFailures,
  verifyStatus,
} from "./core/verification.mjs";
export { printScanSummary, printStatus, renderStatusMarkdown } from "./core/reporting.mjs";
