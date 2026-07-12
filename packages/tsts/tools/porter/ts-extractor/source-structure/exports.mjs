// Exact type/value namespace exports and canonical export routes.

import { compareText } from "../../core/deterministic-order.mjs";
import {
  collectLocalDeclarations,
  declarationIdentifier,
  exportName,
  isDefaultExport,
  isExported,
  kindLabel,
  variableNames,
} from "./declarations.mjs";
import {
  buildImportMap,
  moduleReference,
  moduleSpecifierText,
  resolveModuleId,
  uniqueReferences,
  uniqueSorted,
} from "./modules.mjs";

export function extractModuleStructure(api, sourceFile, moduleId) {
  const moduleReferences = [];
  const imports = buildImportMap(api, sourceFile, moduleId, moduleReferences);
  const locals = collectLocalDeclarations(api, sourceFile, moduleId);
  const typeExports = new Map();
  const typeExportAlternatives = new Map();
  const valueExports = new Map();
  const namespaceExports = new Map();
  const typeStarReexports = [];
  const valueStarReexports = [];
  const explicitExportRoutes = [];
  let defaultValueExpression;

  for (const statement of sourceFile.Statements?.Nodes ?? []) {
    if (registerDirectDeclarationExports(api, statement, moduleId, locals, typeExports, valueExports, namespaceExports)) continue;
    if (statement.Kind === api.Kinds.KindExportAssignment) {
      const assignment = api.Casts.AsExportAssignment(statement);
      if (assignment.IsExportEquals) throw new Error(`CommonJS export assignment is unsupported in Porter module '${moduleId}'`);
      if (assignment.Expression?.Kind === api.Kinds.KindIdentifier) {
        const name = assignment.Expression.Text;
        if (locals.types.has(name)) {
          setExport(typeExports, "default", `${moduleId}::${name}`, moduleId, "type");
        } else {
          const importedType = imports.named.get(name);
          if (importedType !== undefined) {
            setExport(typeExports, "default", `${resolveModuleId(importedType.module, moduleId)}::${importedType.imported}`, moduleId, "type");
          }
        }
        const importedNamespace = imports.namespaces.get(name);
        if (importedNamespace !== undefined && !importedNamespace.typeOnly) {
          setNamespaceExport(namespaceExports, "default", { module: resolveModuleId(importedNamespace.module, moduleId), typeOnly: false }, moduleId);
        } else if (locals.namespaces.has(name)) {
          setNamespaceExport(namespaceExports, "default", { module: moduleId, local: name, typeOnly: !locals.values.has(name) }, moduleId);
        }
      }
      const target = valueExpressionTarget(api, assignment.Expression, moduleId, imports, locals);
      const exportTarget = target ?? `${moduleId}::default`;
      if (exportTarget === `${moduleId}::default`) locals.values.add("default");
      setExport(valueExports, "default", exportTarget, moduleId, "value");
      if (target === undefined) defaultValueExpression = assignment.Expression;
      continue;
    }
    if (statement.Kind === api.Kinds.KindNamespaceExportDeclaration) {
      throw new Error(`global namespace export declarations are unsupported in Porter module '${moduleId}'`);
    }
    if (statement.Kind !== api.Kinds.KindExportDeclaration) continue;
    const declaration = api.Casts.AsExportDeclaration(statement);
    const sourceSpecifier = declaration.ModuleSpecifier === undefined
      ? undefined
      : moduleSpecifierText(api, declaration.ModuleSpecifier, moduleId, "export");
    const sourceModule = sourceSpecifier === undefined ? undefined : resolveModuleId(sourceSpecifier, moduleId);
    if (sourceSpecifier !== undefined) moduleReferences.push(moduleReference(sourceSpecifier, moduleId));
    const clause = declaration.ExportClause;
    if (!clause) {
      if (sourceModule === undefined) throw new Error(`export-star in '${moduleId}' must name a source module`);
      typeStarReexports.push(sourceModule);
      explicitExportRoutes.push({ name: "*", namespace: "type-star", target: sourceModule });
      if (!declaration.IsTypeOnly) {
        valueStarReexports.push(sourceModule);
        explicitExportRoutes.push({ name: "*", namespace: "value-star", target: sourceModule });
      }
      continue;
    }
    if (clause.Kind === api.Kinds.KindNamespaceExport) {
      if (sourceModule === undefined) throw new Error(`namespace re-export in '${moduleId}' must name a source module`);
      const name = exportName(api, clause.name, moduleId, "namespace export");
      setNamespaceExport(namespaceExports, name, { module: sourceModule, typeOnly: declaration.IsTypeOnly }, moduleId);
      explicitExportRoutes.push({
        name,
        namespace: declaration.IsTypeOnly ? "type-namespace" : "value-namespace",
        target: sourceModule,
      });
      if (!declaration.IsTypeOnly) setExport(valueExports, name, `${moduleId}::${name}`, moduleId, "value");
      continue;
    }
    if (clause.Kind !== api.Kinds.KindNamedExports) {
      throw new Error(`unsupported export clause ${kindLabel(api, clause)} in '${moduleId}'`);
    }
    for (const element of clause.Elements?.Nodes ?? []) {
      const specifier = api.Casts.AsExportSpecifier(element);
      const exported = exportName(api, specifier.name, moduleId, "exported name");
      const routes = registerNamedExport(
        api,
        declaration,
        element,
        sourceModule,
        moduleId,
        imports,
        locals,
        typeExports,
        typeExportAlternatives,
        valueExports,
        namespaceExports,
      );
      if (routes.typeTarget !== undefined) explicitExportRoutes.push({ name: exported, namespace: "type", target: routes.typeTarget });
      if (routes.valueTarget !== undefined) explicitExportRoutes.push({ name: exported, namespace: "value", target: routes.valueTarget });
      const namespace = namespaceExports.get(exported);
      if (namespace !== undefined) {
        explicitExportRoutes.push({
          name: exported,
          namespace: namespace.typeOnly ? "type-namespace" : "value-namespace",
          target: `${namespace.module}::${namespace.local ?? "*"}`,
        });
      }
    }
  }

  return finalizeStructure({
    imports,
    locals,
    typeExports,
    typeExportAlternatives,
    valueExports,
    namespaceExports,
    typeStarReexports,
    valueStarReexports,
    explicitExportRoutes,
    moduleReferences,
    defaultValueExpression,
    moduleId,
  });
}

function registerDirectDeclarationExports(api, statement, moduleId, locals, typeExports, valueExports, namespaceExports) {
  if (!isExported(api, statement)) return false;
  const defaulted = isDefaultExport(api, statement);
  const kind = statement.Kind;
  if (kind === api.Kinds.KindInterfaceDeclaration) {
    const local = declarationIdentifier(api, statement, moduleId);
    setExport(typeExports, defaulted ? "default" : local, `${moduleId}::${local}`, moduleId, "type");
    return true;
  }
  if (kind === api.Kinds.KindTypeAliasDeclaration) {
    const local = declarationIdentifier(api, statement, moduleId);
    setExport(typeExports, defaulted ? "default" : local, `${moduleId}::${local}`, moduleId, "type");
    return true;
  }
  if (kind === api.Kinds.KindClassDeclaration || kind === api.Kinds.KindEnumDeclaration) {
    const local = declarationIdentifier(api, statement, moduleId, defaulted) ?? "default";
    if (local === "default") {
      locals.types.add(local);
      locals.values.add(local);
    }
    const exported = defaulted ? "default" : local;
    setExport(typeExports, exported, `${moduleId}::${local}`, moduleId, "type");
    setExport(valueExports, exported, `${moduleId}::${local}`, moduleId, "value");
    return true;
  }
  if (kind === api.Kinds.KindFunctionDeclaration) {
    const local = declarationIdentifier(api, statement, moduleId, defaulted) ?? "default";
    if (local === "default") locals.values.add(local);
    setExport(valueExports, defaulted ? "default" : local, `${moduleId}::${local}`, moduleId, "value");
    return true;
  }
  if (kind === api.Kinds.KindVariableStatement) {
    if (defaulted) throw new Error(`variable statement cannot be a default export in '${moduleId}'`);
    for (const name of variableNames(api, statement, moduleId)) setExport(valueExports, name, `${moduleId}::${name}`, moduleId, "value");
    return true;
  }
  if (kind === api.Kinds.KindModuleDeclaration) {
    if (defaulted) throw new Error(`namespace declaration cannot be a default export in '${moduleId}'`);
    const name = declarationIdentifier(api, statement, moduleId);
    setNamespaceExport(namespaceExports, name, { module: moduleId, local: name, typeOnly: !locals.values.has(name) }, moduleId);
    if (locals.values.has(name)) setExport(valueExports, name, `${moduleId}::${name}`, moduleId, "value");
    return true;
  }
  return false;
}

function registerNamedExport(
  api,
  declaration,
  element,
  sourceModule,
  moduleId,
  imports,
  locals,
  typeExports,
  typeExportAlternatives,
  valueExports,
  namespaceExports,
) {
  const specifier = api.Casts.AsExportSpecifier(element);
  const exported = exportName(api, specifier.name, moduleId, "exported name");
  const source = exportName(api, specifier.PropertyName ?? specifier.name, moduleId, "source export name");
  const typeOnly = declaration.IsTypeOnly || specifier.IsTypeOnly;
  if (sourceModule !== undefined) {
    const target = `${sourceModule}::${source}`;
    setPotentialTypeExport(typeExports, typeExportAlternatives, exported, target);
    if (!typeOnly) setExport(valueExports, exported, target, moduleId, "value");
    return { typeTarget: target, valueTarget: typeOnly ? undefined : target };
  }
  const namespaceImport = imports.namespaces.get(source);
  if (namespaceImport !== undefined) {
    setNamespaceExport(namespaceExports, exported, {
      module: resolveModuleId(namespaceImport.module, moduleId),
      typeOnly: typeOnly || namespaceImport.typeOnly,
    }, moduleId);
    const valueTarget = !typeOnly && !namespaceImport.typeOnly ? `${moduleId}::${exported}` : undefined;
    if (valueTarget !== undefined) setExport(valueExports, exported, valueTarget, moduleId, "value");
    return { typeTarget: undefined, valueTarget };
  }
  const namedImport = imports.named.get(source);
  if (namedImport !== undefined) {
    const target = `${resolveModuleId(namedImport.module, moduleId)}::${namedImport.imported}`;
    setPotentialTypeExport(typeExports, typeExportAlternatives, exported, target);
    if (!typeOnly && !namedImport.typeOnly) setExport(valueExports, exported, target, moduleId, "value");
    return { typeTarget: target, valueTarget: !typeOnly && !namedImport.typeOnly ? target : undefined };
  }
  let found = false;
  let typeTarget;
  let valueTarget;
  if (locals.types.has(source)) {
    typeTarget = `${moduleId}::${source}`;
    setPotentialTypeExport(typeExports, typeExportAlternatives, exported, typeTarget);
    found = true;
  }
  if (locals.namespaces.has(source)) {
    setNamespaceExport(namespaceExports, exported, { module: moduleId, local: source, typeOnly: typeOnly || !locals.values.has(source) }, moduleId);
    found = true;
  }
  if (!typeOnly && locals.values.has(source)) {
    valueTarget = `${moduleId}::${source}`;
    setExport(valueExports, exported, valueTarget, moduleId, "value");
    found = true;
  }
  if (!found) throw new Error(`TypeScript export '${moduleId}::${exported}' references unknown local '${source}'`);
  return { typeTarget, valueTarget };
}

function finalizeStructure(input) {
  const namedReexports = nonDirectExports(input.typeExports, input.moduleId);
  const valueNamedReexports = nonDirectExports(input.valueExports, input.moduleId);
  return {
    imports: input.imports,
    localTypeNames: input.locals.types,
    localValueNames: input.locals.values,
    localNamespaceNames: input.locals.namespaces,
    exportedNamespaceTypeNames: input.locals.exportedNamespaceTypes,
    exportedNamespaceValueNames: input.locals.exportedNamespaceValues,
    exportedTypeNames: directExportNames(input.typeExports, input.moduleId, input.locals.types),
    exportedValueNames: directExportNames(input.valueExports, input.moduleId, input.locals.values),
    typeExports: input.typeExports,
    typeExportAlternatives: input.typeExportAlternatives,
    valueExports: input.valueExports,
    namedReexports,
    starReexports: uniqueSorted(input.typeStarReexports),
    valueNamedReexports,
    valueStarReexports: uniqueSorted(input.valueStarReexports),
    explicitExportRoutes: input.explicitExportRoutes,
    namespaceReexports: input.namespaceExports,
    moduleReferences: uniqueReferences(input.moduleReferences),
    defaultValueExpression: input.defaultValueExpression,
  };
}

function directExportNames(exports, moduleId, locals) {
  const names = new Set();
  for (const [exported, target] of exports) {
    if (target === `${moduleId}::${exported}` && locals.has(exported)) names.add(exported);
  }
  return names;
}

function nonDirectExports(exports, moduleId) {
  const aliases = new Map();
  for (const [name, target] of exports) {
    if (target !== `${moduleId}::${name}`) aliases.set(name, target);
  }
  return aliases;
}

function setExport(exports, name, target, moduleId, namespace) {
  const existing = exports.get(name);
  if (existing === target) return;
  if (existing !== undefined) throw new Error(`conflicting TypeScript export '${moduleId}::${name}' in the ${namespace} namespace`);
  exports.set(name, target);
}

function setPotentialTypeExport(exports, alternatives, name, target) {
  const pending = alternatives.get(name);
  if (pending !== undefined) {
    if (!pending.includes(target)) pending.push(target);
    return;
  }
  const existing = exports.get(name);
  if (existing === undefined || existing === target) {
    exports.set(name, target);
    return;
  }
  exports.delete(name);
  alternatives.set(name, [existing, target]);
}

function setNamespaceExport(exports, name, target, moduleId) {
  const existing = exports.get(name);
  if (existing !== undefined && existing.module === target.module && existing.local === target.local && existing.typeOnly === target.typeOnly) return;
  if (existing !== undefined) throw new Error(`conflicting TypeScript namespace export '${moduleId}::${name}'`);
  exports.set(name, target);
}

function valueExpressionTarget(api, expression, moduleId, imports, locals) {
  if (expression?.Kind !== api.Kinds.KindIdentifier) return undefined;
  const name = expression.Text;
  if (locals.values.has(name)) return `${moduleId}::${name}`;
  const named = imports.named.get(name);
  if (named !== undefined && !named.typeOnly) return `${resolveModuleId(named.module, moduleId)}::${named.imported}`;
  const namespace = imports.namespaces.get(name);
  if (namespace !== undefined && !namespace.typeOnly) return `${moduleId}::${name}`;
  throw new Error(`default export in '${moduleId}' references non-value '${name}'`);
}

export function extractReexports(api, sourceFile, moduleId) {
  const structure = extractModuleStructure(api, sourceFile, moduleId);
  return { named: structure.namedReexports, star: structure.starReexports };
}

export function extractTypeDecls(api, sourceFile, moduleId = "<module>.ts") {
  return [...extractModuleStructure(api, sourceFile, moduleId).exportedTypeNames].sort(compareText);
}
