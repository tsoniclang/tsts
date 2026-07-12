import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { compareText } from "./deterministic-order.mjs";
import { isSemanticPrimaryUnitKind } from "./unit-kinds.mjs";
import { parseTypeScriptModule } from "../ts-extractor/module-index.mjs";
import { loadParser } from "../ts-extractor/parser-runtime.mjs";
import { loadProfile } from "../ts-extractor/profile.mjs";
import { repoRoot, walk } from "./runtime.mjs";

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
      if (unitsById.has(record.metadata.id)) {
        throw new Error(`duplicate @tsgo-unit '${record.metadata.id}' in ${unitsById.get(record.metadata.id).path} and ${relativeFile}`);
      }
      const unit = {
        id: record.metadata.id,
        kind: record.metadata.kind,
        status: record.metadata.status,
        sigHash: record.metadata.sigHash,
        path: relativeFile,
        metadata: record.metadata,
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

export function validateTsgoUnitMetadata(metadata) {
  const issues = [];
  if (metadata === null || typeof metadata !== "object" || Array.isArray(metadata)) return ["metadata must be an object"];
  const expectedKeys = ["id", "kind", "sigHash", "status"];
  const actualKeys = Object.keys(metadata).sort(compareText);
  if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) {
    issues.push(`metadata keys must be exactly ${expectedKeys.join(", ")}`);
  }
  if (typeof metadata.id !== "string" || metadata.id.trim() === "" || /\s/.test(metadata.id)) {
    issues.push("id must be a non-empty whitespace-free string");
  }
  if (!isSemanticPrimaryUnitKind(metadata.kind)) issues.push("kind must be a primary porter unit kind");
  if (typeof metadata.id === "string" && typeof metadata.kind === "string" && !metadata.id.includes(`::${metadata.kind}::`)) {
    issues.push("id kind segment does not match metadata kind");
  }
  if (metadata.status !== "implemented" && metadata.status !== "stub") issues.push("status must be 'implemented' or 'stub'");
  if (typeof metadata.sigHash !== "string" || !/^[0-9a-f]{64}$/.test(metadata.sigHash)) {
    issues.push("sigHash must be a lowercase SHA-256 digest");
  }
  return issues;
}
