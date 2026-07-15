import { compareText } from "../deterministic-order.mjs";
import { requireGoValueOperationPlan } from "./operation-plan.mjs";
import { portableRuntimeValueOperationRules } from "./runtime-operation-rules.mjs";

const rootKeys = Object.freeze([
  "entries",
  "entryCount",
  "generatedCount",
  "goModulePath",
  "providerCount",
  "runtimeOperations",
  "schemaVersion",
  "sourceRevision",
  "state",
  "tsRoot",
]);
const entryKeys = Object.freeze([
  "disposition",
  "intrinsicCarrier",
  "objectId",
  "operationIdentity",
  "operationTypeParameterIndexes",
  "providerEvidence",
  "sourceOwnership",
  "storageAudit",
  "storageIdentity",
  "typeParameterCount",
]);
const sourceOwnershipKeys = Object.freeze(["tsPath", "unitId"]);
const storageAuditKeys = Object.freeze([
  "actualDescriptorHash",
  "exact",
  "expectedDescriptorHash",
  "valueTypeDescriptorHash",
]);
const providerEvidenceKeys = Object.freeze(["goDeclarationHash", "ownerId", "tsDeclarationHash"]);
const dispositions = new Set(["generated", "generator-owned", "intrinsic", "reviewed"]);
const intrinsicCarriers = new Set(["function", "interface", "map", "slice"]);

export function buildPortableGoValueOperationCatalog(input) {
  requireExactObject(input, ["config", "plan", "snapshot"], "portable Go value-operation catalog input");
  const { config, plan, snapshot } = input;
  requireGoValueOperationPlan(plan, config, snapshot);
  const sourceRevision = requireSha1(snapshot?.gitRevision, "portable Go value-operation catalog source revision");
  const goModulePath = requireNonEmptyString(config?.goModulePath, "portable Go value-operation catalog Go module path");
  const tsRoot = requireNonEmptyString(config?.tsRoot, "portable Go value-operation catalog TypeScript root").replace(/\/+$/, "");
  const entries = [...plan.entries()]
    .map(portablePlanEntry)
    .sort((left, right) => compareText(left.objectId, right.objectId));
  return requirePortableGoValueOperationCatalog({
    schemaVersion: 1,
    state: "complete",
    sourceRevision,
    goModulePath,
    tsRoot,
    entryCount: plan.size,
    generatedCount: plan.generatedCount,
    providerCount: plan.providerCount,
    runtimeOperations: portableRuntimeValueOperationRules(config),
    entries,
  });
}

export function renderPortableGoValueOperationCatalog(input) {
  return `${JSON.stringify(buildPortableGoValueOperationCatalog(input), null, 2)}\n`;
}

export function requirePortableGoValueOperationCatalog(value) {
  requireExactObject(value, rootKeys, "portable Go value-operation catalog");
  if (value.schemaVersion !== 1) throw new Error("portable Go value-operation catalog.schemaVersion must be 1");
  if (value.state !== "complete") throw new Error("portable Go value-operation catalog.state must be 'complete'");
  requireSha1(value.sourceRevision, "portable Go value-operation catalog.sourceRevision");
  requireNonEmptyString(value.goModulePath, "portable Go value-operation catalog.goModulePath");
  const tsRoot = requireNonEmptyString(value.tsRoot, "portable Go value-operation catalog.tsRoot");
  if (tsRoot.endsWith("/")) throw new Error("portable Go value-operation catalog.tsRoot must not end with '/'");
  requireCount(value.entryCount, "portable Go value-operation catalog.entryCount");
  requireCount(value.generatedCount, "portable Go value-operation catalog.generatedCount");
  requireCount(value.providerCount, "portable Go value-operation catalog.providerCount");
  if (value.entryCount !== value.generatedCount + value.providerCount) {
    throw new Error("portable Go value-operation catalog counts do not partition generated and provider entries");
  }
  requireExactRuntimeOperations(value.runtimeOperations, tsRoot);
  if (!Array.isArray(value.entries)) throw new Error("portable Go value-operation catalog.entries must be an array");
  if (value.entries.length !== value.entryCount) throw new Error("portable Go value-operation catalog.entryCount does not match entries.length");

  const objectIds = new Set();
  const storageOwners = new Map();
  const operationOwners = new Map();
  let generatedCount = 0;
  let previousObjectId;
  for (const [index, entry] of value.entries.entries()) {
    const label = `portable Go value-operation catalog.entries[${index}]`;
    requirePortableEntry(entry, label);
    if (previousObjectId !== undefined && compareText(previousObjectId, entry.objectId) >= 0) {
      throw new Error("portable Go value-operation catalog.entries must be strictly sorted by objectId");
    }
    previousObjectId = entry.objectId;
    if (objectIds.has(entry.objectId)) throw new Error(`${label}.objectId duplicates '${entry.objectId}'`);
    objectIds.add(entry.objectId);
    claimIdentity(storageOwners, entry.storageIdentity, entry.objectId, "storage", label);
    claimIdentity(operationOwners, entry.operationIdentity, entry.objectId, "operation", label);
    if (entry.disposition === "generated") generatedCount++;
  }
  if (generatedCount !== value.generatedCount) {
    throw new Error("portable Go value-operation catalog.generatedCount does not match generated entries");
  }
  return deepFreeze(value);
}

function portablePlanEntry(entry) {
  const provider = entry.provider ?? (entry.disposition === "reviewed" || entry.disposition === "generator-owned" ? entry : undefined);
  const sourceOwnership = entry.unitId === undefined && entry.tsPath === undefined
    ? null
    : {
        unitId: entry.unitId,
        tsPath: entry.tsPath,
      };
  const storageAudit = entry.storageAudit === undefined
    ? null
    : {
        actualDescriptorHash: entry.storageAudit.actualDescriptorHash,
        exact: entry.storageAudit.exact,
        expectedDescriptorHash: entry.storageAudit.expectedDescriptorHash,
        valueTypeDescriptorHash: entry.storageAudit.valueTypeDescriptorHash,
      };
  const providerEvidence = provider === undefined
    ? null
    : {
        goDeclarationHash: provider.goDeclarationHash,
        ownerId: provider.ownerId ?? null,
        tsDeclarationHash: provider.tsDeclarationHash,
      };
  return {
    objectId: entry.objectId,
    disposition: entry.disposition,
    typeParameterCount: entry.typeParameterCount,
    operationTypeParameterIndexes: [...entry.operationTypeParameterIndexes],
    storageIdentity: entry.storageIdentity ?? null,
    operationIdentity: entry.operationIdentity ?? null,
    intrinsicCarrier: entry.intrinsicCarrier ?? null,
    sourceOwnership,
    storageAudit,
    providerEvidence,
  };
}

function requirePortableEntry(value, label) {
  requireExactObject(value, entryKeys, label);
  requireGoTypeIdentity(value.objectId, `${label}.objectId`);
  if (!dispositions.has(value.disposition)) throw new Error(`${label}.disposition is invalid`);
  requireCount(value.typeParameterCount, `${label}.typeParameterCount`);
  requireOperationIndexes(value.operationTypeParameterIndexes, value.typeParameterCount, `${label}.operationTypeParameterIndexes`);
  requireNullableIdentity(value.storageIdentity, `${label}.storageIdentity`);
  requireNullableIdentity(value.operationIdentity, `${label}.operationIdentity`);
  if (value.disposition === "intrinsic") {
    if (value.operationIdentity !== null) throw new Error(`${label}.operationIdentity must be null for an intrinsic provider`);
    if (!intrinsicCarriers.has(value.intrinsicCarrier)) throw new Error(`${label}.intrinsicCarrier is invalid`);
  } else {
    if (value.operationIdentity === null) throw new Error(`${label}.operationIdentity is required for '${value.disposition}'`);
    if (value.intrinsicCarrier !== null) throw new Error(`${label}.intrinsicCarrier must be null for '${value.disposition}'`);
  }
  requireNullableSourceOwnership(value.sourceOwnership, `${label}.sourceOwnership`);
  requireNullableStorageAudit(value.storageAudit, `${label}.storageAudit`);
  requireNullableProviderEvidence(value.providerEvidence, value.disposition, `${label}.providerEvidence`);
  if (value.sourceOwnership !== null && value.storageAudit === null) {
    throw new Error(`${label}.storageAudit is required for local source ownership`);
  }
  if (value.disposition !== "intrinsic" && value.storageIdentity === null) {
    throw new Error(`${label}.storageIdentity is required for '${value.disposition}'`);
  }
}

function requireNullableSourceOwnership(value, label) {
  if (value === null) return;
  requireExactObject(value, sourceOwnershipKeys, label);
  requireNonEmptyString(value.unitId, `${label}.unitId`);
  requireNonEmptyString(value.tsPath, `${label}.tsPath`);
}

function requireNullableStorageAudit(value, label) {
  if (value === null) return;
  requireExactObject(value, storageAuditKeys, label);
  if (typeof value.exact !== "boolean") throw new Error(`${label}.exact must be boolean`);
  requireSha256(value.actualDescriptorHash, `${label}.actualDescriptorHash`);
  requireSha256(value.expectedDescriptorHash, `${label}.expectedDescriptorHash`);
  requireSha256(value.valueTypeDescriptorHash, `${label}.valueTypeDescriptorHash`);
}

function requireNullableProviderEvidence(value, disposition, label) {
  if (value === null) {
    if (disposition === "reviewed" || disposition === "generator-owned") {
      throw new Error(`${label} is required for '${disposition}'`);
    }
    return;
  }
  if (disposition !== "reviewed" && disposition !== "generator-owned") {
    throw new Error(`${label} is not valid for '${disposition}'`);
  }
  requireExactObject(value, providerEvidenceKeys, label);
  requireSha256(value.goDeclarationHash, `${label}.goDeclarationHash`);
  requireSha256(value.tsDeclarationHash, `${label}.tsDeclarationHash`);
  if (disposition === "generator-owned") requireNonEmptyString(value.ownerId, `${label}.ownerId`);
  else if (value.ownerId !== null) throw new Error(`${label}.ownerId must be null for a reviewed provider`);
}

function requireExactRuntimeOperations(value, tsRoot) {
  const expected = portableRuntimeValueOperationRules({ tsRoot });
  if (JSON.stringify(value) !== JSON.stringify(expected)) {
    throw new Error("portable Go value-operation catalog.runtimeOperations differs from the canonical Porter runtime rules");
  }
}

function requireOperationIndexes(value, arity, label) {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  let previous = -1;
  for (const [position, index] of value.entries()) {
    if (!Number.isSafeInteger(index) || index < 0 || index >= arity) {
      throw new Error(`${label}[${position}] is outside generic arity ${arity}`);
    }
    if (index <= previous) throw new Error(`${label} must be strictly increasing with no duplicates`);
    previous = index;
  }
}

function claimIdentity(owners, identity, objectId, role, label) {
  if (identity === null) return;
  const previous = owners.get(identity);
  if (previous !== undefined) throw new Error(`${label}.${role}Identity is already owned by '${previous}'`);
  owners.set(identity, objectId);
}

function requireExactObject(value, keys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const actual = Object.keys(value).sort(compareText);
  const expected = [...keys].sort(compareText);
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
  for (const key of expected) if (value[key] === undefined) throw new Error(`${label}.${key} must be defined`);
}

function requireGoTypeIdentity(value, label) {
  if (typeof value !== "string" || !/^(?:builtin|[^:\s]+)::type::[^:\s]+$/.test(value)) {
    throw new Error(`${label} must be one exact Go type object identity`);
  }
}

function requireNullableIdentity(value, label) {
  if (value === null) return;
  requireNonEmptyString(value, label);
  if (!value.includes("::")) throw new Error(`${label} must be one exact module export identity`);
}

function requireNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim() === "" || value !== value.trim() || value.includes("\0")) {
    throw new Error(`${label} must be one non-empty trimmed string`);
  }
  return value;
}

function requireCount(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${label} must be a non-negative safe integer`);
}

function requireSha1(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{40}$/.test(value)) throw new Error(`${label} must be one lowercase SHA-1 object id`);
  return value;
}

function requireSha256(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/.test(value)) throw new Error(`${label} must be one lowercase SHA-256 digest`);
}

function deepFreeze(value) {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}
