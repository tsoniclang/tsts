import { compareText } from "./deterministic-order.mjs";
import { hashText } from "./runtime.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";

const scalarStorageTypes = new Set(["bigint", "boolean", "number", "string"]);

export function normalizeRuntimeAdaptation(value, semantic, objectId) {
  if (value === undefined) return undefined;
  requirePlainObject(value, `external facade '${objectId}' runtimeAdaptation`);
  const allowed = new Set(["goDeclarationHash", "pointer", "reason", "representation", "scalarStorage"]);
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
  if (value.representation === undefined && value.pointer === undefined) {
    throw new Error(`external facade '${objectId}' runtimeAdaptation must define representation or pointer storage`);
  }
  if (typeof value.reason !== "string" || value.reason.trim().length < 20) {
    throw new Error(`external facade '${objectId}' runtimeAdaptation.reason must be a specific non-empty review justification`);
  }
  if (value.representation === "scalar" && new Set(semantic.variants.map(({ declaration }) => canonicalSchemaValue(declaration))).size !== 1) {
    throw new Error(`external facade '${objectId}' scalar runtime storage cannot erase profile-dependent Go declaration semantics`);
  }
  const expectedHash = externalGoDeclarationHash(semantic);
  if (typeof value.goDeclarationHash !== "string" || !/^[0-9a-f]{64}$/.test(value.goDeclarationHash)) {
    throw new Error(`external facade '${objectId}' runtime adaptation requires exact goDeclarationHash '${expectedHash}'`);
  }
  if (value.goDeclarationHash !== expectedHash) {
    throw new Error(`external facade '${objectId}' Go declaration snapshot drifted: config=${value.goDeclarationHash} current=${expectedHash}`);
  }
  return {
    ...(value.representation === undefined ? {} : { representation: value.representation }),
    ...(value.pointer === undefined ? {} : { pointer: value.pointer }),
    ...(value.scalarStorage === undefined ? {} : { scalarStorage: value.scalarStorage }),
    ...(value.goDeclarationHash === undefined ? {} : { goDeclarationHash: value.goDeclarationHash }),
    reason: value.reason.trim(),
  };
}

export function externalGoDeclarationHash(semantic) {
  const variants = semantic?.variants ?? [];
  if (variants.length === 0) throw new Error(`external facade '${semantic?.objectId ?? "<unknown>"}' has no Go declaration to snapshot`);
  const rows = variants.map(({ declaration, profiles }) => ({
    declaration,
    profiles: [...profiles].sort((left, right) => left - right),
  })).sort((left, right) => compareText(canonicalSchemaValue(left), canonicalSchemaValue(right)));
  return hashText(canonicalSchemaValue(rows));
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
