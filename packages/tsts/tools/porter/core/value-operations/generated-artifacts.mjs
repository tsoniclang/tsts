import { readFileSync } from "node:fs";
import path from "node:path";

import {
  inspectGeneratedArtifactRegistration,
  inventoryGeneratedArtifactsForProvider,
} from "../../generated-artifact-registry.mjs";
import { compareText } from "../deterministic-order.mjs";
import { resolveRepo, writeTextSafely } from "../runtime.mjs";
import { renderGoValueOperationArtifacts } from "./artifact-renderer.mjs";
import { registerGoValueOperationArtifacts } from "./registered-artifacts.mjs";

const inputKeys = Object.freeze(["config", "externalFacadeCatalog", "generatedDeclarationOwners", "largeFileSplits", "plan", "snapshot"]);

export function buildGoValueOperationGeneratedFiles(input) {
  requireExactInput(input, inputKeys, "Go value-operation generated-file input");
  return registerGoValueOperationArtifacts({
    artifacts: renderGoValueOperationArtifacts(input),
    config: input.config,
    snapshot: input.snapshot,
  });
}

export function buildGoValueOperationGeneratedArtifactStatus(input) {
  const expected = buildGoValueOperationGeneratedFiles(input);
  const expectedPaths = new Set(expected.keys());
  const tsRoot = input.config.tsRoot.replace(/\/+$/, "");
  const inventory = inventoryGeneratedArtifactsForProvider(resolveRepo(tsRoot), "porter:value-operations");
  const actualPaths = new Set(inventory.files);
  const missing = [];
  const stale = [];
  const orphan = [];
  const untracked = [];
  const invalid = inventory.invalid.map((entry) => ({ ...entry }));

  for (const relativePath of [...expectedPaths].sort(compareText)) {
    if (!actualPaths.has(relativePath)) {
      missing.push({ path: relativePath, reason: "Expected generated Go value-operation artifact is missing." });
    }
  }
  for (const relativePath of inventory.files) {
    const source = readFileSync(resolveRepo(path.posix.join(tsRoot, relativePath)), "utf8");
    const registration = inspectGeneratedArtifactRegistration(relativePath, source);
    if (registration.error !== undefined) {
      invalid.push({ path: relativePath, reason: registration.error });
      continue;
    }
    if (registration.metadata === undefined) {
      untracked.push({ path: relativePath, reason: "Generated Go value-operation artifact is missing exact registration metadata." });
      continue;
    }
    if (registration.provider?.id !== "porter:value-operations") {
      invalid.push({ path: relativePath, reason: `generated artifact path is registered to '${registration.provider?.id ?? "missing"}' instead of 'porter:value-operations'` });
      continue;
    }
    if (!expectedPaths.has(relativePath)) {
      orphan.push({ path: relativePath, reason: "Generated Go value-operation artifact has no declaration-derived owner in the current pinned source." });
      continue;
    }
    if (source !== expected.get(relativePath)) {
      stale.push({ path: relativePath, reason: "Generated Go value-operation artifact differs from the current deterministic declaration-derived output." });
    }
  }
  return { state: "complete", missing, stale, orphan, untracked, invalid };
}

export function collectGoValueOperationArtifactFailures(status) {
  requireGoValueOperationGeneratedArtifactStatus(status);
  if (status.state !== "complete") {
    return [`Go value-operation generated-artifact audit must be complete (${status.reason})`];
  }
  const failures = [];
  if (status.missing.length > 0) failures.push(`${status.missing.length} missing Go value-operation artifacts`);
  if (status.stale.length > 0) failures.push(`${status.stale.length} stale Go value-operation artifacts`);
  if (status.orphan.length > 0) failures.push(`${status.orphan.length} orphan Go value-operation artifacts`);
  if (status.untracked.length > 0) failures.push(`${status.untracked.length} untracked Go value-operation artifacts`);
  if (status.invalid.length > 0) failures.push(`${status.invalid.length} invalid Go value-operation artifacts`);
  return failures;
}

export function writeGoValueOperationGenerated(input, options = {}) {
  const expected = buildGoValueOperationGeneratedFiles(input);
  const tsRoot = input.config.tsRoot.replace(/\/+$/, "");
  const results = [];
  for (const [relativePath, source] of expected) {
    const outcome = writeTextSafely(resolveRepo(path.posix.join(tsRoot, relativePath)), source, {
      force: options.force === true,
      label: "Go value-operation generated artifact",
    });
    results.push({ outcome, path: relativePath });
  }
  return results;
}

export function notRunGoValueOperationGeneratedArtifactStatus(reason) {
  if (typeof reason !== "string" || reason.trim() === "" || reason !== reason.trim()) {
    throw new Error("Go value-operation generated-artifact not-run status requires one non-empty trimmed reason");
  }
  return { state: "not-run", reason, missing: [], stale: [], orphan: [], untracked: [], invalid: [] };
}

export function requireGoValueOperationGeneratedArtifactStatus(status) {
  if (status === null || typeof status !== "object" || Array.isArray(status)) throw new Error("Go value-operation artifact status must be an object");
  const keys = status.state === "complete"
    ? ["invalid", "missing", "orphan", "stale", "state", "untracked"]
    : status.state === "not-run"
      ? ["invalid", "missing", "orphan", "reason", "stale", "state", "untracked"]
      : [];
  if (keys.length === 0) throw new Error("Go value-operation artifact status.state must be 'complete' or 'not-run'");
  const actual = Object.keys(status).sort(compareText);
  const expected = [...keys].sort(compareText);
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`Go value-operation artifact status keys must be exactly ${expected.join(", ")}`);
  }
  for (const key of ["invalid", "missing", "orphan", "stale", "untracked"]) {
    if (!Array.isArray(status[key])) throw new Error(`Go value-operation artifact status.${key} must be an array`);
  }
  if (status.state === "not-run") {
    if (typeof status.reason !== "string" || status.reason.trim() === "" || status.reason !== status.reason.trim()) {
      throw new Error("Go value-operation artifact status.reason must be one non-empty trimmed string");
    }
    for (const key of ["invalid", "missing", "orphan", "stale", "untracked"]) {
      if (status[key].length !== 0) throw new Error(`Go value-operation artifact not-run status.${key} must be empty`);
    }
  }
  return status;
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
