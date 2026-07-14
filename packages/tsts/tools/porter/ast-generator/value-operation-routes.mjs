import { compareText } from "../core/deterministic-order.mjs";
import { requireGeneratedDeclarationOwnerCatalog } from "../core/generated-declaration-owner-catalog.mjs";
import { semanticDeclarationVariantsHash } from "../core/semantic-declaration-hash.mjs";
import { buildSemanticTypeCatalog } from "../core/type-storage-policies.mjs";
import { loadAstSchema } from "./config.mjs";
import { HAND_WRITTEN_BASES } from "./node-emitters.mjs";

export function buildAstGeneratorOwnedGoValueOperationRoutes(config, snapshot, generatedTypeOwnership) {
  const generatedOwners = requireGeneratedDeclarationOwnerCatalog(generatedTypeOwnership, config, snapshot);
  const schema = loadAstSchema(config).model;
  const expectedByName = expectedValueTypes(config, schema);
  const expected = exactExpectedOwners(expectedByName, generatedOwners);
  const semanticTypes = buildSemanticTypeCatalog(snapshot);
  const routes = [];
  for (const [objectId, { owner, route }] of expected) {
    const name = owner.tsName;
    if (owner.moduleId !== route.storageModule) {
      throw new Error(`AST value-operation type '${name}' storage owner '${owner.moduleId}' differs from '${route.storageModule}'`);
    }
    const semantic = semanticTypes.get(objectId);
    if (semantic === undefined) throw new Error(`AST value-operation type '${name}' has no extracted Go declaration`);
    const arities = new Set(semantic.variants.map((variant) => variant.declaration.type.typeParameters.length));
    if (arities.size !== 1 || !arities.has(0)) {
      throw new Error(`AST value-operation type '${name}' must remain one non-generic generated Go struct`);
    }
    const valueRoute = {
      goDeclarationHash: semanticDeclarationVariantsHash(semantic, `AST value-operation type '${name}'`),
      objectId,
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
  const unexpected = [...generatedOwners.values()]
    .filter((owner) => owner.generator === "porter:ast")
    .map((owner) => owner.tsName)
    .filter((name) => expectedByName.has(name) === false && ignored.has(name) === false);
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
  addRoute(routes, "Kind", `${root}/kinds.ts`, `${root}/kinds.ts`);
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

function exactExpectedOwners(expectedByName, generatedOwners) {
  const ownersByName = new Map();
  for (const owner of generatedOwners.values()) {
    if (owner.generator !== "porter:ast") continue;
    if (ownersByName.has(owner.tsName)) throw new Error(`AST generated type name '${owner.tsName}' has multiple owners`);
    ownersByName.set(owner.tsName, owner);
  }
  const result = new Map();
  for (const [name, route] of expectedByName) {
    const owner = ownersByName.get(name);
    if (owner === undefined) throw new Error(`AST value-operation type '${name}' has no generated declaration owner`);
    if (result.has(owner.objectId)) throw new Error(`AST generated Go object '${owner.objectId}' has multiple value-operation routes`);
    result.set(owner.objectId, Object.freeze({ owner, route }));
  }
  return result;
}

function nonAggregateTypeNames(schema) {
  const names = new Set(schema.kindAliasNames());
  for (const node of schema.nodeNames()) {
    names.add(`${node}Node`);
    for (const alias of schema.instantiationAliasesOf(node)) names.add(alias.name);
  }
  for (const name of Object.keys(schema.listAliases)) names.add(name);
  for (const name of Object.keys(schema.aliases)) names.add(name);
  return names;
}
