import { externalTypeScriptDeclarationHash } from "../core/external-facade-runtime-adaptation.mjs";
import { compareText } from "../core/deterministic-order.mjs";
import { buildReviewedGoValueOperationCatalog } from "../core/value-operations/reviewed-providers.mjs";
import {
  extractIndexedFunctionExportDescriptor,
  extractIndexedValueExportDescriptor,
} from "../ts-extractor/extract-signatures.mjs";
import { declarationOwnershipIds, descriptorOwnershipKind } from "./declaration-ownership.mjs";

export function collectGoValueOperationProviderMismatches({
  api,
  config,
  moduleIndex,
  snapshot,
  valueEnvironments,
}) {
  const catalog = buildReviewedGoValueOperationCatalog(config, snapshot);
  const inventory = [];
  const mismatches = [];
  const ownedDeclarationIds = new Set();
  for (const policy of catalog.values()) {
    const { moduleId, name } = splitOperationIdentity(policy.operationIdentity);
    inventory.push({
      goDeclarationHash: policy.goDeclarationHash,
      objectId: policy.objectId,
      operationIdentity: policy.operationIdentity,
      operationTypeParameterIndexes: policy.operationTypeParameterIndexes,
      reason: policy.reason,
      tsDeclarationHash: policy.tsDeclarationHash,
      typeParameterCount: policy.typeParameterCount,
    });
    try {
      const extracted = policy.typeParameterCount === 0
        ? extractIndexedValueExportDescriptor(api, moduleIndex, moduleId, name, valueEnvironments)
        : extractIndexedFunctionExportDescriptor(api, moduleIndex, moduleId, name, valueEnvironments);
      if (extracted.declarationId !== policy.operationIdentity) {
        throw new Error(`operation export resolves to '${extracted.declarationId}' instead of direct declaration '${policy.operationIdentity}'`);
      }
      const actualHash = externalTypeScriptDeclarationHash(extracted.descriptor);
      if (actualHash !== policy.tsDeclarationHash) {
        mismatches.push({
          id: `go-value-ops:${policy.objectId}`,
          file: moduleId,
          kind: "go-value-operation-typescript-drift",
          detail: `reviewed TypeScript value-operation declaration drifted: config=${policy.tsDeclarationHash} current=${actualHash}`,
        });
      }
      for (const id of declarationOwnershipIds(moduleId, name, descriptorOwnershipKind(extracted.descriptor))) {
        ownedDeclarationIds.add(id);
      }
    } catch (error) {
      mismatches.push({
        id: `go-value-ops:${policy.objectId}`,
        file: moduleId,
        kind: "go-value-operation-contract-error",
        detail: `reviewed Go value-operation provider failed closed: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  }
  inventory.sort((left, right) => compareText(left.objectId, right.objectId));
  mismatches.sort((left, right) => compareText(left.file, right.file) || compareText(left.id, right.id));
  return { checked: inventory.length, inventory, mismatches, ownedDeclarationIds };
}

function splitOperationIdentity(identity) {
  const separator = identity.lastIndexOf("::");
  if (separator <= 0 || separator === identity.length - 2) {
    throw new Error(`invalid TypeScript value-operation identity '${identity}'`);
  }
  return { moduleId: identity.slice(0, separator), name: identity.slice(separator + 2) };
}
