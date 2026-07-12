import { compareText } from "./deterministic-order.mjs";
import { normalizeExternalMethodBindingConfigs } from "./external-facade-config.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";

export function normalizeExternalMethodBindings(value, semantic, label) {
  const configured = normalizeExternalMethodBindingConfigs(value, label);
  const bindings = [];
  for (const [index, binding] of configured.entries()) {
    const bindingLabel = `${label}.methodBindings[${index}]`;
    const methods = semantic.variants.map(({ declaration }) => externalMethodById(declaration, binding.methodId));
    if (methods.some((method) => method === undefined)) {
      throw new Error(`${bindingLabel}.methodId is not present in every active semantic profile`);
    }
    if (methods.some((method) => method.exported !== true)) throw new Error(`${bindingLabel}.methodId must identify an exported Go method`);
    if (new Set(methods.map(canonicalSchemaValue)).size !== 1) {
      throw new Error(`${bindingLabel}.methodId changes across active semantic profiles`);
    }
    bindings.push(binding);
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
