#!/usr/bin/env node
import { createHash } from "node:crypto";
import { closeSync, constants, fstatSync, lstatSync, openSync, readFileSync } from "node:fs";
import { basename, dirname, isAbsolute, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalJson } from "../test-provenance.mjs";
import { verifyEvidenceDirectory } from "../sealed-evidence.mjs";
import {
  loadResultLedger,
  renderMarkdown,
  validateReportPayload,
  validateReportSealMetadata,
  validateRunConfig,
} from "./run.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(scriptPath), "../../../..");
const strictUtf8Decoder = new TextDecoder("utf-8", { fatal: true });

export function verifyTsgoSuiteReport(reportPath, options = {}) {
  if (typeof reportPath !== "string" || reportPath === "") throw new Error("TS-Go suite report path is required");
  const directory = isAbsolute(reportPath) ? resolve(reportPath) : resolve(repoRoot, reportPath);
  assertRegularDirectory(directory, "TS-Go suite report directory");
  if (!/^report-\d{4}$/.test(basename(directory)) || basename(dirname(directory)) !== "reports") throw new Error("TS-Go suite report directory must be report-NNNN under a reports directory");
  assertRegularDirectory(dirname(directory), "TS-Go suite reports directory");
  const reportRoot = dirname(dirname(directory));
  assertRegularDirectory(reportRoot, "TS-Go suite report root");

  const seal = verifyEvidenceDirectory(directory, "REPORT.json");
  assertReportEvidenceInventory(seal.inventory);
  const resultsBytes = readVerifiedFile(directory, "results.json", evidenceRecord(seal.inventory, "results.json"));
  const summaryBytes = readVerifiedFile(directory, "summary.md", evidenceRecord(seal.inventory, "summary.md"));
  const report = parseJsonBytes(resultsBytes, "TS-Go suite results.json");
  validateReportPayload(report, { reportRoot });

  const runConfigBytes = readProvenanceFile(reportRoot, report.runConfig, "TS-Go suite run config");
  const runConfig = parseJsonBytes(runConfigBytes, "TS-Go suite run config");
  validateRunConfig(runConfig, report.runManifest);
  if (canonicalJson(runConfig.runManifest) !== canonicalJson(report.runManifest)) throw new Error("TS-Go suite report run config manifest does not match report manifest");

  const segmentInputs = report.resultSegments.map((segment) => {
    const segmentBytes = readProvenanceFile(reportRoot, segment, `TS-Go suite result segment ${segment.sequence}`);
    const sealBytes = readProvenanceFile(reportRoot, segment.seal, `TS-Go suite result segment ${segment.sequence} seal`);
    const segmentSeal = parseJsonBytes(sealBytes, `TS-Go suite result segment ${segment.sequence} seal`);
    if (canonicalJson(segmentSeal) !== canonicalJson(segment.seal.value)) throw new Error(`TS-Go suite result segment ${segment.sequence} seal bytes do not match report evidence`);
    return {
      sequence: segment.sequence,
      path: resolveProvenancePath(reportRoot, segment.path),
      content: segmentBytes,
      seal: {
        path: resolveProvenancePath(reportRoot, segment.seal.path),
        bytes: segment.seal.bytes,
        sha256: segment.seal.sha256,
        value: segmentSeal,
      },
    };
  });
  const ledger = loadResultLedger(segmentInputs, report.runManifest);
  validateReportPayload(report, { ledger, reportRoot });

  const markdown = decodeUtf8(summaryBytes, "TS-Go suite summary.md");
  if (markdown !== renderMarkdown(report.summary, report.results, report.inventory, report.caseRoot, report.runManifest)) throw new Error("TS-Go suite summary markdown does not match report data");
  validateReportSealMetadata(seal.metadata, report);
  if (options.requirePassed === true && seal.metadata.outcome !== "passed") {
    throw new Error(`TS-Go suite report is not a passing gate: outcome=${seal.metadata.outcome} complete=${report.summary.complete} failed=${report.summary.failed}`);
  }
  return { directory, reportRoot, seal, report };
}

function assertReportEvidenceInventory(inventory) {
  if (inventory?.schemaVersion !== 1 || !Array.isArray(inventory.records) || inventory.records.length !== 2) throw new Error("TS-Go suite report evidence inventory is invalid");
  const paths = inventory.records.map((entry) => entry.path).sort();
  if (canonicalJson(paths) !== canonicalJson(["results.json", "summary.md"])) throw new Error("TS-Go suite report evidence inventory has unexpected entries");
  for (const entry of inventory.records) {
    if (entry.kind !== "file" || !Number.isSafeInteger(entry.bytes) || entry.bytes < 0 || !/^[0-9a-f]{64}$/.test(entry.sha256)) throw new Error(`TS-Go suite report evidence record is invalid: ${entry.path}`);
  }
}

function evidenceRecord(inventory, path) {
  const matches = inventory.records.filter((entry) => entry.path === path);
  if (matches.length !== 1) throw new Error(`TS-Go suite report evidence is missing '${path}'`);
  return matches[0];
}

function readVerifiedFile(root, relativePath, provenance) {
  const bytes = readRegularFileOnce(resolveProvenancePath(root, relativePath), `verified file '${relativePath}'`);
  if (bytes.length !== provenance.bytes || sha256(bytes) !== provenance.sha256) throw new Error(`verified file bytes do not match evidence seal: ${relativePath}`);
  return bytes;
}

function readProvenanceFile(root, provenance, label) {
  const bytes = readRegularFileOnce(resolveProvenancePath(root, provenance.path), label);
  if (bytes.length !== provenance.bytes || sha256(bytes) !== provenance.sha256) throw new Error(`${label} bytes do not match report provenance`);
  return bytes;
}

function resolveProvenancePath(root, relativePath) {
  if (typeof relativePath !== "string" || relativePath === "" || relativePath.includes("\\") || relativePath.startsWith("/") || relativePath.split("/").some((part) => part === "" || part === "." || part === "..")) throw new Error(`unsafe TS-Go suite provenance path '${relativePath}'`);
  const resolvedRoot = resolve(root);
  const destination = resolve(resolvedRoot, ...relativePath.split("/"));
  if (destination !== resolvedRoot && !destination.startsWith(`${resolvedRoot}${sep}`)) throw new Error(`TS-Go suite provenance path escapes report root: ${relativePath}`);
  let parent = resolvedRoot;
  for (const part of relativePath.split("/").slice(0, -1)) {
    parent = resolve(parent, part);
    assertRegularDirectory(parent, "TS-Go suite provenance parent");
  }
  return destination;
}

function readRegularFileOnce(file, label) {
  const noFollow = constants.O_NOFOLLOW ?? 0;
  const descriptor = openSync(file, constants.O_RDONLY | noFollow);
  try {
    const fileStat = fstatSync(descriptor);
    if (!fileStat.isFile()) throw new Error(`${label} must be a regular file: ${file}`);
    return readFileSync(descriptor);
  } finally {
    closeSync(descriptor);
  }
}

function assertRegularDirectory(directory, label) {
  const directoryStat = lstatSync(directory);
  if (!directoryStat.isDirectory() || directoryStat.isSymbolicLink()) throw new Error(`${label} must be a regular directory: ${directory}`);
}

function parseJsonBytes(bytes, label) {
  try {
    return JSON.parse(decodeUtf8(bytes, label));
  } catch (error) {
    throw new Error(`${label} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function decodeUtf8(bytes, label) {
  try {
    return strictUtf8Decoder.decode(bytes);
  } catch (error) {
    throw new Error(`${label} is not valid UTF-8: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const verified = verifyTsgoSuiteReport(process.argv[2], { requirePassed: true });
    console.log(`verified TS-Go suite report ${verified.report.runFingerprint} outcome=${verified.seal.metadata.outcome} cases=${verified.report.summary.total}`);
  } catch (error) {
    console.error(error instanceof Error ? error.stack : String(error));
    process.exitCode = 1;
  }
}
