#!/usr/bin/env node
// Generates the TSTS Unicode data tables consumed by internal/stringutil,
// faithfully porting the logic of TS-Go's
// internal/stringutil/_scripts/generate-unicode-data.mts but emitting TypeScript
// that matches the go/unicode.ts RangeTable contract instead of Go.
//
// All Unicode data is sourced from a single version-pinned @unicode/unicode-*
// package so the generated tables are reproducible from checked-in inputs (the
// devDependency in package.json) without an implicit network fetch at run time.
// Bumping UNICODE_VERSION (and the matching devDependency) is the only step
// needed to move to a newer Unicode version.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import {
  inspectGeneratedArtifactRegistration,
  inventoryGeneratedArtifactsForProvider,
  renderGeneratedArtifactEnvelope,
  stripGeneratedArtifactEnvelope,
} from "../porter/generated-artifact-registry.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const generatedKind = "unicode-generated";
const generatedBy = "porter:unicode";

// The pinned Unicode version. Recorded in @tsgo-generated metadata as
// sourceRevision because these tables derive from the Unicode database, not the
// TS-Go git pin (they are TS-Go-pin-independent).
export const UNICODE_VERSION = "15.1.0";
const PACKAGE = `@unicode/unicode-${UNICODE_VERSION}`;

const TS_ROOT = "packages/tsts/src";
const GENERATED_DIR = "internal/stringutil/generated";
const IDENTIFIER_ARTIFACT_PATH = `${GENERATED_DIR}/identifier_parts_generated.ts`;
const CASE_ARTIFACT_PATH = `${GENERATED_DIR}/js_case_generated.ts`;

// ── Data loading (async; mirrors the upstream loadCodePoints/loadMapping) ──

async function loadCodePoints(property) {
  const module = await import(`${PACKAGE}/${property}/code-points.js`);
  return module.default;
}

async function loadMapping(property) {
  const module = await import(`${PACKAGE}/${property}/code-points.js`);
  return module.default;
}

// ── Range compression (faithful to the upstream toStrideRanges/toRangeTable) ──

function toStrideRanges(sorted) {
  const ranges = [];
  let i = 0;
  while (i < sorted.length) {
    const lo = sorted[i];
    const stride = i + 1 < sorted.length ? sorted[i + 1] - sorted[i] : 1;
    let hi = lo;
    let j = i + 1;
    while (j < sorted.length && sorted[j] === hi + stride) {
      hi = sorted[j];
      j++;
    }
    ranges.push({ lo, hi, stride });
    i = j;
  }
  return ranges;
}

function toRangeTable(codePoints) {
  const sorted = [...new Set(codePoints)].sort((a, b) => a - b);
  const bmp = sorted.filter((cp) => cp <= 0xffff);
  const astral = sorted.filter((cp) => cp > 0xffff);
  const r16 = toStrideRanges(bmp);
  const r32 = toStrideRanges(astral);
  let latinOffset = 0;
  while (latinOffset < r16.length && r16[latinOffset].hi <= 0xff) {
    latinOffset++;
  }
  return { r16, r32, latinOffset };
}

async function buildSpecialCasing() {
  const lowerMappings = await loadMapping("Special_Casing/Lowercase");
  const upperMappings = await loadMapping("Special_Casing/Uppercase");
  const finalSigmaMappings = await loadMapping("Special_Casing/Lowercase--Final_Sigma");

  const entries = [];
  const codePoints = new Set([...lowerMappings.keys(), ...upperMappings.keys()]);
  for (const codePoint of codePoints) {
    entries.push({
      codePoint,
      lower: lowerMappings.get(codePoint) ?? [codePoint],
      upper: upperMappings.get(codePoint) ?? [codePoint],
      condition: "specialCasingConditionNone",
    });
  }
  for (const [codePoint, lower] of finalSigmaMappings) {
    entries.push({
      codePoint,
      lower,
      upper: upperMappings.get(codePoint) ?? [codePoint],
      condition: "specialCasingConditionFinalSigma",
    });
  }
  entries.sort((a, b) => a.codePoint - b.codePoint);
  return entries;
}

// ── TS rendering (RangeTable contract from go/unicode.ts) ──

function hex(codePoint) {
  return `0x${codePoint.toString(16).toUpperCase()}`;
}

// Render the lower/upper expansion as a JS string literal containing exactly the
// given code points (JS strings are UTF-16 code-unit strings, so astral code
// points become surrogate pairs via String.fromCodePoint, matching how
// String.prototype.toLowerCase/toUpperCase produce them).
function jsStringLiteral(codePoints) {
  return JSON.stringify(String.fromCodePoint(...codePoints));
}

function renderRangeTable(name, table) {
  const r16 = table.r16.map((r) => `    { Lo: ${hex(r.lo)}, Hi: ${hex(r.hi)}, Stride: ${r.stride} },`).join("\n");
  const r32 = table.r32.map((r) => `    { Lo: ${hex(r.lo)}, Hi: ${hex(r.hi)}, Stride: ${r.stride} },`).join("\n");
  return `export const ${name}: RangeTable = {
  R16: [
${r16}
  ],
  R32: [
${r32}
  ],
  LatinOffset: ${table.latinOffset},
};
`;
}

function renderIdentifierBody(startTable, partTable) {
  return `// Based on http://www.unicode.org/reports/tr31/ and
// https://www.ecma-international.org/ecma-262/6.0/#sec-names-and-keywords:
// unicodeESNextIdentifierStart corresponds to the ID_Start and Other_ID_Start property, and
// unicodeESNextIdentifierPart corresponds to ID_Continue, Other_ID_Continue, plus ID_Start and Other_ID_Start.

import type { RangeTable } from "../../../go/unicode.js";

${renderRangeTable("unicodeESNextIdentifierStart", startTable)}
${renderRangeTable("unicodeESNextIdentifierPart", partTable)}`;
}

function renderCaseBody(entries, casedTable, caseIgnorableTable) {
  const mappings = entries
    .map(
      (entry) =>
        `  [${hex(entry.codePoint)}, { lower: ${jsStringLiteral(entry.lower)}, upper: ${jsStringLiteral(entry.upper)}, condition: ${entry.condition} }],`,
    )
    .join("\n");

  return `// Includes only the locale-insensitive multi-rune mappings needed for ECMAScript
// default casing, plus the Final_Sigma context mapping. String.prototype.toLowerCase
// applies Final_Sigma, but unicode.ToLower does not, so the caser applies it from this
// data when in context. unicode.ToLower handles the simple one-rune mappings, so those
// are omitted here.

import type { uint } from "../../../go/scalars.js";
import type { GoRune } from "../../../go/compat.js";
import type { RangeTable } from "../../../go/unicode.js";

export type specialCasingCondition = uint;
export const specialCasingConditionNone: specialCasingCondition = 0;
export const specialCasingConditionFinalSigma: specialCasingCondition = 1;

export interface specialCasingMapping {
  lower: string;
  upper: string;
  condition: specialCasingCondition;
}

export const specialCasingMappings: ReadonlyMap<GoRune, specialCasingMapping> = new Map<GoRune, specialCasingMapping>([
${mappings}
]);

${renderRangeTable("unicodeCasedRanges", casedTable)}
${renderRangeTable("unicodeCaseIgnorableRanges", caseIgnorableTable)}`;
}

// ── Generated-artifact header (mirrors generate-bundled.mjs) ──

function hashText(text) {
  return createHash("sha256").update(text).digest("hex");
}

function withGeneratedHeader(artifactPath, body) {
  return renderGeneratedArtifactEnvelope({
    body,
    header: "// Code generated by TSTS unicode generator. DO NOT EDIT.",
    kind: generatedKind,
    path: artifactPath,
    providerId: generatedBy,
    sourceRevision: UNICODE_VERSION,
  });
}

function stripGeneratedHeader(text) {
  return stripGeneratedArtifactEnvelope(text);
}

function resolveRepo(relativePath) {
  return path.resolve(repoRoot, relativePath);
}

const EXPECTED_ARTIFACT_PATHS = [IDENTIFIER_ARTIFACT_PATH, CASE_ARTIFACT_PATH];

// ── Async full regeneration (the source of truth) ──

export async function buildExpectedUnicodeArtifacts(config = {}) {
  const tsRoot = (config.tsRoot ?? TS_ROOT).replace(/\/$/, "");
  const idStart = await loadCodePoints("Binary_Property/ID_Start");
  const idContinue = await loadCodePoints("Binary_Property/ID_Continue");
  const startTable = toRangeTable(idStart);
  const partTable = toRangeTable([...idContinue, ...idStart]);

  const entries = await buildSpecialCasing();
  const casedTable = toRangeTable(await loadCodePoints("Binary_Property/Cased"));
  const caseIgnorableTable = toRangeTable(await loadCodePoints("Binary_Property/Case_Ignorable"));

  const artifacts = new Map();
  artifacts.set(
    `${tsRoot}/${IDENTIFIER_ARTIFACT_PATH}`,
    withGeneratedHeader(
      IDENTIFIER_ARTIFACT_PATH,
      renderIdentifierBody(startTable, partTable),
    ),
  );
  artifacts.set(
    `${tsRoot}/${CASE_ARTIFACT_PATH}`,
    withGeneratedHeader(
      CASE_ARTIFACT_PATH,
      renderCaseBody(entries, casedTable, caseIgnorableTable),
    ),
  );
  return artifacts;
}

export async function writeUnicodeGenerated(config = {}) {
  const artifacts = await buildExpectedUnicodeArtifacts(config);
  for (const [relativePath, text] of artifacts) {
    const absolutePath = resolveRepo(relativePath);
    mkdirSync(path.dirname(absolutePath), { recursive: true });
    writeFileSync(absolutePath, text);
  }
  return artifacts.size;
}

export async function buildUnicodeGeneratedArtifactStatusDeep(config = {}) {
  const tsRoot = config.tsRoot ?? TS_ROOT;
  const expected = await buildExpectedUnicodeArtifacts(config);
  return computeStatus(expected, tsRoot);
}

// ── Sync light status (used by porter status/verify; no async data load) ──
// Detects missing, orphan, untracked, invalid, locally-edited (contentHash !=
// hash(body)), and stale-by-version (sourceRevision != UNICODE_VERSION). The
// authoritative output-drift gate is the async deep check (`porter:unicode --check`).

export function buildUnicodeGeneratedArtifactStatus(config = {}) {
  return computeStatus(undefined, config.tsRoot ?? TS_ROOT);
}

function computeStatus(expected, tsRoot) {
  const normalizedTsRoot = tsRoot.replace(/\/$/, "");
  const expectedPaths = new Set(EXPECTED_ARTIFACT_PATHS.map((relativePath) => `${normalizedTsRoot}/${relativePath}`));
  const inventory = inventoryGeneratedArtifactsForProvider(resolveRepo(normalizedTsRoot), generatedBy);
  const actualArtifactPaths = inventory.files;
  const actualPaths = actualArtifactPaths.map((relativePath) => `${normalizedTsRoot}/${relativePath}`);
  const actualPathSet = new Set(actualPaths);
  const missing = [];
  const stale = [];
  const orphan = [];
  const untracked = [];
  const invalid = inventory.invalid.map((entry) => ({ ...entry, path: `${normalizedTsRoot}/${entry.path}` }));

  for (const relativePath of [...expectedPaths].sort()) {
    if (!actualPathSet.has(relativePath)) {
      missing.push({ path: relativePath, reason: "Expected Unicode generated artifact is missing." });
    }
  }

  for (let index = 0; index < actualPaths.length; index++) {
    const relativePath = actualPaths[index];
    const artifactPath = actualArtifactPaths[index];
    const text = readFileSync(resolveRepo(relativePath), "utf8");
    const metadataResult = inspectGeneratedArtifactRegistration(artifactPath, text);
    if (metadataResult.error) {
      invalid.push({ path: relativePath, reason: metadataResult.error });
      continue;
    }
    if (!metadataResult.metadata) {
      untracked.push({ path: relativePath, reason: "Unicode generated artifacts must carry @tsgo-generated metadata." });
      continue;
    }
    const metadata = metadataResult.metadata;
    if (!expectedPaths.has(relativePath)) {
      orphan.push({ path: relativePath, metadata, reason: "Unicode generated artifact metadata exists, but this artifact is no longer generated by the pinned Unicode contract." });
      continue;
    }
    if (metadata.sourceRevision !== UNICODE_VERSION) {
      stale.push({ path: relativePath, metadata, reason: `Unicode generated artifact was generated from Unicode ${metadata.sourceRevision}, expected ${UNICODE_VERSION}.` });
      continue;
    }
    const body = stripGeneratedHeader(text);
    if (hashText(body) !== metadata.contentHash) {
      stale.push({ path: relativePath, metadata, expectedHash: metadata.contentHash, actualHash: hashText(body), reason: "Unicode generated artifact body was edited after generation (contentHash mismatch)." });
      continue;
    }
    if (expected !== undefined) {
      const expectedText = expected.get(relativePath);
      if (text !== expectedText) {
        stale.push({ path: relativePath, metadata, expectedHash: hashText(stripGeneratedHeader(expectedText)), actualHash: hashText(body), reason: "Unicode generated artifact contents differ from the current deterministic output." });
      }
    }
  }

  return { missing, stale, orphan, untracked, invalid };
}

export function emptyUnicodeGeneratedArtifactStatus() {
  return { missing: [], stale: [], orphan: [], untracked: [], invalid: [] };
}

export function collectUnicodeArtifactFailures(status) {
  const failures = [];
  if (status.missing.length > 0) failures.push(`${status.missing.length} missing unicode artifacts`);
  if (status.stale.length > 0) failures.push(`${status.stale.length} stale unicode artifacts`);
  if (status.orphan.length > 0) failures.push(`${status.orphan.length} orphan unicode artifacts`);
  if (status.untracked.length > 0) failures.push(`${status.untracked.length} untracked unicode artifacts`);
  if (status.invalid.length > 0) failures.push(`${status.invalid.length} invalid unicode artifacts`);
  return failures;
}

async function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has("--help")) {
    console.log("Usage: node packages/tsts/tools/unicode/generate-unicode-data.mjs [--check|--write]");
    process.exit(0);
  }
  const check = args.has("--check");
  if (check) {
    const status = await buildUnicodeGeneratedArtifactStatusDeep();
    const failures = collectUnicodeArtifactFailures(status);
    if (failures.length > 0) {
      throw new Error(`unicode generated artifact check failed: ${failures.join(", ")}`);
    }
    console.log(`unicode generated files are current (Unicode ${UNICODE_VERSION})`);
  } else {
    const count = await writeUnicodeGenerated();
    console.log(`unicode generated files written (${count} files, Unicode ${UNICODE_VERSION})`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
