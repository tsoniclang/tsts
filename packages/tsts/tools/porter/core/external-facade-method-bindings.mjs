import { compareText } from "./deterministic-order.mjs";
import { safeIdentifier } from "./names.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";

export function normalizeExternalMethodBindings(value, semantic, label) {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error(`${label}.methodBindings must be an array`);
  const methodIds = new Set();
  const tsNames = new Set();
  const bindings = [];
  for (const [index, binding] of value.entries()) {
    const bindingLabel = `${label}.methodBindings[${index}]`;
    if (!isPlainObject(binding)) throw new Error(`${bindingLabel} must be an object`);
    const unknown = Object.keys(binding).filter((key) => !new Set(["methodId", "receiverName", "tsName"]).has(key));
    if (unknown.length > 0) throw new Error(`${bindingLabel} contains unknown key(s): ${unknown.sort().join(", ")}`);
    if (typeof binding.methodId !== "string" || binding.methodId.length === 0) throw new Error(`${bindingLabel}.methodId must be non-empty`);
    if (typeof binding.tsName !== "string" || safeIdentifier(binding.tsName) !== binding.tsName || binding.tsName === "") {
      throw new Error(`${bindingLabel}.tsName must be one exact TypeScript identifier`);
    }
    if (typeof binding.receiverName !== "string" || safeIdentifier(binding.receiverName) !== binding.receiverName || binding.receiverName === "") {
      throw new Error(`${bindingLabel}.receiverName must be one exact TypeScript identifier`);
    }
    if (methodIds.has(binding.methodId)) throw new Error(`${label}.methodBindings duplicates Go method '${binding.methodId}'`);
    if (tsNames.has(binding.tsName)) throw new Error(`${label}.methodBindings duplicates TypeScript export '${binding.tsName}'`);
    const methods = semantic.variants.map(({ declaration }) => externalMethodById(declaration, binding.methodId));
    if (methods.some((method) => method === undefined)) {
      throw new Error(`${bindingLabel}.methodId is not present in every active semantic profile`);
    }
    if (methods.some((method) => method.exported !== true)) throw new Error(`${bindingLabel}.methodId must identify an exported Go method`);
    if (new Set(methods.map(canonicalSchemaValue)).size !== 1) {
      throw new Error(`${bindingLabel}.methodId changes across active semantic profiles`);
    }
    methodIds.add(binding.methodId);
    tsNames.add(binding.tsName);
    bindings.push({ methodId: binding.methodId, receiverName: binding.receiverName, tsName: binding.tsName });
  }
  return bindings.sort((left, right) => compareText(left.methodId, right.methodId));
}

export function externalMethodById(declaration, methodId) {
  const methods = [
    ...(declaration.methods ?? []),
    ...(declaration.rhs.interface?.explicitMethods ?? []),
  ];
  return methods.find((method) => method.id === methodId);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value) &&
    (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
