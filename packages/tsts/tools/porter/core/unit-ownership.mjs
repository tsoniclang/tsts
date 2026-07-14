import { buildEffectivePolicyResolver } from "./effective-policies.mjs";
import { expectedTsPath, isActivePortPolicy } from "./policies.mjs";
import { compareText } from "./deterministic-order.mjs";
import { increment, moduleNameFor } from "./runtime.mjs";
import { isSemanticPrimaryUnitKind } from "./unit-kinds.mjs";
import { validateTsgoUnitMetadata } from "./ts-units.mjs";

const inputKeys = Object.freeze(["config", "largeFileSplits", "snapshot", "tsUnits"]);
const finalizedOwnershipInputs = new WeakMap();

export function buildPorterUnitOwnership(input) {
  requireExactInput(input, inputKeys, "Porter unit ownership input");
  const { config, largeFileSplits, snapshot, tsUnits } = input;
  const effectivePolicies = buildEffectivePolicyResolver(config, snapshot);
  const goUnits = [];
  const goByID = new Map();
  const duplicateGoIDs = [];
  for (const file of snapshot.files) {
    const filePolicy = effectivePolicies.file(file);
    for (const unit of file.units ?? []) {
      const policy = effectivePolicies.unit(unit, file);
      const record = Object.freeze({
        ...unit,
        file: Object.freeze({
          path: file.path,
          importPath: file.importPath,
          packageName: file.packageName,
          lineCount: file.lineCount,
          generated: file.generated,
          policy: filePolicy,
        }),
        portable: isSemanticPrimaryUnitKind(unit.kind),
        policy,
        expectedTsPath: expectedTsPath(config, unit, largeFileSplits),
      });
      if (goByID.has(record.id)) duplicateGoIDs.push(record.id);
      goByID.set(record.id, record);
      goUnits.push(record);
    }
  }

  const tsByID = new Map();
  const duplicateTsIDs = [];
  const invalidTsMetadata = [];
  for (const unit of tsUnits.units) {
    if (tsByID.has(unit.id)) duplicateTsIDs.push(unit.id);
    tsByID.set(unit.id, unit);
    if (unit.metadata !== undefined) {
      for (const reason of validateTsgoUnitMetadata(unit.metadata)) {
        invalidTsMetadata.push({ id: unit.id ?? "", path: unit.path ?? "", reason });
      }
    }
  }

  const rows = [];
  const categoryCounts = new Map();
  const moduleCounts = new Map();
  const missing = [];
  const stale = [];
  const implemented = [];
  const implementedUnits = [];
  const stubbed = [];
  const excluded = [];
  const splitPathMismatches = [];
  for (const unit of goUnits) {
    if (!unit.portable) continue;
    const tsUnit = tsByID.get(unit.id);
    const category = unit.policy.category;
    increment(categoryCounts, category);
    increment(moduleCounts, moduleNameFor(unit.file.path));
    const row = {
      id: unit.id,
      kind: unit.kind,
      goPath: unit.file.path,
      name: unit.qualifiedName,
      category,
      expectedTsPath: unit.expectedTsPath,
      status: "missing",
      reason: unit.policy.reason,
      sigHash: unit.sigHash,
      tsPath: "",
      tsStatus: "",
    };
    if (!isActivePortPolicy(unit.policy)) {
      row.status = "excluded";
      excluded.push(row);
      rows.push(row);
      continue;
    }
    if (tsUnit === undefined) {
      missing.push(row);
      rows.push(row);
      continue;
    }
    row.tsPath = tsUnit.path;
    row.tsStatus = tsUnit.status;
    row.kind = tsUnit.kind;
    const plannedSplitPath = largeFileSplits.assignments?.[unit.id];
    if (plannedSplitPath !== undefined && tsUnit.path !== plannedSplitPath) {
      splitPathMismatches.push({ id: unit.id, actualPath: tsUnit.path, expectedPath: plannedSplitPath });
    }
    if (tsUnit.sigHash !== unit.sigHash) {
      row.status = "stale";
      row.reason = "signature metadata hash drift";
      stale.push(row);
    } else if (tsUnit.status === "implemented") {
      row.status = "implemented";
      implemented.push(row);
      implementedUnits.push(Object.freeze({ goUnit: unit, row: Object.freeze({ ...row }), tsUnit }));
    } else if (tsUnit.status === "stub") {
      row.status = "stub";
      stubbed.push(row);
    } else {
      row.status = "invalid";
    }
    rows.push(row);
  }
  const orphanTsUnits = tsUnits.units
    .filter((unit) => !goByID.has(unit.id))
    .map((unit) => ({ id: unit.id, path: unit.path, status: unit.status }));

  const result = Object.freeze({
    categoryCounts,
    duplicateGoIDs: Object.freeze([...duplicateGoIDs].sort(compareText)),
    duplicateTsIDs: Object.freeze([...duplicateTsIDs].sort(compareText)),
    excluded: Object.freeze(excluded),
    goByID,
    goUnits: Object.freeze(goUnits),
    implemented: Object.freeze(implemented),
    implementedUnits: Object.freeze(implementedUnits),
    invalidTsMetadata: Object.freeze(invalidTsMetadata),
    missing: Object.freeze(missing),
    moduleCounts,
    orphanTsUnits: Object.freeze(orphanTsUnits),
    rows: Object.freeze(rows),
    splitPathMismatches: Object.freeze(splitPathMismatches),
    stale: Object.freeze(stale),
    stubbed: Object.freeze(stubbed),
    tsByID,
  });
  finalizedOwnershipInputs.set(result, { config, largeFileSplits, snapshot, tsUnits });
  return result;
}

export function requirePorterUnitOwnership(value, input) {
  requireExactInput(input, inputKeys, "Porter unit ownership requirement");
  const evidence = finalizedOwnershipInputs.get(value);
  if (evidence === undefined) throw new Error("operation planning requires one finalized Porter unit ownership result");
  for (const key of inputKeys) {
    if (evidence[key] !== input[key]) throw new Error(`Porter unit ownership was built from a different ${key} object`);
  }
  return value;
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
