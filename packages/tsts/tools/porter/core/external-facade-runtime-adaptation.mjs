import { hashText } from "./runtime.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";
import { semanticDeclarationVariantsHash } from "./semantic-declaration-hash.mjs";

const scalarStorageTypes = new Set(["bigint", "boolean", "number", "string"]);

export function normalizeRuntimeAdaptation(value, semantic, objectId) {
  if (value === undefined) return undefined;
  requirePlainObject(value, `external facade '${objectId}' runtimeAdaptation`);
  const allowed = new Set(["extraMembers", "goDeclarationHash", "nominality", "nominalityReason", "pointer", "reason", "representation", "scalarStorage", "tsDeclarationHash"]);
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) {
    throw new Error(`external facade '${objectId}' runtimeAdaptation contains unknown key(s): ${unknown.sort().join(", ")}`);
  }
  if (value.representation !== undefined && !new Set(["class", "scalar", "structural"]).has(value.representation)) {
    throw new Error(`external facade '${objectId}' runtimeAdaptation.representation must be 'class', 'scalar', or 'structural'`);
  }
  if (value.pointer !== undefined && value.pointer !== "aggregate" && value.pointer !== "slot") {
    throw new Error(`external facade '${objectId}' runtimeAdaptation.pointer must be 'aggregate' or 'slot'`);
  }
  if (value.representation === "scalar" && value.pointer === "aggregate") {
    throw new Error(`external facade '${objectId}' scalar runtime storage cannot use aggregate pointer storage`);
  }
  if (value.representation === "class" && value.pointer === "slot") {
    throw new Error(`external facade '${objectId}' class runtime storage cannot use replaceable-slot pointer storage`);
  }
  if (value.representation === "scalar" && !scalarStorageTypes.has(value.scalarStorage)) {
    throw new Error(`external facade '${objectId}' scalar runtime storage requires exact scalarStorage 'bigint', 'boolean', 'number', or 'string'`);
  }
  if (value.representation !== "scalar" && value.scalarStorage !== undefined) {
    throw new Error(`external facade '${objectId}' scalarStorage applies only to scalar runtime storage`);
  }
  const declarations = semantic.variants.map(({ declaration }) => declaration);
  const nominalityApplies = value.representation !== undefined && declarations.every((declaration) => !declaration.alias && declaration.rhs.kind !== "interface");
  if (nominalityApplies && !new Set(["erased", "preserved"]).has(value.nominality)) {
    throw new Error(`external facade '${objectId}' runtimeAdaptation.nominality must explicitly be 'preserved' or 'erased' for a defined Go type`);
  }
  if (!nominalityApplies && (value.nominality !== undefined || value.nominalityReason !== undefined)) {
    throw new Error(`external facade '${objectId}' runtimeAdaptation nominality policy applies only to a defined non-interface Go type representation`);
  }
  if (value.representation === "structural" && nominalityApplies && value.nominality !== "erased") {
    throw new Error(`external facade '${objectId}' structural storage must explicitly classify defined-type nominality as erased`);
  }
  if (value.nominality === "erased" && (typeof value.nominalityReason !== "string" || value.nominalityReason.trim().length < 20)) {
    throw new Error(`external facade '${objectId}' erased Go nominality requires a specific nominalityReason`);
  }
  if (value.nominality !== "erased" && value.nominalityReason !== undefined) {
    throw new Error(`external facade '${objectId}' nominalityReason is valid only when nominality is 'erased'`);
  }
  if (value.representation === undefined && value.pointer === undefined) {
    throw new Error(`external facade '${objectId}' runtimeAdaptation must define representation or pointer storage`);
  }
  if (typeof value.reason !== "string" || value.reason.trim().length < 20) {
    throw new Error(`external facade '${objectId}' runtimeAdaptation.reason must be a specific non-empty review justification`);
  }
  if (value.representation === "scalar" && new Set(semantic.variants.map(({ declaration }) => canonicalSchemaValue(declaration))).size !== 1) {
    throw new Error(`external facade '${objectId}' scalar runtime storage cannot erase profile-dependent Go declaration semantics`);
  }
  const expectedHash = semanticDeclarationVariantsHash(semantic, `external facade '${objectId}'`);
  if (typeof value.goDeclarationHash !== "string" || !/^[0-9a-f]{64}$/.test(value.goDeclarationHash)) {
    throw new Error(`external facade '${objectId}' runtime adaptation requires exact goDeclarationHash '${expectedHash}'`);
  }
  if (value.goDeclarationHash !== expectedHash) {
    throw new Error(`external facade '${objectId}' Go declaration snapshot drifted: config=${value.goDeclarationHash} current=${expectedHash}`);
  }
  if (value.tsDeclarationHash !== undefined && (typeof value.tsDeclarationHash !== "string" || !/^[0-9a-f]{64}$/.test(value.tsDeclarationHash))) {
    throw new Error(`external facade '${objectId}' tsDeclarationHash must be one SHA-256 declaration snapshot`);
  }
  if (value.representation === undefined && value.tsDeclarationHash !== undefined) {
    throw new Error(`external facade '${objectId}' tsDeclarationHash applies only to a runtime representation adaptation`);
  }
  const extraMembers = normalizeExtraMembers(value.extraMembers, objectId);
  return {
    ...(extraMembers.length === 0 ? {} : { extraMembers }),
    ...(value.representation === undefined ? {} : { representation: value.representation }),
    ...(value.pointer === undefined ? {} : { pointer: value.pointer }),
    ...(value.scalarStorage === undefined ? {} : { scalarStorage: value.scalarStorage }),
    ...(value.nominality === undefined ? {} : { nominality: value.nominality }),
    ...(value.nominalityReason === undefined ? {} : { nominalityReason: value.nominalityReason.trim() }),
    ...(value.goDeclarationHash === undefined ? {} : { goDeclarationHash: value.goDeclarationHash }),
    ...(value.tsDeclarationHash === undefined ? {} : { tsDeclarationHash: value.tsDeclarationHash }),
    reason: value.reason.trim(),
  };
}

function normalizeExtraMembers(value, objectId) {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error(`external facade '${objectId}' runtimeAdaptation.extraMembers must be an array`);
  const keys = new Set();
  return value.map((member, index) => {
    const label = `external facade '${objectId}' runtimeAdaptation.extraMembers[${index}]`;
    requirePlainObject(member, label);
    const unknown = Object.keys(member).filter((key) => !new Set(["declarationHash", "kind", "name", "reason"]).has(key));
    if (unknown.length > 0) throw new Error(`${label} contains unknown key(s): ${unknown.sort().join(", ")}`);
    if (typeof member.name !== "string" || member.name === "") throw new Error(`${label}.name must be non-empty`);
    if (typeof member.kind !== "string" || member.kind === "") throw new Error(`${label}.kind must be non-empty`);
    if (typeof member.declarationHash !== "string" || !/^[0-9a-f]{64}$/.test(member.declarationHash)) {
      throw new Error(`${label}.declarationHash must be one SHA-256 member snapshot`);
    }
    if (typeof member.reason !== "string" || member.reason.trim().length < 20) {
      throw new Error(`${label}.reason must specifically justify the extra TypeScript member`);
    }
    const key = `${member.kind}\0${member.name}`;
    if (keys.has(key)) throw new Error(`${label} duplicates extra member '${member.kind} ${member.name}'`);
    keys.add(key);
    return { ...member, reason: member.reason.trim() };
  }).sort((left, right) => left.kind.localeCompare(right.kind) || left.name.localeCompare(right.name));
}

export function externalTypeScriptDeclarationHash(descriptor) {
  if (descriptor === null || typeof descriptor !== "object" || Array.isArray(descriptor)) {
    throw new Error("authored TypeScript facade declaration snapshot must be one canonical descriptor");
  }
  return hashText(canonicalSchemaValue(descriptor));
}

function requirePlainObject(value, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)
    || (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null)
    || Reflect.ownKeys(value).some((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      return typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor);
    })) {
    throw new Error(`${label} must be a plain enumerable own-data-property object`);
  }
}
