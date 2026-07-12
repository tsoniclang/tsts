import { createHash } from "node:crypto";

import { compareText } from "./core/deterministic-order.mjs";
import { requireGitTreeEntries } from "./core/git-commit-tree-evidence.mjs";
import { buildSemanticUnitEligibility } from "./core/semantic-unit-eligibility.mjs";
import { isSemanticPrimaryUnitKind } from "./core/unit-kinds.mjs";
import { semanticProfileKey } from "./core/snapshot-validation.mjs";

export const DELTA_EVIDENCE_ARTIFACTS = Object.freeze(["delta.json", "from-snapshot.json", "from-tree.json", "porter-tree.json", "summary.md", "to-snapshot.json", "to-tree.json"]);

export function canonicalSnapshot(snapshot) {
  return JSON.stringify(portableSnapshot(snapshot));
}

export function portableSnapshot(snapshot, label = "source") {
  const portable = structuredClone(snapshot);
  portable.sourceRoot = `<${label}-root>`;
  if (snapshot.semantic) normalizePortableSemantic(portable.semantic, snapshot.semantic.goroot);
  return portable;
}

function portableSemantic(semantic) {
  const portable = structuredClone(semantic);
  normalizePortableSemantic(portable, semantic.goroot);
  return portable;
}

function normalizePortableSemantic(portable, goroot) {
  portable.goroot = "<go-root>";
  portable.toolchainExecutable = "<go-root>/bin/go";
  for (const profile of portable.profiles ?? []) {
    profile.environment = (profile.environment ?? []).map((entry) => portableEnvironmentEntry(entry, goroot));
  }
}

function portableEnvironmentEntry(entry, goroot) {
  const separator = entry.indexOf("=");
  if (separator < 0) return entry;
  const key = entry.slice(0, separator);
  const value = entry.slice(separator + 1);
  const replacements = new Map([
    ["GOCACHE", "<go-cache>"],
    ["GOMODCACHE", "<go-mod-cache>"],
    ["GOPATH", "<go-path>"],
    ["GOROOT", "<go-root>"],
  ]);
  if (replacements.has(key)) return `${key}=${replacements.get(key)}`;
  if (key === "PATH" && typeof goroot === "string" && value === `${goroot}/bin`) return "PATH=<go-root>/bin";
  return entry;
}

export function snapshotDigest(snapshot) {
  return createHash("sha256").update(canonicalSnapshot(snapshot)).digest("hex");
}

export function buildDeltaCompletion(artifacts, report) {
  const files = {};
  for (const name of DELTA_EVIDENCE_ARTIFACTS) {
    const contents = artifacts.get(name);
    if (typeof contents !== "string") throw new Error(`delta evidence is missing ${name}`);
    files[name] = { bytes: Buffer.byteLength(contents), sha256: sha256(contents) };
  }
  return buildDeltaCompletionFromRecords(files, report);
}

export function buildDeltaCompletionFromRecords(files, report) {
  requireCompletionFileRecords(files);
  const identity = {
    schemaVersion: 7,
    fromRevision: report.from.gitRevision,
    toRevision: report.to.gitRevision,
    files,
  };
  return { ...identity, evidenceHash: sha256(JSON.stringify(identity)) };
}

export function verifyDeltaCompletion(artifacts, completion) {
  const files = {};
  for (const name of DELTA_EVIDENCE_ARTIFACTS) {
    const contents = artifacts.get(name);
    if (typeof contents === "string") files[name] = { bytes: Buffer.byteLength(contents), sha256: sha256(contents) };
  }
  return verifyDeltaCompletionFromRecords(files, completion);
}

export function verifyDeltaCompletionFromRecords(files, completion) {
  const issues = [];
  const exactKeys = (value, expected, label) => {
    const actual = value && typeof value === "object" && !Array.isArray(value) ? Object.keys(value).sort() : [];
    const wanted = [...expected].sort();
    if (JSON.stringify(actual) !== JSON.stringify(wanted)) issues.push(`${label} keys must be exactly ${wanted.join(", ")}`);
  };
  exactKeys(completion, ["evidenceHash", "files", "fromRevision", "schemaVersion", "toRevision"], "COMPLETE.json");
  if (completion?.schemaVersion !== 7) issues.push("COMPLETE.json schemaVersion must be 7");
  exactKeys(completion?.files, DELTA_EVIDENCE_ARTIFACTS, "COMPLETE.json files");
  for (const name of DELTA_EVIDENCE_ARTIFACTS) {
    const record = completion?.files?.[name];
    exactKeys(record, ["bytes", "sha256"], `COMPLETE.json files.${name}`);
    const actual = files[name];
    if (actual === undefined) {
      issues.push(`missing evidence artifact ${name}`);
      continue;
    }
    if (record?.bytes !== actual.bytes) issues.push(`${name} byte length does not match COMPLETE.json`);
    if (record?.sha256 !== actual.sha256) issues.push(`${name} SHA-256 does not match COMPLETE.json`);
  }
  if (completion?.files && typeof completion.files === "object") {
    const identity = {
      schemaVersion: completion.schemaVersion,
      fromRevision: completion.fromRevision,
      toRevision: completion.toRevision,
      files: completion.files,
    };
    if (completion.evidenceHash !== sha256(JSON.stringify(identity))) issues.push("COMPLETE.json evidenceHash is invalid");
  }
  return issues;
}

function requireCompletionFileRecords(files) {
  if (files === null || typeof files !== "object" || Array.isArray(files) || ![Object.prototype, null].includes(Object.getPrototypeOf(files))) {
    throw new Error("delta completion file records must be one plain object");
  }
  const actual = Object.keys(files).sort();
  const expected = [...DELTA_EVIDENCE_ARTIFACTS].sort();
  if (actual.length !== expected.length || actual.some((name, index) => name !== expected[index])) {
    throw new Error(`delta completion file record keys must be exactly ${expected.join(", ")}`);
  }
  for (const name of expected) {
    const record = files[name];
    if (record === null || typeof record !== "object" || Array.isArray(record) || Object.keys(record).sort().join(",") !== "bytes,sha256" ||
        !Number.isSafeInteger(record.bytes) || record.bytes < 0 || typeof record.sha256 !== "string" || !/^[0-9a-f]{64}$/.test(record.sha256)) {
      throw new Error(`delta completion file record ${name} is invalid`);
    }
  }
}

export function buildPorterDelta(fromSnapshot, toSnapshot, options) {
  requireDeltaOptions(options);
  const fromTreeEntries = requireGitTreeEntries(options.fromTreeEntries, "Porter delta from tree entries");
  const toTreeEntries = requireGitTreeEntries(options.toTreeEntries, "Porter delta to tree entries");
  const raw = compareRecordMaps(unitRecords(fromSnapshot), unitRecords(toSnapshot));
  const active = compareRecordMaps(
    activeUnitRecords(fromSnapshot, options),
    activeUnitRecords(toSnapshot, options),
  );
  const policies = compareRecordMaps(policyRecords(fromSnapshot, options), policyRecords(toSnapshot, options));
  const files = compareRecordMaps(fileRecords(fromSnapshot), fileRecords(toSnapshot));
  const trackedFiles = compareRecordMaps(
    trackedTreeRecords(fromTreeEntries),
    trackedTreeRecords(toTreeEntries),
  );
  const fromEnvironment = extractionEnvironmentIdentity(fromSnapshot);
  const toEnvironment = extractionEnvironmentIdentity(toSnapshot);
  const semanticState = compareRecordMaps(semanticStateRecords(fromSnapshot), semanticStateRecords(toSnapshot));
  return {
    schemaVersion: 7,
    from: snapshotIdentity(fromSnapshot),
    to: snapshotIdentity(toSnapshot),
    extractionEnvironment: {
      from: fromEnvironment,
      to: toEnvironment,
      matches: JSON.stringify(fromEnvironment) === JSON.stringify(toEnvironment),
    },
    trackedFiles: summarizeComparison(trackedFiles),
    goFiles: summarizeComparison(files),
    semanticState: summarizeComparison(semanticState),
    policyState: summarizeComparison(policies),
    rawUnits: summarizeComparison(raw),
    activeUnits: summarizeComparison(active),
  };
}

export function renderDeltaMarkdown(report) {
  const lines = [
    "# TS-Go Porter Delta",
    "",
    `- Porter implementation: \`${report.porterImplementation.revision}\``,
    `- From: \`${report.from.gitRevision}\``,
    `- To: \`${report.to.gitRevision}\``,
    `- Extractor environment equal: ${report.extractionEnvironment.matches}`,
    `- Complete tracked source tree: ${summaryLine(report.trackedFiles)}`,
    `- Go files: ${summaryLine(report.goFiles)}`,
    `- Complete semantic state: ${summaryLine(report.semanticState)}`,
    `- Effective unit policies: ${summaryLine(report.policyState)}`,
    `- Generated-source files: ${inventorySummaryLine(report.generatedSourcePolicies.delta.files)}`,
    `- Generated-source policy status changed: ${report.generatedSourcePolicies.delta.policyStatusChanged}`,
    `- Raw units: ${summaryLine(report.rawUnits)}`,
    `- Active porter units: ${summaryLine(report.activeUnits)}`,
    `- Active declaration changes: ${declarationChangeLine(report.activeUnits)}`,
    "",
    "## Active Changed Modules",
    "",
    ...moduleLines(report.activeUnits.changedByModule),
    "",
    "## Semantic State Changes",
    "",
    ...identityLines(report.semanticState),
    "",
    "## Effective Policy Changes",
    "",
    ...identityLines(report.policyState),
    "",
    "## Generated-Source Changes",
    "",
    ...identityLines(report.generatedSourcePolicies.delta.files),
    "",
    "## Active Added Modules",
    "",
    ...moduleLines(report.activeUnits.addedByModule),
    "",
    "## Active Removed Modules",
    "",
    ...moduleLines(report.activeUnits.removedByModule),
    "",
    "## File Changes",
    "",
    ...moduleLines(report.trackedFiles.changedByModule),
    "",
  ];
  return `${lines.join("\n")}\n`;
}

function snapshotIdentity(snapshot) {
  return {
    gitRevision: snapshot.gitRevision,
    digest: snapshotDigest(snapshot),
    environment: snapshot.environment,
    summary: snapshot.summary,
  };
}

function extractionEnvironmentIdentity(snapshot) {
  const semantic = portableSemantic(snapshot.semantic);
  return {
    environment: structuredClone(snapshot.environment),
    modulePath: snapshot.modulePath,
    compiler: semantic.compiler,
    toolchain: semantic.toolchain,
    toolchainHash: semantic.toolchainHash,
    gorootHash: semantic.gorootHash,
    gorootHashContract: semantic.gorootHashContract,
    releaseTags: semantic.releaseTags,
    profiles: semantic.profiles.map(({ coveredFiles: _coveredFiles, packageIds: _packageIds, ...profile }) => profile),
  };
}

function fileRecords(snapshot) {
  return new Map((snapshot.files ?? []).map((file) => [file.path, {
    id: file.path,
    path: file.path,
    importPath: file.importPath,
    sourceHash: file.sourceHash,
    generated: file.generated,
    buildTags: file.buildTags ?? [],
    implicitBuildTags: file.implicitBuildTags ?? [],
    comparisonHash: hashObject({
      sourceHash: file.sourceHash,
      gitBlobHash: file.gitBlobHash,
      generated: file.generated,
      buildTags: file.buildTags ?? [],
      implicitBuildTags: file.implicitBuildTags ?? [],
    }),
  }]));
}

function trackedTreeRecords(entries) {
  return new Map(entries.map((entry) => [entry.path, {
    id: entry.path,
    path: entry.path,
    mode: entry.mode,
    type: entry.type,
    objectHash: entry.hash,
    comparisonHash: hashObject({ mode: entry.mode, type: entry.type, objectHash: entry.hash }),
  }]));
}

function semanticStateRecords(snapshot) {
  const semantic = portableSemantic(snapshot.semantic);
  return new Map(Object.keys(semantic).sort(compareText).map((key) => {
    const value = semantic[key];
    return [key, {
      id: key,
      path: `semantic/${key}`,
      value,
      comparisonHash: hashObject(value),
    }];
  }));
}

function unitRecords(snapshot) {
  const records = new Map();
  const profileKeys = snapshotProfileKeys(snapshot);
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      records.set(unit.id, unitRecord(file, unit, profileKeys));
    }
  }
  return records;
}

function activeUnitRecords(snapshot, options) {
  const eligibility = buildSemanticUnitEligibility(snapshot);
  const records = new Map();
  const profileKeys = snapshotProfileKeys(snapshot);
  for (const file of snapshot.files ?? []) {
    if (!eligibility.includes(file)) continue;
    for (const unit of file.units ?? []) {
      if (!isSemanticPrimaryUnitKind(unit.kind)) continue;
      const policy = options.policyForUnit(snapshot, unit, file);
      if (!options.isActivePortPolicy(policy)) continue;
      const declaration = unitRecord(file, unit, profileKeys);
      records.set(unit.id, {
        ...declaration,
        policy,
        policyHash: hashObject(policy),
        comparisonHash: hashObject({ declaration: declaration.comparisonHash, policy }),
      });
    }
  }
  return records;
}

function policyRecords(snapshot, options) {
  const records = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (!isSemanticPrimaryUnitKind(unit.kind)) continue;
      const policy = options.policyForUnit(snapshot, unit, file);
      const active = options.isActivePortPolicy(policy);
      records.set(unit.id, {
        id: unit.id,
        path: file.path,
        importPath: file.importPath,
        kind: unit.kind,
        name: unit.qualifiedName ?? unit.name,
        policy,
        active,
        policyHash: hashObject(policy),
        comparisonHash: hashObject({ policy, active }),
      });
    }
  }
  return records;
}

function unitRecord(file, unit, profileKeys) {
  const semanticDeclaration = expandSemanticProfiles(unit.semantic ?? [], profileKeys, unit.id);
  const semanticHash = hashObject(semanticDeclaration);
  const constantValues = semanticConstantValues(semanticDeclaration);
  return {
    id: unit.id,
    path: file.path,
    importPath: file.importPath,
    kind: unit.kind,
    name: unit.qualifiedName ?? unit.name,
    sigHash: unit.sigHash,
    semanticHash,
    semanticDeclaration,
    constantValues,
    comparisonHash: hashObject({
      sigHash: unit.sigHash,
      semanticHash,
    }),
  };
}

function semanticConstantValues(variants) {
  const values = [];
  for (const variant of variants) {
    for (const specification of variant.valueSpecs ?? []) {
      for (const binding of specification.names ?? []) {
        if (binding.constant === undefined) continue;
        values.push({
          profiles: variant.profiles ?? [],
          specIndex: specification.specIndex,
          nameIndex: binding.nameIndex,
          name: binding.name,
          constant: binding.constant,
        });
      }
    }
  }
  return values;
}

function snapshotProfileKeys(snapshot) {
  return (snapshot.semantic?.profiles ?? []).map((profile) => semanticProfileKey(profile));
}

function expandSemanticProfiles(variants, profileKeys, unitId) {
  return variants.map((variant) => ({
    ...variant,
    profiles: (variant.profiles ?? []).map((profileIndex) => {
      if (!Number.isSafeInteger(profileIndex) || profileIndex < 0 || profileIndex >= profileKeys.length) {
        throw new Error(`Go unit '${unitId}' references invalid semantic profile index '${profileIndex}'`);
      }
      return profileKeys[profileIndex];
    }),
  }));
}

function compareRecordMaps(fromRecords, toRecords) {
  const added = [];
  const removed = [];
  const changed = [];
  const unchanged = [];
  for (const [id, next] of toRecords) {
    const previous = fromRecords.get(id);
    if (previous === undefined) {
      added.push(next);
    } else if (previous.comparisonHash === next.comparisonHash) {
      unchanged.push(next);
    } else {
      changed.push({
        ...next,
        sourceSignatureChanged: previous.sigHash !== next.sigHash,
        semanticDeclarationChanged: previous.semanticHash !== next.semanticHash,
        signatureChanged: previous.sigHash !== next.sigHash || previous.semanticHash !== next.semanticHash,
        constantsChanged: JSON.stringify(previous.constantValues) !== JSON.stringify(next.constantValues),
        policyChanged: previous.policyHash !== next.policyHash,
        previous,
      });
    }
  }
  for (const [id, previous] of fromRecords) {
    if (!toRecords.has(id)) removed.push(previous);
  }
  const moves = moveCandidates(removed, added);
  for (const values of [added, removed, changed, unchanged, moves]) values.sort(compareRecord);
  return { added, removed, changed, unchanged, moves };
}

function moveCandidates(removed, added) {
  const addedByLogicalIdentity = groupBy(added, logicalIdentity);
  const moves = [];
  for (const previous of removed) {
    const candidates = addedByLogicalIdentity.get(logicalIdentity(previous)) ?? [];
    const exactCandidates = candidates.filter((next) => previous.comparisonHash === next.comparisonHash);
    if (exactCandidates.length !== 1) continue;
    const next = exactCandidates[0];
    moves.push({
      id: `${previous.id}->${next.id}`,
      path: next.path,
      from: previous.path,
      to: next.path,
      kind: next.kind,
      name: next.name,
      sourceSignaturePreserved: previous.sigHash === next.sigHash,
      semanticDeclarationPreserved: previous.semanticHash === next.semanticHash,
      signaturePreserved: previous.sigHash === next.sigHash && previous.semanticHash === next.semanticHash,
    });
  }
  return moves;
}

function logicalIdentity(record) {
  return `${record.importPath ?? ""}::${record.kind ?? "file"}::${record.name ?? record.id}`;
}

function summarizeComparison(comparison) {
  return {
    fromCount: comparison.unchanged.length + comparison.changed.length + comparison.removed.length,
    toCount: comparison.unchanged.length + comparison.changed.length + comparison.added.length,
    unchangedCount: comparison.unchanged.length,
    addedCount: comparison.added.length,
    removedCount: comparison.removed.length,
    changedCount: comparison.changed.length,
    signatureChangedCount: comparison.changed.filter((record) => record.signatureChanged).length,
    sourceSignatureChangedCount: comparison.changed.filter((record) => record.sourceSignatureChanged).length,
    semanticDeclarationChangedCount: comparison.changed.filter((record) => record.semanticDeclarationChanged).length,
    constantsChangedCount: comparison.changed.filter((record) => record.constantsChanged).length,
    policyChangedCount: comparison.changed.filter((record) => record.policyChanged).length,
    moveCandidateCount: comparison.moves.length,
    addedByModule: countByModule(comparison.added),
    removedByModule: countByModule(comparison.removed),
    changedByModule: countByModule(comparison.changed),
    added: comparison.added,
    removed: comparison.removed,
    changed: comparison.changed,
    moves: comparison.moves,
  };
}

function countByModule(records) {
  const counts = new Map();
  for (const record of records) {
    const module = moduleName(record.path);
    counts.set(module, (counts.get(module) ?? 0) + 1);
  }
  return [...counts.entries()].sort((left, right) => right[1] - left[1] || compareText(left[0], right[0]));
}

function moduleName(sourcePath) {
  const parts = String(sourcePath ?? "").split("/");
  if ((parts[0] === "internal" || parts[0] === "cmd") && parts.length > 1) return `${parts[0]}/${parts[1]}`;
  return parts[0] || ".";
}

function groupBy(values, keyFor) {
  const groups = new Map();
  for (const value of values) {
    const key = keyFor(value);
    const group = groups.get(key) ?? [];
    group.push(value);
    groups.set(key, group);
  }
  return groups;
}

function compareRecord(left, right) {
  return compareText(left.id, right.id);
}

function hashObject(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function requireDeltaOptions(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value) || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) {
    throw new Error("Porter delta options must be one exact object");
  }
  const expected = ["fromTreeEntries", "isActivePortPolicy", "policyForUnit", "toTreeEntries"];
  const actual = Reflect.ownKeys(value).map(String).sort();
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`Porter delta option keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
  if (!Array.isArray(value.fromTreeEntries) || !Array.isArray(value.toTreeEntries)) throw new Error("Porter delta requires complete from/to tree entries");
  if (typeof value.policyForUnit !== "function" || typeof value.isActivePortPolicy !== "function") {
    throw new Error("Porter delta requires exact policy callbacks");
  }
}

function summaryLine(summary) {
  return `${summary.fromCount} → ${summary.toCount}; ${summary.addedCount} added, ${summary.removedCount} removed, ${summary.changedCount} changed, ${summary.moveCandidateCount} move candidates`;
}

function declarationChangeLine(summary) {
  return `${summary.sourceSignatureChangedCount} source signatures, ${summary.semanticDeclarationChangedCount} canonical declarations, ${summary.constantsChangedCount} constant sets`;
}

function moduleLines(entries) {
  if (entries.length === 0) return ["- None"];
  return entries.slice(0, 30).map(([module, count]) => `- ${module}: ${count}`);
}

function identityLines(summary) {
  const entries = [
    ...summary.added.map((entry) => `- Added: ${entry.id}`),
    ...summary.removed.map((entry) => `- Removed: ${entry.id}`),
    ...summary.changed.map((entry) => `- Changed: ${entry.id}`),
  ];
  return entries.length === 0 ? ["- None"] : entries;
}

function inventorySummaryLine(summary) {
  return `${summary.fromCount} → ${summary.toCount}; ${summary.addedCount} added, ${summary.removedCount} removed, ${summary.changedCount} changed`;
}
