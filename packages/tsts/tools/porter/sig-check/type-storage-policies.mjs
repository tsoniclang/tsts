import { compareText } from "../core/deterministic-order.mjs";
import { externalTypeScriptDeclarationHash } from "../core/external-facade-runtime-adaptation.mjs";
import { buildTypeStoragePolicyCatalog } from "../core/type-storage-policies.mjs";
import { extractIndexedReviewedTypeDescriptor } from "../ts-extractor/extract-signatures.mjs";
import { declarationOwnershipIds, descriptorOwnershipKind } from "./declaration-ownership.mjs";

export function collectTypeStoragePolicyMismatches({ api, config, moduleIndex, snapshot, valueEnvironments }) {
  const catalog = buildTypeStoragePolicyCatalog(config, snapshot);
  const inventory = [];
  const mismatches = [];
  const ownedDeclarationIds = new Set();
  for (const policy of catalog.values()) {
    const { moduleId, name } = splitStorageIdentity(policy.storageIdentity);
    inventory.push({
      goDeclarationHash: policy.goDeclarationHash,
      objectId: policy.objectId,
      reason: policy.reason,
      storageIdentity: policy.storageIdentity,
      tsDeclarationHash: policy.tsDeclarationHash,
    });
    try {
      const extracted = extractIndexedReviewedTypeDescriptor(api, moduleIndex, moduleId, name, valueEnvironments);
      if (extracted.declarationId !== policy.storageIdentity) {
        throw new Error(`storage export resolves to '${extracted.declarationId}' instead of direct declaration '${policy.storageIdentity}'`);
      }
      const actualHash = externalTypeScriptDeclarationHash(extracted.descriptor);
      if (actualHash !== policy.tsDeclarationHash) {
        mismatches.push({
          id: `type-storage:${policy.objectId}`,
          file: moduleId,
          kind: "type-storage-typescript-drift",
          detail: `reviewed TypeScript storage declaration drifted: config=${policy.tsDeclarationHash} current=${actualHash}`,
        });
      }
      for (const id of declarationOwnershipIds(moduleId, name, descriptorOwnershipKind(extracted.descriptor))) ownedDeclarationIds.add(id);
    } catch (error) {
      mismatches.push({
        id: `type-storage:${policy.objectId}`,
        file: moduleId,
        kind: "type-storage-contract-error",
        detail: `reviewed type storage policy failed closed: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  }
  inventory.sort((left, right) => compareText(left.objectId, right.objectId));
  mismatches.sort((left, right) => compareText(left.file, right.file) || compareText(left.id, right.id));
  return { checked: inventory.length, inventory, mismatches, ownedDeclarationIds };
}

function splitStorageIdentity(identity) {
  const separator = identity.lastIndexOf("::");
  if (separator <= 0 || separator === identity.length - 2) throw new Error(`invalid TypeScript storage identity '${identity}'`);
  return { moduleId: identity.slice(0, separator), name: identity.slice(separator + 2) };
}
