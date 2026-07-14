import { buildGeneratedTypeDeclarationOwnership } from "../generated-declaration-ownership.mjs";
import { loadParser } from "../ts-extractor/ast-signatures.mjs";
import { loadConventions } from "../ts-extractor/conventions.mjs";
import { loadTypeScriptModuleIndex } from "../ts-extractor/module-index.mjs";
import { loadProfile } from "../ts-extractor/profile.mjs";
import { compareText } from "./deterministic-order.mjs";
import { requirePreparedPorterWorkspaceState } from "./workspace-state.mjs";

const preparedPrerequisites = new WeakSet();
const artifactCategories = Object.freeze([
  ["generated-facades", "generatedArtifacts"],
  ["generated-ast", "astGeneratedArtifacts"],
  ["generated-diagnostics", "diagnosticsGeneratedArtifacts"],
  ["generated-bundled", "bundledGeneratedArtifacts"],
  ["generated-unicode", "unicodeGeneratedArtifacts"],
]);
const artifactDispositions = Object.freeze(["missing", "stale", "orphan", "untracked", "invalid"]);

export async function prepareDeclarationAuditPrerequisites(workspaceState) {
  const workspace = requirePreparedPorterWorkspaceState(workspaceState);
  const issues = collectDeclarationPrerequisiteIssues(workspace.status);
  if (issues.length > 0) return finalize({ state: "blocked", issues, workspace });

  const profile = loadProfile(workspace.config);
  const api = await loadParser();
  const moduleIndex = loadTypeScriptModuleIndex(api, workspace.repositoryRoot, workspace.config.tsRoot);
  const generatedTypeOwnership = buildGeneratedTypeDeclarationOwnership(workspace.config, workspace.snapshot, moduleIndex);
  const activeIds = new Set(workspace.status.rows
    .filter((row) => row.status !== "excluded")
    .map((row) => row.id));
  return finalize({
    state: "complete",
    issues,
    workspace,
    api,
    moduleIndex,
    generatedTypeOwnership,
    activeIds,
    profile,
    conventions: loadConventions(profile.conventions ?? {}),
  });
}

export function requireDeclarationAuditPrerequisites(value) {
  if (value === null || typeof value !== "object" || !preparedPrerequisites.has(value)) {
    throw new Error("signature audit requires finalized declaration prerequisites");
  }
  return value;
}

export function collectDeclarationPrerequisiteIssues(status) {
  if (status === null || typeof status !== "object" || Array.isArray(status)) {
    throw new Error("declaration prerequisite status must be an object");
  }
  const issues = [];
  for (const [category, key] of artifactCategories) appendArtifactIssues(issues, category, requireObject(status[key], `status.${key}`));
  appendIssueRows(issues, "source-pin", requireArray(status.sourcePin?.issues, "status.sourcePin.issues"));
  appendIssueRows(issues, "schema-policy", requireArray(status.schemaSourceSync?.policyIssues, "status.schemaSourceSync.policyIssues"));
  for (const mismatch of requireArray(status.schemaSourceSync?.mismatches, "status.schemaSourceSync.mismatches")) {
    issues.push(issue("schema-source", mismatch.schema, mismatch.reason));
  }
  appendIssueRows(issues, "generated-source-policy", requireArray(status.generatedSourcePolicies?.issues, "status.generatedSourcePolicies.issues"));
  appendIssueRows(issues, "generated-source-coverage", requireArray(status.generatedSourceCoverage?.issues, "status.generatedSourceCoverage.issues"));
  appendIssueRows(issues, "generated-registration", requireArray(status.globalGeneratedArtifacts?.issues, "status.globalGeneratedArtifacts.issues"));
  appendIssueRows(issues, "local-override", requireArray(status.localOverrides?.invalidInline, "status.localOverrides.invalidInline"));
  appendIssueRows(issues, "typescript-metadata", requireArray(status.invalidTsMetadata, "status.invalidTsMetadata"));
  appendIssueRows(issues, "source-interpretation", requireArray(status.sourceInterpretationIssues, "status.sourceInterpretationIssues"));
  for (const split of requireArray(status.largeFileSplits?.issues, "status.largeFileSplits.issues")) {
    issues.push(issue("large-file-split", split.file, split.message));
  }
  for (const id of requireArray(status.duplicateGoIDs, "status.duplicateGoIDs")) issues.push(issue("duplicate-go-id", id, "Go declaration identity is duplicated"));
  for (const id of requireArray(status.duplicateTsIDs, "status.duplicateTsIDs")) issues.push(issue("duplicate-ts-id", id, "TypeScript declaration identity is duplicated"));
  return issues.sort((left, right) =>
    compareText(left.category, right.category) || compareText(left.path, right.path) || compareText(left.reason, right.reason));
}

export function declarationPrerequisiteMismatches(prerequisites) {
  const finalized = requireDeclarationAuditPrerequisites(prerequisites);
  return finalized.issues.map((entry) => ({
    id: `declaration-prerequisite:${entry.category}:${entry.path}`,
    file: entry.path,
    kind: "signature-declaration-prerequisite",
    detail: entry.reason,
  }));
}

function finalize(value) {
  const finalized = Object.freeze(value);
  preparedPrerequisites.add(finalized);
  return finalized;
}

function appendArtifactIssues(issues, category, status) {
  for (const disposition of artifactDispositions) {
    for (const entry of requireArray(status[disposition], `${category}.${disposition}`)) {
      issues.push(issue(`${category}-${disposition}`, entry.path, entry.reason));
    }
  }
}

function appendIssueRows(issues, category, rows) {
  for (const row of rows) issues.push(issue(category, row.path ?? row.id, row.reason));
}

function issue(category, path, reason) {
  if (typeof path !== "string" || path === "") throw new Error(`declaration prerequisite '${category}' requires a non-empty path`);
  if (typeof reason !== "string" || reason === "") throw new Error(`declaration prerequisite '${category}:${path}' requires a non-empty reason`);
  return Object.freeze({ category, path, reason });
}

function requireArray(value, label) {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  return value;
}

function requireObject(value, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  return value;
}
