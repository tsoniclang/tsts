import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { compareText } from "./deterministic-order.mjs";
import { parseTypeScriptModule } from "../ts-extractor/module-index.mjs";
import { loadParser } from "../ts-extractor/parser-runtime.mjs";
import { loadProfile } from "../ts-extractor/profile.mjs";
import { repoRoot, resolveRepo, walk } from "./runtime.mjs";

export function parserOptionsForConfig(config, root = repoRoot) {
  const parser = loadProfile(config).parser;
  return {
    distRoot: path.join(root, parser.distRoot),
    freshnessSrcDirs: parser.freshnessSrcDirs.map((directory) => path.join(root, directory)),
  };
}

export async function scanTsUnits(root, options = {}) {
  if (!existsSync(root)) return { fileCount: 0, files: [], units: [] };
  const api = options.api ?? await loadParser(options.parser);
  const files = walk(root).filter((file) => file.endsWith(".ts")).sort(compareText);
  const fileReports = [];
  const units = [];
  const unitsById = new Map();
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const relativeFile = path.relative(repoRoot, file).split(path.sep).join("/");
    const moduleId = path.relative(root, file).split(path.sep).join("/");
    const module = parseTypeScriptModule(api, moduleId, text);
    for (const record of module.metadata) {
      const metadataIssues = validateTsgoUnitMetadata(record.metadata);
      if (metadataIssues.length > 0) {
        throw new Error(`invalid @tsgo-unit metadata in ${relativeFile}: ${metadataIssues.join("; ")}`);
      }
      assertEmbeddedGoSourceLabel(record.documentText, relativeFile, record.metadata.id);
      if (unitsById.has(record.metadata.id)) {
        throw new Error(`duplicate @tsgo-unit '${record.metadata.id}' in ${unitsById.get(record.metadata.id).path} and ${relativeFile}`);
      }
      const unit = {
        id: record.metadata.id,
        kind: record.metadata.kind,
        status: record.metadata.status,
        sigHash: record.metadata.sigHash,
        bodyHash: record.metadata.bodyHash,
        path: relativeFile,
        metadata: record.metadata,
        embeddedGoSource: extractEmbeddedGoSource(record.documentText),
      };
      if (record.override !== undefined) unit.override = record.override;
      Object.defineProperty(unit, "declarationMetadata", { value: record, enumerable: false });
      units.push(unit);
      unitsById.set(unit.id, unit);
    }
    fileReports.push({ path: relativeFile, metadataCount: module.metadata.length });
  }
  return { fileCount: files.length, files: fileReports, units };
}

function assertEmbeddedGoSourceLabel(documentText, relativeFile, id) {
  const malformedLine = documentText.split(/\r?\n/).findIndex((line) => /^\s*\*\s+Go source:\s*\S/.test(line));
  if (malformedLine >= 0) {
    throw new Error(`inline Go source annotations are forbidden in ${relativeFile} for ${id}; use 'Port note:' for prose and reserve 'Go source:' for the exact embedded upstream source block`);
  }
}

export function validateTsgoUnitMetadata(metadata) {
  const issues = [];
  if (metadata === null || typeof metadata !== "object" || Array.isArray(metadata)) return ["metadata must be an object"];
  const expectedKeys = ["bodyHash", "id", "kind", "sigHash", "status"];
  const actualKeys = Object.keys(metadata).sort(compareText);
  if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) {
    issues.push(`metadata keys must be exactly ${expectedKeys.join(", ")}`);
  }
  if (typeof metadata.id !== "string" || metadata.id.trim() === "" || /\s/.test(metadata.id)) {
    issues.push("id must be a non-empty whitespace-free string");
  }
  const kinds = new Set(["constGroup", "func", "method", "type", "varGroup"]);
  if (!kinds.has(metadata.kind)) issues.push("kind must be a primary porter unit kind");
  if (typeof metadata.id === "string" && typeof metadata.kind === "string" && !metadata.id.includes(`::${metadata.kind}::`)) {
    issues.push("id kind segment does not match metadata kind");
  }
  if (metadata.status !== "implemented" && metadata.status !== "stub") issues.push("status must be 'implemented' or 'stub'");
  if (typeof metadata.sigHash !== "string" || !/^[0-9a-f]{64}$/.test(metadata.sigHash)) {
    issues.push("sigHash must be a lowercase SHA-256 digest");
  }
  if (typeof metadata.bodyHash !== "string" || !/^[0-9a-f]{64}$/.test(metadata.bodyHash)) {
    issues.push("bodyHash must be a lowercase SHA-256 digest");
  }
  return issues;
}

export function renderGoSourceComment(snippet) {
  return String(snippet ?? "")
    .split("\n")
    .map((line) => line === "" ? " *" : ` * ${line.replaceAll("*/", "* /")}`)
    .join("\n");
}

export function extractEmbeddedGoSource(documentText) {
  const lines = documentText.split(/\r?\n/);
  const markerIndex = lines.findIndex((line) => /^\s*\*\s+Go source:\s*$/.test(line));
  if (markerIndex < 0) return undefined;
  const sourceLines = [];
  for (let index = markerIndex + 1; index < lines.length; index++) {
    const line = lines[index];
    if (/^\s*\*\s+@tsgo-/.test(line) || /^\s*\*\//.test(line)) break;
    sourceLines.push(line);
  }
  while (sourceLines.length > 0 && /^\s*(?:\*)?\s*$/.test(sourceLines.at(-1))) sourceLines.pop();
  return sourceLines.join("\n");
}

export function normalizeEmbeddedGoSource(source) {
  if (source === undefined) return undefined;
  return source.split("\n").map((line) => line.trimEnd()).join("\n");
}

export async function buildEmbeddedGoSourceUpdates(snapshot, root, options = {}) {
  const goById = new Map(snapshot.files.flatMap((file) => (file.units ?? []).map((unit) => [unit.id, unit])));
  const tsUnits = await scanTsUnits(root, options);
  const replacementsByPath = new Map();
  for (const tsUnit of tsUnits.units) {
    const goUnit = goById.get(tsUnit.id);
    if (goUnit === undefined) continue;
    const expected = renderGoSourceComment(goUnit.snippet);
    if (normalizeEmbeddedGoSource(tsUnit.embeddedGoSource) === normalizeEmbeddedGoSource(expected)) continue;
    const replacements = replacementsByPath.get(tsUnit.path) ?? [];
    replacements.push({ record: tsUnit.declarationMetadata, expected });
    replacementsByPath.set(tsUnit.path, replacements);
  }

  const updates = [];
  let unitCount = 0;
  for (const [relativePath, replacements] of replacementsByPath) {
    const filePath = resolveRepo(relativePath);
    let next = readFileSync(filePath, "utf8");
    for (const replacement of replacements.sort((left, right) => right.record.documentStart - left.record.documentStart)) {
      const currentDocument = utf8Slice(next, replacement.record.documentStart, replacement.record.documentEnd);
      const updatedDocument = synchronizeEmbeddedGoSourceDoc(currentDocument, replacement.expected);
      next = replaceUtf8Range(next, replacement.record.documentStart, replacement.record.documentEnd, updatedDocument);
    }
    updates.push({ path: filePath, text: next, unitCount: replacements.length });
    unitCount += replacements.length;
  }
  return { updates, unitCount };
}

export function synchronizeEmbeddedGoSourceDoc(documentText, expected) {
  const closeIndex = documentText.lastIndexOf("*/");
  if (closeIndex < 0) throw new Error("attached JSDoc is missing its closing delimiter");
  const body = documentText.slice(0, closeIndex);
  const closing = documentText.slice(closeIndex);
  const marker = /^\s*\*\s+Go source:\s*$/m.exec(body);
  if (marker === null) return `${body.trimEnd()}\n *\n * Go source:\n${expected}\n ${closing}`;
  const markerLineStart = body.lastIndexOf("\n", marker.index) + 1;
  const afterMarker = marker.index + marker[0].length;
  const nextTag = /\n\s*\*\s+@tsgo-/.exec(body.slice(afterMarker));
  const sourceEnd = nextTag === null ? body.trimEnd().length : afterMarker + nextTag.index + 1;
  const sourceBlock = nextTag === null ? ` * Go source:\n${expected}\n ` : ` * Go source:\n${expected}\n *\n`;
  return body.slice(0, markerLineStart) + sourceBlock + body.slice(sourceEnd) + closing;
}

function utf8Slice(text, start, end) {
  return Buffer.from(text, "utf8").subarray(start, end).toString("utf8");
}

function replaceUtf8Range(text, start, end, replacement) {
  const source = Buffer.from(text, "utf8");
  return Buffer.concat([
    source.subarray(0, start),
    Buffer.from(replacement, "utf8"),
    source.subarray(end),
  ]).toString("utf8");
}
