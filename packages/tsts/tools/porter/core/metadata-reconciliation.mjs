import { createHash } from "node:crypto";
import { lstatSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";

import { compareText } from "./deterministic-order.mjs";
import { collectVerifyFailures } from "./verification.mjs";

const finalizedPlans = new WeakSet();
const inputKeys = Object.freeze(["repositoryRoot", "snapshot", "status", "tsUnits"]);

export function buildMetadataReconciliationPlan(input) {
  requireExactInput(input);
  const { repositoryRoot, snapshot, status, tsUnits } = input;
  requireAbsoluteCanonicalRoot(repositoryRoot);
  requireReconciliableStatus(status);

  const goById = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (goById.has(unit.id)) throw new Error(`metadata reconciliation found duplicate Go unit '${unit.id}'`);
      goById.set(unit.id, unit);
    }
  }
  const tsById = new Map();
  for (const unit of tsUnits.units ?? []) {
    if (tsById.has(unit.id)) throw new Error(`metadata reconciliation found duplicate TypeScript unit '${unit.id}'`);
    tsById.set(unit.id, unit);
  }

  const updatesByPath = new Map();
  for (const row of status.stale) {
    requireStaleRow(row);
    const goUnit = goById.get(row.id);
    if (goUnit === undefined || goUnit.sigHash !== row.sigHash) {
      throw new Error(`stale unit '${row.id}' is not bound to its exact current Go signature hash`);
    }
    const tsUnit = tsById.get(row.id);
    if (tsUnit === undefined || tsUnit.path !== row.tsPath || tsUnit.kind !== row.kind) {
      throw new Error(`stale unit '${row.id}' is not bound to one exact TypeScript declaration`);
    }
    if (tsUnit.status !== "implemented" || tsUnit.metadata?.status !== "implemented") {
      throw new Error(`stale unit '${row.id}' must be implemented before its metadata can be reconciled`);
    }
    if (tsUnit.sigHash !== tsUnit.metadata.sigHash || tsUnit.sigHash === row.sigHash) {
      throw new Error(`stale unit '${row.id}' does not carry one distinct old signature hash`);
    }
    const declaration = tsUnit.declarationMetadata;
    if (declaration === undefined || typeof declaration.documentText !== "string" || !Number.isInteger(declaration.statementIndex)) {
      throw new Error(`stale unit '${row.id}' has no exact attached declaration metadata document`);
    }
    const updatedDocument = replaceUnitSignatureHash(declaration.documentText, tsUnit.sigHash, row.sigHash, row.id);
    const updates = updatesByPath.get(row.tsPath) ?? [];
    updates.push(Object.freeze({
      id: row.id,
      oldHash: tsUnit.sigHash,
      newHash: row.sigHash,
      statementIndex: declaration.statementIndex,
      documentText: declaration.documentText,
      updatedDocument,
    }));
    updatesByPath.set(row.tsPath, updates);
  }

  const files = [];
  for (const [relativePath, updates] of [...updatesByPath].sort(([left], [right]) => compareText(left, right))) {
    const absolutePath = resolveSourceFile(repositoryRoot, relativePath);
    const originalText = readFileSync(absolutePath, "utf8");
    let updatedText = originalText;
    let cursor = 0;
    const ordered = [...updates].sort((left, right) => left.statementIndex - right.statementIndex || compareText(left.id, right.id));
    for (const update of ordered) {
      const start = updatedText.indexOf(update.documentText, cursor);
      if (start < 0) throw new Error(`metadata document for '${update.id}' is not present in '${relativePath}' in declaration order`);
      updatedText = updatedText.slice(0, start) + update.updatedDocument + updatedText.slice(start + update.documentText.length);
      cursor = start + update.updatedDocument.length;
    }
    if (updatedText === originalText) throw new Error(`metadata reconciliation produced no change for '${relativePath}'`);
    files.push(Object.freeze({
      path: relativePath,
      absolutePath,
      originalHash: hashText(originalText),
      updatedHash: hashText(updatedText),
      originalText,
      updatedText,
      unitIds: Object.freeze(ordered.map((update) => update.id)),
    }));
  }

  const plan = Object.freeze({
    staleUnitCount: status.stale.length,
    fileCount: files.length,
    files: Object.freeze(files),
  });
  finalizedPlans.add(plan);
  return plan;
}

export function applyMetadataReconciliationPlan(value) {
  const plan = requireMetadataReconciliationPlan(value);
  for (const file of plan.files) {
    assertRegularCanonicalFile(file.absolutePath);
    const current = readFileSync(file.absolutePath, "utf8");
    if (hashText(current) !== file.originalHash || current !== file.originalText) {
      throw new Error(`refusing to reconcile changed source file '${file.path}'`);
    }
  }
  for (const file of plan.files) {
    writeFileSync(file.absolutePath, file.updatedText, "utf8");
    if (hashText(readFileSync(file.absolutePath, "utf8")) !== file.updatedHash) {
      throw new Error(`metadata reconciliation write verification failed for '${file.path}'`);
    }
  }
  return Object.freeze({ fileCount: plan.fileCount, unitCount: plan.staleUnitCount });
}

export function requireMetadataReconciliationPlan(value) {
  if (value === null || typeof value !== "object" || !finalizedPlans.has(value)) {
    throw new Error("metadata reconciliation requires one finalized plan");
  }
  return value;
}

function requireReconciliableStatus(status) {
  const staleFailure = status?.counts?.stale > 0 ? `${status.counts.stale} stale TS units` : undefined;
  const failures = collectVerifyFailures(status);
  if (status.signatureCheck.selection.kind !== "all-active") {
    throw new Error("metadata reconciliation requires an all-active signature audit");
  }
  const unrelated = failures.filter((failure) => failure !== staleFailure);
  if (unrelated.length > 0) {
    throw new Error(`metadata reconciliation requires an otherwise clean full verification: ${unrelated.join(", ")}`);
  }
  const activeCount = status.counts.portable;
  if (status.signatureCheck.checked !== activeCount || status.signatureCheck.descriptors !== activeCount) {
    throw new Error(`metadata reconciliation requires exact signature coverage of all ${activeCount} active units`);
  }
  if (status.stale.length !== status.counts.stale) {
    throw new Error("metadata reconciliation stale evidence count is inconsistent");
  }
}

function requireStaleRow(row) {
  if (row === null || typeof row !== "object" || Array.isArray(row)) throw new Error("metadata reconciliation stale evidence must be an object");
  if (row.status !== "stale" || row.reason !== "signature metadata hash drift") {
    throw new Error(`unit '${row.id ?? "<unknown>"}' is not an exact signature-metadata drift row`);
  }
  for (const key of ["id", "kind", "sigHash", "tsPath"]) {
    if (typeof row[key] !== "string" || row[key] === "") throw new Error(`metadata reconciliation stale row requires '${key}'`);
  }
  if (!/^[a-f0-9]{64}$/.test(row.sigHash)) throw new Error(`stale unit '${row.id}' has an invalid current signature hash`);
}

function replaceUnitSignatureHash(documentText, oldHash, newHash, id) {
  const starts = [...documentText.matchAll(/@tsgo-unit\s+\{/g)].map((match) => match.index);
  const idPattern = new RegExp(`"id"\\s*:\\s*${escapeRegExp(JSON.stringify(id))}`);
  const pattern = /("sigHash"\s*:\s*")([a-f0-9]{64})(")/g;
  const candidates = starts.flatMap((tagStart) => {
    const nextPorterTag = documentText.indexOf("@tsgo-", tagStart + "@tsgo-unit".length);
    const tagEnd = nextPorterTag < 0 ? documentText.length : nextPorterTag;
    const unitTag = documentText.slice(tagStart, tagEnd);
    const matches = [...unitTag.matchAll(pattern)];
    return idPattern.test(unitTag) && matches.length === 1 && matches[0][2] === oldHash
      ? [{ tagStart, match: matches[0] }]
      : [];
  });
  if (candidates.length !== 1) {
    throw new Error(`@tsgo-unit tag for '${id}' does not contain its one exact old signature hash`);
  }
  const { tagStart, match } = candidates[0];
  const hashStart = tagStart + match.index + match[1].length;
  return documentText.slice(0, hashStart) + newHash + documentText.slice(hashStart + oldHash.length);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function resolveSourceFile(repositoryRoot, relativePath) {
  if (typeof relativePath !== "string" || relativePath === "" || relativePath.includes("\\") || path.posix.isAbsolute(relativePath) || path.posix.normalize(relativePath) !== relativePath || relativePath.split("/").some((component) => component === "" || component === "." || component === "..")) {
    throw new Error(`metadata reconciliation source path is not canonical: ${String(relativePath)}`);
  }
  const absolutePath = path.resolve(repositoryRoot, ...relativePath.split("/"));
  if (!absolutePath.startsWith(`${repositoryRoot}${path.sep}`)) throw new Error(`metadata reconciliation source path escapes the repository: ${relativePath}`);
  assertRegularCanonicalFile(absolutePath);
  return absolutePath;
}

function requireAbsoluteCanonicalRoot(repositoryRoot) {
  if (typeof repositoryRoot !== "string" || !path.isAbsolute(repositoryRoot) || path.normalize(repositoryRoot) !== repositoryRoot || realpathSync(repositoryRoot) !== repositoryRoot) {
    throw new Error("metadata reconciliation repositoryRoot must be an absolute canonical non-symlink path");
  }
}

function assertRegularCanonicalFile(file) {
  const stats = lstatSync(file);
  if (stats.isSymbolicLink() || !stats.isFile() || realpathSync(file) !== file) {
    throw new Error(`metadata reconciliation source must be one canonical regular file: ${file}`);
  }
}

function requireExactInput(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error("metadata reconciliation input must be an object");
  const actual = Object.keys(value).sort(compareText);
  const expected = [...inputKeys].sort(compareText);
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`metadata reconciliation input keys must be exactly ${expected.join(", ")}`);
  }
  for (const key of expected) if (value[key] === undefined) throw new Error(`metadata reconciliation input.${key} must be defined`);
}

function hashText(text) {
  return createHash("sha256").update(text).digest("hex");
}
