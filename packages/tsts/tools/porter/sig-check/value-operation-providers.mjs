import { externalTypeScriptDeclarationHash } from "../core/external-facade-runtime-adaptation.mjs";
import { compareText } from "../core/deterministic-order.mjs";
import { canonicalSchemaValue } from "../core/semantic-variants.mjs";
import { buildReviewedGoValueOperationCatalog } from "../core/value-operations/reviewed-providers.mjs";
import {
  extractIndexedFunctionExportDescriptor,
  extractIndexedReviewedTypeDescriptor,
  extractIndexedValueExportDescriptor,
} from "../ts-extractor/extract-signatures.mjs";
import { loadProfile } from "../ts-extractor/profile.mjs";
import { semanticNamedValueDescriptor } from "../ts-extractor/expected-from-go.mjs";
import { declarationOwnershipIds, descriptorOwnershipKind } from "./declaration-ownership.mjs";

export function collectGoValueOperationProviderMismatches({
  api,
  config,
  expectedIndex,
  moduleIndex,
  snapshot,
  valueEnvironments,
}) {
  const catalog = buildReviewedGoValueOperationCatalog(config, snapshot);
  const inventory = [];
  const mismatches = [];
  const ownedDeclarationIds = new Set();
  const goValueOpsIdentity = `${loadProfile(config).modules.compat}::GoValueOps`;
  for (const policy of catalog.values()) {
    const { moduleId, name } = splitOperationIdentity(policy.operationIdentity);
    inventory.push({
      goDeclarationHash: policy.goDeclarationHash,
      objectId: policy.objectId,
      operationIdentity: policy.operationIdentity,
      operationTypeParameterIndexes: policy.operationTypeParameterIndexes,
      reason: policy.reason,
      storageIdentity: policy.storageIdentity,
      tsDeclarationHash: policy.tsDeclarationHash,
      typeParameterCount: policy.typeParameterCount,
    });
    try {
      const storage = extractDirectStorage(api, moduleIndex, policy.storageIdentity, valueEnvironments);
      const valueType = semanticNamedValueDescriptor(policy.semantic, expectedIndex, `reviewed Go value operations '${policy.objectId}'`);
      if (!descriptorContainsReference(valueType, policy.storageIdentity)) {
        throw new Error(`selected Go value representation does not reference direct storage '${policy.storageIdentity}'`);
      }
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
      requireOperationShape(policy, extracted.descriptor, storage.descriptor, valueType, goValueOpsIdentity);
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

function extractDirectStorage(api, moduleIndex, identity, valueEnvironments) {
  const { moduleId, name } = splitIdentity(identity, "TypeScript storage");
  const storage = extractIndexedReviewedTypeDescriptor(api, moduleIndex, moduleId, name, valueEnvironments);
  if (storage.declarationId !== identity) {
    throw new Error(`storage export resolves to '${storage.declarationId}' instead of direct declaration '${identity}'`);
  }
  return storage;
}

function requireOperationShape(policy, descriptor, storageDescriptor, valueType, goValueOpsIdentity) {
  const storageTypeParameters = Array.isArray(storageDescriptor.typeParams) ? storageDescriptor.typeParams : [];
  if (storageTypeParameters.length !== policy.typeParameterCount) {
    throw new Error(`storage '${policy.storageIdentity}' has generic arity ${storageTypeParameters.length}, expected ${policy.typeParameterCount}`);
  }
  const resultType = goValueOperationsReference(goValueOpsIdentity, valueType);
  if (policy.typeParameterCount === 0) {
    requireConstantOperation(descriptor, resultType);
    return;
  }
  requireFactoryOperation(policy, descriptor, storageTypeParameters, resultType, goValueOpsIdentity);
}

function requireConstantOperation(descriptor, resultType) {
  if (descriptor.kind !== "value" || descriptor.decls?.length !== 1) {
    throw new Error("non-generic Go value operations must be one direct const declaration");
  }
  const declaration = descriptor.decls[0];
  if (declaration.declarationKind !== "const" || declaration.missing !== false) {
    throw new Error("non-generic Go value operations must be one explicitly typed const declaration");
  }
  requireSameDescriptor(declaration.type, resultType, "non-generic Go value-operation type");
}

function requireFactoryOperation(policy, descriptor, storageTypeParameters, resultType, goValueOpsIdentity) {
  if (descriptor.kind !== "func" || descriptor.signatures?.length !== 1 || descriptor.signatures[0].role !== "implementation") {
    throw new Error("generic Go value operations must be one direct function implementation with no overloads");
  }
  const signature = descriptor.signatures[0];
  requireSameDescriptor(signature.typeParams, storageTypeParameters, "Go value-operation factory type parameters");
  if (signature.params.length !== policy.operationTypeParameterIndexes.length) {
    throw new Error(`Go value-operation factory has ${signature.params.length} parameters, expected ${policy.operationTypeParameterIndexes.length}`);
  }
  for (const [position, typeParameterIndex] of policy.operationTypeParameterIndexes.entries()) {
    const parameter = signature.params[position];
    if (parameter.role !== "parameter" || parameter.rest || parameter.optional || parameter.missingType ||
        parameter.modifiers.length !== 0 || parameter.initializerStatus !== "missing") {
      throw new Error(`Go value-operation factory parameter ${position} must be one required explicitly typed parameter`);
    }
    requireSameDescriptor(
      parameter.type,
      goValueOperationsReference(goValueOpsIdentity, typeParameterReference(typeParameterIndex)),
      `Go value-operation factory parameter ${position} type`,
    );
  }
  if (signature.missingReturnType || signature.returnTypePolicy !== "required" || signature.signatureModifiers.length !== 0) {
    throw new Error("Go value-operation factory must have one explicit synchronous return type");
  }
  requireSameDescriptor(signature.ret, resultType, "Go value-operation factory return type");
}

function goValueOperationsReference(identity, argument) {
  return { t: "ref", id: identity, args: [argument] };
}

function typeParameterReference(index) {
  return { t: "tp", depth: 0, index };
}

function requireSameDescriptor(actual, expected, label) {
  const actualShape = canonicalSchemaValue(actual);
  const expectedShape = canonicalSchemaValue(expected);
  if (actualShape !== expectedShape) throw new Error(`${label} differs from the exact storage contract`);
}

function descriptorContainsReference(value, identity) {
  if (value === null || typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some((entry) => descriptorContainsReference(entry, identity));
  if (value.t === "ref" && value.id === identity) return true;
  return Object.values(value).some((entry) => descriptorContainsReference(entry, identity));
}

function splitOperationIdentity(identity) {
  return splitIdentity(identity, "TypeScript value-operation");
}

function splitIdentity(identity, role) {
  const separator = identity.lastIndexOf("::");
  if (separator <= 0 || separator === identity.length - 2) {
    throw new Error(`invalid ${role} identity '${identity}'`);
  }
  return { moduleId: identity.slice(0, separator), name: identity.slice(separator + 2) };
}
