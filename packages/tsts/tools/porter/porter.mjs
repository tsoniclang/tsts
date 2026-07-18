#!/usr/bin/env node
import process from "node:process";
import { main } from "./porter/cli.mjs";
import { fail } from "./porter/common.mjs";

export { main } from "./porter/cli.mjs";
export {
  activePortCategories,
  assertDirectory,
  configPath,
  countsByModule,
  escapeMd,
  fail,
  findRepoRoot,
  hashText,
  increment,
  loadConfig,
  matchGlob,
  moduleNameFor,
  parseArgs,
  repoRoot,
  resolveRepo,
  walk,
  writeJson,
  writeJsonSafely,
  writeText,
  writeTextSafely,
} from "./porter/common.mjs";
export {
  expectedTsPath,
  isActivePortPolicy,
  localTsName,
  policyFor,
  policyForUnit,
  tsFilePolicyFor,
} from "./porter/policy.mjs";
export {
  buildLocalOverrideStatus,
  buildSchemaSourceSyncStatus,
  buildStatus,
  collectSchemaSourceSyncFailures,
  emptyLocalOverrideStatus,
  emptySchemaSourceSyncStatus,
  runScan,
  scanTsUnits,
} from "./porter/scan-status.mjs";
export {
  buildGeneratedArtifactStatus,
  emptyGeneratedArtifactStatus,
} from "./porter/generated-status.mjs";
export {
  buildDraftLargeFileSplitPlan,
  buildLargeFileSplitStatus,
} from "./porter/large-file-splits.mjs";
export {
  checkSkeletons,
  renderStub,
  scaffoldMissing,
} from "./porter/scaffold.mjs";
export { buildRenderIndexes, renderUnitGroup } from "./porter/render-unit.mjs";
export { authoredFacadePathSet, buildExternalFacadeMap } from "./porter/external-facade-model.mjs";
export {
  renderExpectedGeneratedArtifacts,
  renderExternalFacadeModules,
} from "./porter/external-facade-render.mjs";
export {
  collectGeneratedArtifactFailures,
  collectLocalOverrideFailures,
  collectVerifyFailures,
  printScanSummary,
  printStatus,
  renderStatusMarkdown,
  verifyStatus,
} from "./porter/reporting.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  Promise.resolve()
    .then(() => main())
    .catch((error) => fail(error?.message ?? String(error)));
}
