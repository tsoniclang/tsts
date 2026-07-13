import { evaluateTypeScriptConstant } from "../constant-evaluation.mjs";
import { resolveModuleId } from "../source-structure.mjs";

const WELL_KNOWN_SYMBOLS = new Set([
  "asyncDispose", "asyncIterator", "dispose", "hasInstance", "isConcatSpreadable", "iterator", "match", "matchAll",
  "replace", "search", "species", "split", "toPrimitive", "toStringTag", "unscopables",
]);

export function computedPropertyIdentity(api, name, context) {
  if (name?.Kind !== api.Kinds.KindComputedPropertyName) return undefined;
  const expression = api.Casts.AsComputedPropertyName(name).Expression;
  const evaluation = evaluateTypeScriptConstant(api, expression, context.valueEnvironment);
  if (evaluation.status === "known" && new Set(["string", "number", "bigint"]).has(evaluation.value.kind)) {
    return String(evaluation.value.value);
  }
  const parts = valueReferenceParts(api, expression);
  if (parts.length === 0) return undefined;
  const identity = valueReferenceIdentity(parts, context);
  if (identity === `global::Symbol.${parts.at(-1)}` && parts.length === 2 && WELL_KNOWN_SYMBOLS.has(parts[1])) {
    return `symbol:${identity}`;
  }
  return `computed:${identity}`;
}

function valueReferenceParts(api, node) {
  if (node?.Kind === api.Kinds.KindIdentifier) return [node.Text];
  if (node?.Kind !== api.Kinds.KindPropertyAccessExpression) return [];
  const access = api.Casts.AsPropertyAccessExpression(node);
  return [...valueReferenceParts(api, access.Expression), access.name?.Text].filter((part) => typeof part === "string");
}

function valueReferenceIdentity(parts, context) {
  const [head, ...tail] = parts;
  const named = context.imports?.named?.get(head);
  if (named !== undefined && !named.typeOnly) {
    return `${resolveModuleId(named.module, context.moduleId)}::${[named.imported, ...tail].join(".")}`;
  }
  const namespace = context.imports?.namespaces?.get(head);
  if (namespace !== undefined && !namespace.typeOnly) {
    return `${resolveModuleId(namespace.module, context.moduleId)}::${tail.join(".")}`;
  }
  if (context.valueEnvironment?.has(head) || context.localValues?.has(head)) return `${context.moduleId}::${parts.join(".")}`;
  if (context.localTypes?.has(head)) return `unresolved::${parts.join(".")}`;
  return `global::${parts.join(".")}`;
}
