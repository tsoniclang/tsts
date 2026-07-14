import { compareText } from "../core/deterministic-order.mjs";
import { semanticDeclarationVariantsHash } from "../core/semantic-declaration-hash.mjs";
import { buildSemanticTypeCatalog } from "../core/type-storage-policies.mjs";
import { loadAstSchema } from "./config.mjs";
import { HAND_WRITTEN_BASES } from "./node-emitters.mjs";

export function buildAstGeneratorOwnedGoValueOperationRoutes(config, snapshot, generatedTypeOwnership) {
  if (!(generatedTypeOwnership instanceof Map)) {
    throw new Error("AST generator-owned Go value operations require finalized generated type ownership");
  }
  const schema = loadAstSchema(config).model;
  const expected = expectedValueTypes(config, schema);
  const ownedByName = astOwnershipByName(generatedTypeOwnership);
  const semanticTypes = buildSemanticTypeCatalog(snapshot);
  const routes = [];
  for (const [name, route] of expected) {
    const owner = ownedByName.get(name);
    if (owner === undefined) throw new Error(`AST value-operation type '${name}' has no generated declaration owner`);
    if (owner.moduleId !== route.storageModule) {
      throw new Error(`AST value-operation type '${name}' storage owner '${owner.moduleId}' differs from '${route.storageModule}'`);
    }
    const semantic = semanticTypes.get(owner.objectId);
    if (semantic === undefined) throw new Error(`AST value-operation type '${name}' has no extracted Go declaration`);
    const arities = new Set(semantic.variants.map((variant) => variant.declaration.type.typeParameters.length));
    if (arities.size !== 1 || !arities.has(0)) {
      throw new Error(`AST value-operation type '${name}' must remain one non-generic generated Go struct`);
    }
    const valueRoute = {
      goDeclarationHash: semanticDeclarationVariantsHash(semantic, `AST value-operation type '${name}'`),
      objectId: owner.objectId,
      operationIdentity: `${route.operationModule}::${name}ValueOps`,
      operationTypeParameterIndexes: Object.freeze([]),
      ownerId: "porter:ast",
      storageIdentity: `${route.storageModule}::${name}`,
      typeParameterCount: 0,
    };
    Object.defineProperty(valueRoute, "semantic", { value: semantic, enumerable: false });
    routes.push(Object.freeze(valueRoute));
  }
  const ignored = nonAggregateTypeNames(schema);
  const unexpected = [...ownedByName.keys()].filter((name) => expected.has(name) === false && ignored.has(name) === false);
  if (unexpected.length > 0) {
    throw new Error(`AST generator-owned Go value-operation routing omitted aggregate type(s): ${unexpected.sort(compareText).join(", ")}`);
  }
  routes.sort((left, right) => compareText(left.objectId, right.objectId));
  return Object.freeze(routes);
}

export function astGeneratorOwnedValueTypeNames(config) {
  return Object.freeze([...expectedValueTypes(config, loadAstSchema(config).model).keys()]);
}

function expectedValueTypes(config, schema) {
  const root = `${config.tsRoot.replace(/\/+$/, "")}/internal/ast/generated`;
  const routes = new Map();
  addRoute(routes, "NodeFactory", `${root}/factory.ts`, `${root}/factory-storage.ts`);
  for (const name of schema.baseNames()) {
    if (!HAND_WRITTEN_BASES.has(name)) addRoute(routes, name, `${root}/node.ts`, `${root}/node.ts`);
  }
  for (const name of schema.nodeNames()) {
    if (!schema.definitions[name].handWritten) addRoute(routes, name, `${root}/data.ts`, `${root}/data.ts`);
  }
  return routes;
}

function addRoute(routes, name, storageModule, operationModule) {
  if (routes.has(name)) throw new Error(`AST value-operation type '${name}' has duplicate generated routing`);
  routes.set(name, Object.freeze({ operationModule, storageModule }));
}

function astOwnershipByName(generatedTypeOwnership) {
  const result = new Map();
  for (const owner of generatedTypeOwnership.values()) {
    if (owner.generator !== "porter:ast") continue;
    if (result.has(owner.tsName)) throw new Error(`AST generated type name '${owner.tsName}' has multiple owners`);
    result.set(owner.tsName, owner);
  }
  return result;
}

function nonAggregateTypeNames(schema) {
  const names = new Set(["Kind", ...schema.kindAliasNames()]);
  for (const node of schema.nodeNames()) {
    names.add(`${node}Node`);
    for (const alias of schema.instantiationAliasesOf(node)) names.add(alias.name);
  }
  for (const name of Object.keys(schema.listAliases)) names.add(name);
  for (const name of Object.keys(schema.aliases)) names.add(name);
  return names;
}
