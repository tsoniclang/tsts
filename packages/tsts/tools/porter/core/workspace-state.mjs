import { buildBundledGeneratedArtifactStatus } from "../../bundled/generate-bundled.mjs";
import {
  buildUnicodeGeneratedArtifactStatus,
  buildUnicodeGeneratedArtifactStatusDeep,
} from "../../unicode/generate-unicode-data.mjs";
import { buildAstGeneratedArtifactStatus } from "../ast-generator.mjs";
import { buildDiagnosticsGeneratedArtifactStatus } from "../diagnostics-generator.mjs";
import {
  buildGeneratedSourceCoverageStatus,
  buildGlobalGeneratedArtifactStatus,
} from "../generated-source.mjs";
import { buildSourcePinStatus } from "../source-pin.mjs";
import { prepareExternalFacadeStorageCatalog } from "./authored-facade-selections.mjs";
import { compareText } from "./deterministic-order.mjs";
import { buildGeneratedArtifactStatus } from "./generated-artifacts.mjs";
import { buildLargeFileSplitStatus } from "./large-files.mjs";
import { buildLocalOverrideStatus } from "./local-overrides.mjs";
import { resolveRepo } from "./runtime.mjs";
import { buildSchemaSourceSyncStatus, buildStatus } from "./status.mjs";
import { parserOptionsForConfig, scanTsUnits } from "./ts-units.mjs";
import { notRunGoValueOperationGeneratedArtifactStatus } from "./value-operations/generated-artifacts.mjs";

const preparedWorkspaceStates = new WeakSet();
const inputKeys = Object.freeze(["config", "repositoryRoot", "snapshot", "unicodeMode"]);

export async function preparePorterWorkspaceState(input) {
  requireExactInput(input, inputKeys, "Porter workspace state input");
  const { config, repositoryRoot, snapshot, unicodeMode } = input;
  if (unicodeMode !== "metadata" && unicodeMode !== "deep") {
    throw new Error(`Porter workspace unicodeMode must be 'metadata' or 'deep'; got ${JSON.stringify(unicodeMode)}`);
  }

  const tsUnits = await scanTsUnits(resolveRepo(config.tsRoot), { parser: parserOptionsForConfig(config) });
  const externalFacadeCatalog = await prepareExternalFacadeStorageCatalog(config, snapshot, repositoryRoot);
  const generatedArtifacts = buildGeneratedArtifactStatus(config, snapshot, externalFacadeCatalog);
  const astGeneratedArtifacts = buildAstGeneratedArtifactStatus(config, snapshot.gitRevision);
  const diagnosticsGeneratedArtifacts = buildDiagnosticsGeneratedArtifactStatus(config, snapshot.gitRevision);
  const bundledGeneratedArtifacts = buildBundledGeneratedArtifactStatus(config, snapshot.gitRevision);
  const unicodeGeneratedArtifacts = unicodeMode === "deep"
    ? await buildUnicodeGeneratedArtifactStatusDeep(config)
    : buildUnicodeGeneratedArtifactStatus(config);
  const schemaSourceSync = buildSchemaSourceSyncStatus(config);
  const localOverrides = buildLocalOverrideStatus(config, tsUnits);
  const sourcePin = buildSourcePinStatus(repositoryRoot, config, snapshot);
  const generatedSourceCoverage = buildGeneratedSourceCoverageStatus(repositoryRoot, config, snapshot);
  const globalGeneratedArtifacts = buildGlobalGeneratedArtifactStatus(repositoryRoot, config);
  const largeFileSplits = buildLargeFileSplitStatus(config, snapshot);
  const valueOperationGeneratedArtifacts = notRunGoValueOperationGeneratedArtifactStatus(
    "This workspace preparation stage has not run the whole-program signature audit required to derive Go value-operation artifacts.",
  );
  const status = buildStatus({
    config,
    snapshot,
    tsUnits,
    generatedArtifacts,
    astGeneratedArtifacts,
    diagnosticsGeneratedArtifacts,
    bundledGeneratedArtifacts,
    unicodeGeneratedArtifacts,
    schemaSourceSync,
    localOverrides,
    sourcePin,
    generatedSourceCoverage,
    globalGeneratedArtifacts,
    largeFileSplits,
    valueOperationGeneratedArtifacts,
  });
  const state = Object.freeze({
    config,
    repositoryRoot,
    snapshot,
    unicodeMode,
    tsUnits,
    externalFacadeCatalog,
    generatedArtifacts,
    astGeneratedArtifacts,
    diagnosticsGeneratedArtifacts,
    bundledGeneratedArtifacts,
    unicodeGeneratedArtifacts,
    schemaSourceSync,
    localOverrides,
    sourcePin,
    generatedSourceCoverage,
    globalGeneratedArtifacts,
    largeFileSplits,
    valueOperationGeneratedArtifacts,
    status,
  });
  preparedWorkspaceStates.add(state);
  return state;
}

export function requirePreparedPorterWorkspaceState(value) {
  if (value === null || typeof value !== "object" || !preparedWorkspaceStates.has(value)) {
    throw new Error("declaration work requires one finalized Porter workspace state");
  }
  return value;
}

function requireExactInput(value, expectedKeys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const actualKeys = Object.keys(value).sort(compareText);
  const expected = [...expectedKeys].sort(compareText);
  if (actualKeys.length !== expected.length || actualKeys.some((key, index) => key !== expected[index])) {
    throw new Error(`${label} keys must be exactly ${expected.join(", ")}; got ${actualKeys.join(", ")}`);
  }
  for (const key of expected) if (value[key] === undefined) throw new Error(`${label}.${key} must be defined`);
}
