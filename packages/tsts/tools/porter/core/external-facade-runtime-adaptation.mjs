import { normalizeRuntimeAdaptationConfig } from "./external-facade-config.mjs";
import { hashText } from "./runtime.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";
import { semanticDeclarationVariantsHash } from "./semantic-declaration-hash.mjs";

export function normalizeRuntimeAdaptation(value, semantic, objectId, semanticIndex) {
  const normalized = normalizeRuntimeAdaptationConfig(value, objectId);
  if (normalized === undefined) return undefined;
  const declarations = semantic.variants.map(({ declaration }) => declaration);
  validatePointerStorageApplicability(normalized.pointer, semantic, semanticIndex, objectId);
  const nominalityApplies = normalized.representation !== undefined && declarations.every((declaration) =>
    !declaration.alias && declaration.rhs.kind !== "interface");
  if (nominalityApplies && normalized.nominality === undefined) {
    throw new Error(`external facade '${objectId}' runtimeAdaptation.nominality must explicitly be 'preserved' or 'erased' for a defined Go type`);
  }
  if (!nominalityApplies && (normalized.nominality !== undefined || normalized.nominalityReason !== undefined)) {
    throw new Error(`external facade '${objectId}' runtimeAdaptation nominality policy applies only to a defined non-interface Go type representation`);
  }
  if (normalized.representation === "structural" && nominalityApplies && normalized.nominality !== "erased") {
    throw new Error(`external facade '${objectId}' structural storage must explicitly classify defined-type nominality as erased`);
  }
  if (normalized.representation === "scalar" && new Set(declarations.map(canonicalSchemaValue)).size !== 1) {
    throw new Error(`external facade '${objectId}' scalar runtime storage cannot erase profile-dependent Go declaration semantics`);
  }
  const expectedHash = semanticDeclarationVariantsHash(semantic, `external facade '${objectId}'`);
  if (normalized.goDeclarationHash !== expectedHash) {
    throw new Error(`external facade '${objectId}' Go declaration snapshot drifted: config=${normalized.goDeclarationHash} current=${expectedHash}`);
  }
  return normalized;
}

function validatePointerStorageApplicability(pointer, semantic, semanticIndex, objectId) {
  const aggregateProfiles = [];
  const nonAggregateProfiles = [];
  for (const [profile, declaration] of semantic.byProfile) {
    const aggregate = resolvesToAggregate(declaration.rhs, profile, semanticIndex, new Set([objectId]));
    (aggregate ? aggregateProfiles : nonAggregateProfiles).push(profile);
  }
  if (aggregateProfiles.length > 0 && nonAggregateProfiles.length > 0) {
    throw new Error(`external facade '${objectId}' changes aggregate pointer-storage applicability across semantic profiles`);
  }
  if (aggregateProfiles.length === 0 && pointer !== undefined) {
    throw new Error(`external facade '${objectId}' pointer storage applies only to Go values with aggregate storage`);
  }
  if (aggregateProfiles.length > 0 && pointer === undefined) {
    throw new Error(`external facade '${objectId}' aggregate Go storage requires exact pointer storage 'aggregate' or 'slot'`);
  }
}

function resolvesToAggregate(type, profile, semanticIndex, resolving) {
  if (type?.kind === "array" || type?.kind === "struct") return true;
  if (type?.kind !== "named" && type?.kind !== "alias") return false;
  const objectId = type.reference?.objectId;
  if (typeof objectId !== "string" || objectId === "" || resolving.has(objectId)) return false;
  const declaration = semanticIndex?.get(objectId)?.byProfile?.get(profile);
  if (declaration === undefined) return false;
  resolving.add(objectId);
  try {
    return resolvesToAggregate(declaration.rhs, profile, semanticIndex, resolving);
  } finally {
    resolving.delete(objectId);
  }
}

export function externalTypeScriptDeclarationHash(descriptor) {
  if (descriptor === null || typeof descriptor !== "object" || Array.isArray(descriptor)) {
    throw new Error("authored TypeScript facade declaration snapshot must be one canonical descriptor");
  }
  return hashText(canonicalSchemaValue(descriptor));
}
