import { createHash } from "node:crypto";

export const DELTA_EVIDENCE_ARTIFACTS = Object.freeze(["delta.json", "from-snapshot.json", "summary.md", "to-snapshot.json"]);

export function canonicalSnapshot(snapshot) {
  return JSON.stringify(portableSnapshot(snapshot));
}

export function portableSnapshot(snapshot, label = "source") {
  const portable = structuredClone(snapshot);
  portable.sourceRoot = `<${label}-root>`;
  return portable;
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
  const identity = {
    schemaVersion: 2,
    fromRevision: report.from.gitRevision,
    toRevision: report.to.gitRevision,
    files,
  };
  return { ...identity, evidenceHash: sha256(JSON.stringify(identity)) };
}

export function verifyDeltaCompletion(artifacts, completion) {
  const issues = [];
  const exactKeys = (value, expected, label) => {
    const actual = value && typeof value === "object" && !Array.isArray(value) ? Object.keys(value).sort() : [];
    const wanted = [...expected].sort();
    if (JSON.stringify(actual) !== JSON.stringify(wanted)) issues.push(`${label} keys must be exactly ${wanted.join(", ")}`);
  };
  exactKeys(completion, ["evidenceHash", "files", "fromRevision", "schemaVersion", "toRevision"], "COMPLETE.json");
  if (completion?.schemaVersion !== 2) issues.push("COMPLETE.json schemaVersion must be 2");
  exactKeys(completion?.files, DELTA_EVIDENCE_ARTIFACTS, "COMPLETE.json files");
  for (const name of DELTA_EVIDENCE_ARTIFACTS) {
    const record = completion?.files?.[name];
    exactKeys(record, ["bytes", "sha256"], `COMPLETE.json files.${name}`);
    const contents = artifacts.get(name);
    if (typeof contents !== "string") {
      issues.push(`missing evidence artifact ${name}`);
      continue;
    }
    if (record?.bytes !== Buffer.byteLength(contents)) issues.push(`${name} byte length does not match COMPLETE.json`);
    if (record?.sha256 !== sha256(contents)) issues.push(`${name} SHA-256 does not match COMPLETE.json`);
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

export function buildPorterDelta(fromSnapshot, toSnapshot, options) {
  const raw = compareRecordMaps(unitRecords(fromSnapshot), unitRecords(toSnapshot));
  const active = compareRecordMaps(
    activeUnitRecords(fromSnapshot, options),
    activeUnitRecords(toSnapshot, options),
  );
  const files = compareRecordMaps(fileRecords(fromSnapshot), fileRecords(toSnapshot));
  const trackedFiles = compareRecordMaps(
    trackedTreeRecords(options.fromTreeEntries ?? []),
    trackedTreeRecords(options.toTreeEntries ?? []),
  );
  return {
    schemaVersion: 1,
    from: snapshotIdentity(fromSnapshot),
    to: snapshotIdentity(toSnapshot),
    environmentMatches: JSON.stringify(fromSnapshot.environment) === JSON.stringify(toSnapshot.environment),
    trackedFiles: summarizeComparison(trackedFiles),
    goFiles: summarizeComparison(files),
    rawUnits: summarizeComparison(raw),
    activeUnits: summarizeComparison(active),
  };
}

export function renderDeltaMarkdown(report) {
  const lines = [
    "# TS-Go Porter Delta",
    "",
    `- From: \`${report.from.gitRevision}\``,
    `- To: \`${report.to.gitRevision}\``,
    `- Extractor environment equal: ${report.environmentMatches}`,
    `- Complete tracked source tree: ${summaryLine(report.trackedFiles)}`,
    `- Go files: ${summaryLine(report.goFiles)}`,
    `- Raw units: ${summaryLine(report.rawUnits)}`,
    `- Active porter units: ${summaryLine(report.activeUnits)}`,
    "",
    "## Active Changed Modules",
    "",
    ...moduleLines(report.activeUnits.changedByModule),
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

function fileRecords(snapshot) {
  return new Map((snapshot.files ?? []).map((file) => [file.path, {
    id: file.path,
    path: file.path,
    importPath: file.importPath,
    sourceHash: file.sourceHash,
    generated: file.generated,
    buildTags: file.buildTags ?? [],
    implicitBuildTags: file.implicitBuildTags ?? [],
    parseError: file.parseError ?? "",
    comparisonHash: hashObject({
      sourceHash: file.sourceHash,
      gitBlobHash: file.gitBlobHash,
      generated: file.generated,
      buildTags: file.buildTags ?? [],
      implicitBuildTags: file.implicitBuildTags ?? [],
      parseError: file.parseError ?? "",
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

function unitRecords(snapshot) {
  const records = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      records.set(unit.id, unitRecord(file, unit));
    }
  }
  return records;
}

function activeUnitRecords(snapshot, options) {
  const primaryKinds = new Set(options.primaryUnitKinds);
  const records = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (!primaryKinds.has(unit.kind)) continue;
      const policy = options.policyForUnit(unit, file);
      if (!options.isActivePortPolicy(policy)) continue;
      records.set(unit.id, { ...unitRecord(file, unit), policy });
    }
  }
  return records;
}

function unitRecord(file, unit) {
  const constantValues = (unit.valueSpecs ?? []).flatMap((spec) => spec.constantValues ?? []);
  return {
    id: unit.id,
    path: file.path,
    importPath: file.importPath,
    kind: unit.kind,
    name: unit.qualifiedName ?? unit.name,
    sigHash: unit.sigHash,
    bodyHash: unit.bodyHash,
    constantValues,
    comparisonHash: hashObject({
      sigHash: unit.sigHash,
      bodyHash: unit.bodyHash,
      constantValues,
    }),
  };
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
        signatureChanged: previous.sigHash !== next.sigHash,
        bodyChanged: previous.bodyHash !== next.bodyHash,
        constantsChanged: JSON.stringify(previous.constantValues) !== JSON.stringify(next.constantValues),
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
      signaturePreserved: previous.sigHash === next.sigHash,
      bodyPreserved: previous.bodyHash === next.bodyHash,
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
    bodyChangedCount: comparison.changed.filter((record) => record.bodyChanged).length,
    constantsChangedCount: comparison.changed.filter((record) => record.constantsChanged).length,
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
  return [...counts.entries()].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
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
  return String(left.id).localeCompare(String(right.id));
}

function hashObject(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function summaryLine(summary) {
  return `${summary.fromCount} → ${summary.toCount}; ${summary.addedCount} added, ${summary.removedCount} removed, ${summary.changedCount} changed, ${summary.moveCandidateCount} move candidates`;
}

function moduleLines(entries) {
  if (entries.length === 0) return ["- None"];
  return entries.slice(0, 30).map(([module, count]) => `- ${module}: ${count}`);
}
