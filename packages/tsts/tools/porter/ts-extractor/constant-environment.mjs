// Demand-driven, declaration-only TypeScript constant resolution.

import {
  evaluateTypeScriptConstant,
  knownTypeScriptConstant,
  unsupportedTypeScriptConstant,
} from "./constant-evaluation.mjs";
import { compareText } from "../core/deterministic-order.mjs";
import { resolveModuleId } from "./source-structure.mjs";

export function buildIndexedModuleValueEnvironments(api, index) {
  const definitions = collectConstantDefinitions(api, index);
  const exportCache = new Map();

  const resolveDefinition = (id, trail = [], requirePublic = false) => {
    const definition = definitions.get(id);
    if (definition === undefined) return undefined;
    if (requirePublic && !definition.public) return undefined;
    if (definition.state === "resolved") return definition.evaluation;
    if (definition.state === "resolving") {
      throw new Error(`TypeScript constant dependency cycle: ${[...trail, id].join(" -> ")}`);
    }
    definition.state = "resolving";
    try {
      const environment = new LazyConstantEnvironment((reference) => {
        return resolveLocalReference(definition.moduleId, definition.scope, reference, [...trail, id]);
      });
      const evaluation = definition.implicit === undefined
        ? evaluateTypeScriptConstant(api, definition.initializer, environment)
        : evaluateImplicitEnumValue(definition, resolveDefinition, [...trail, id]);
      definition.evaluation = evaluation;
      definition.state = "resolved";
      return definition.evaluation;
    } catch (error) {
      definition.state = "pending";
      throw error;
    }
  };

  const resolveLocalReference = (moduleId, scope, reference, trail) => {
    const module = index.modules.get(moduleId);
    if (module === undefined) return undefined;
    const scopedId = scope.length === 0 ? undefined : `${moduleId}::${scope}.${reference}`;
    if (scopedId !== undefined && definitions.has(scopedId)) return resolveDefinition(scopedId, trail);
    const localId = `${moduleId}::${reference}`;
    if (definitions.has(localId)) return resolveDefinition(localId, trail);

    const [head, ...tail] = reference.split(".");
    const named = module.structure.imports.named.get(head);
    if (named !== undefined && !named.typeOnly) {
      const target = `${resolveModuleId(named.module, moduleId)}::${named.imported}${tail.length === 0 ? "" : `.${tail.join(".")}`}`;
      return resolveExportedConstant(target, trail)?.evaluation;
    }
    const namespace = module.structure.imports.namespaces.get(head);
    if (namespace !== undefined && !namespace.typeOnly && tail.length > 0) {
      return resolveExportedConstant(`${resolveModuleId(namespace.module, moduleId)}::${tail.join(".")}`, trail)?.evaluation;
    }
    return undefined;
  };

  const resolveExportedConstant = (id, trail = []) => {
    const cached = exportCache.get(id);
    if (cached !== undefined) return cached;
    if (trail.includes(id)) return undefined;
    const [moduleId, exportPath] = splitValueId(id);
    if (moduleId === undefined || index.externalModules.has(moduleId)) return undefined;
    const [head, ...tail] = exportPath.split(".");
    const resolved = resolveTopLevelValueExport(moduleId, head, trail);
    if (resolved === undefined) return undefined;
    if (resolved.namespaceModule !== undefined) {
      if (tail.length === 0) return undefined;
      const nested = resolveExportedConstant(`${resolved.namespaceModule}::${tail.join(".")}`, [...trail, id]);
      if (nested !== undefined) exportCache.set(id, nested);
      return nested;
    }
    const targetId = `${resolved.id}${tail.length === 0 ? "" : `.${tail.join(".")}`}`;
    const evaluation = resolveDefinition(targetId, [...trail, id], tail.length > 0);
    if (evaluation === undefined) return undefined;
    const result = { id: targetId, evaluation };
    exportCache.set(id, result);
    return result;
  };

  const resolveTopLevelValueExport = (moduleId, name, trail) => {
    const id = `${moduleId}::${name}`;
    if (trail.includes(id)) return undefined;
    const namespace = index.valueNamespaceReexport.get(id);
    if (namespace !== undefined) {
      return { namespaceModule: namespace.local === undefined ? namespace.module : undefined, id: namespace.local === undefined ? undefined : `${namespace.module}::${namespace.local}` };
    }
    const explicit = index.valueExports.get(id);
    if (explicit !== undefined) {
      if (explicit === id) return { id };
      const [targetModule, targetPath] = splitValueId(explicit);
      if (targetModule === undefined || index.externalModules.has(targetModule)) return undefined;
      const [targetHead, ...targetTail] = targetPath.split(".");
      const targetTopLevelId = `${targetModule}::${targetHead}`;
      if (trail.includes(targetTopLevelId)) {
        throw new Error(`TypeScript value named re-export cycle: ${[...trail, id, targetTopLevelId].join(" -> ")}`);
      }
      const target = resolveTopLevelValueExport(targetModule, targetHead, [...trail, id]);
      if (target === undefined) return undefined;
      if (target.namespaceModule !== undefined) {
        return targetTail.length === 0 ? target : { id: `${target.namespaceModule}::${targetTail.join(".")}` };
      }
      return { id: `${target.id}${targetTail.length === 0 ? "" : `.${targetTail.join(".")}`}` };
    }
    if (name === "default") return undefined;
    const candidates = new Map();
    for (const sourceModule of index.valueStarReexport.get(moduleId) ?? []) {
      const target = resolveTopLevelValueExport(sourceModule, name, [...trail, id]);
      if (target === undefined) continue;
      const key = target.namespaceModule === undefined ? target.id : `namespace:${target.namespaceModule}`;
      candidates.set(key, target);
    }
    if (candidates.size > 1) {
      throw new Error(`ambiguous TypeScript value star re-export '${id}': ${[...candidates.keys()].sort(compareText).join(", ")}`);
    }
    return candidates.values().next().value;
  };

  const environments = new Map();
  for (const moduleId of index.modules.keys()) {
    environments.set(moduleId, new LazyConstantEnvironment((reference) => resolveLocalReference(moduleId, "", reference, [])));
  }
  return environments;
}

class LazyConstantEnvironment {
  #resolve;

  constructor(resolve) {
    this.#resolve = resolve;
    Object.freeze(this);
  }

  get(name) {
    return this.#resolve(name);
  }

  has(name) {
    return this.get(name) !== undefined;
  }
}

function collectConstantDefinitions(api, index) {
  const definitions = new Map();
  for (const module of index.modules.values()) {
    for (const statement of module.sourceFile.Statements?.Nodes ?? []) {
      collectStatementDefinitions(api, module.moduleId, statement, "", true, definitions);
    }
    if (module.structure.defaultValueExpression !== undefined) {
      define(definitions, {
        id: `${module.moduleId}::default`,
        moduleId: module.moduleId,
        scope: "",
        public: true,
        initializer: module.structure.defaultValueExpression,
      });
    }
  }
  return definitions;
}

function collectStatementDefinitions(api, moduleId, statement, scope, scopePublic, definitions) {
  if (statement.Kind === api.Kinds.KindVariableStatement) {
    const variableStatement = api.Casts.AsVariableStatement(statement);
    if ((variableStatement.DeclarationList.Flags & api.Flags.NodeFlagsConst) === 0) return;
    for (const node of variableStatement.DeclarationList?.Declarations?.Nodes ?? []) {
      const declaration = api.Casts.AsVariableDeclaration(node);
      if (declaration.name?.Kind !== api.Kinds.KindIdentifier) {
        continue;
      }
      if (declaration.Initializer === undefined) continue;
      const name = qualify(scope, declaration.name.Text);
      define(definitions, {
        id: `${moduleId}::${name}`,
        moduleId,
        scope,
        public: scope.length === 0 || (scopePublic && isExportedStatement(api, statement)),
        initializer: declaration.Initializer,
      });
    }
    return;
  }
  if (statement.Kind === api.Kinds.KindEnumDeclaration) {
    collectEnumDefinitions(api, moduleId, statement, scope, scopePublic, definitions);
    return;
  }
  if (statement.Kind !== api.Kinds.KindModuleDeclaration) return;
  const name = statement.name?.Text;
  if (typeof name !== "string") throw new Error(`namespace declaration in '${moduleId}' must use an identifier`);
  let body = statement.Body;
  let nestedScope = qualify(scope, name);
  let nestedPublic = scope.length === 0 || (scopePublic && isExportedStatement(api, statement));
  while (body?.Kind === api.Kinds.KindModuleDeclaration) {
    if (typeof body.name?.Text !== "string") throw new Error(`nested namespace declaration in '${moduleId}' must use an identifier`);
    nestedScope = qualify(nestedScope, body.name.Text);
    body = body.Body;
  }
  if (body?.Kind !== api.Kinds.KindModuleBlock) return;
  for (const nested of body.Statements?.Nodes ?? []) collectStatementDefinitions(api, moduleId, nested, nestedScope, nestedPublic, definitions);
}

function collectEnumDefinitions(api, moduleId, declaration, scope, scopePublic, definitions) {
  const enumName = declaration.name?.Text;
  if (typeof enumName !== "string") throw new Error(`enum declaration in '${moduleId}' must use an identifier`);
  let previous;
  const enumScope = qualify(scope, enumName);
  for (const member of declaration.Members?.Nodes ?? []) {
    const name = member.name?.Text;
    if (typeof name !== "string") throw new Error(`enum member in '${moduleId}' must use an identifier, string, or numeric name`);
    const id = `${moduleId}::${qualify(enumScope, name)}`;
    const definition = {
      id,
      moduleId,
      scope: enumScope,
      public: scope.length === 0 || (scopePublic && isExportedStatement(api, declaration)),
      initializer: member.Initializer,
      implicit: member.Initializer === undefined ? { previous } : undefined,
    };
    define(definitions, definition);
    previous = id;
  }
}

function isExportedStatement(api, statement) {
  return (statement.modifiers?.Nodes ?? []).some((modifier) => modifier.Kind === api.Kinds.KindExportKeyword);
}

function evaluateImplicitEnumValue(definition, resolveDefinition, trail) {
  if (definition.implicit.previous === undefined) return knownTypeScriptConstant("number", 0);
  const previous = resolveDefinition(definition.implicit.previous, trail);
  if (previous?.status !== "known" || previous.value.kind !== "number") {
    return unsupportedTypeScriptConstant(
      "KindEnumMember",
      "implicit enum value follows a non-numeric or unresolved member",
    );
  }
  return knownTypeScriptConstant("number", previous.value.value + 1);
}

function define(definitions, definition) {
  if (definitions.has(definition.id)) throw new Error(`duplicate TypeScript constant declaration '${definition.id}'`);
  definitions.set(definition.id, { ...definition, state: "pending", evaluation: undefined });
}

function splitValueId(id) {
  const separator = id.lastIndexOf("::");
  return separator < 0 ? [] : [id.slice(0, separator), id.slice(separator + 2)];
}

function qualify(scope, name) {
  return scope.length === 0 ? name : `${scope}.${name}`;
}
